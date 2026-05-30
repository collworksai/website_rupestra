# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Developer Context

Pedro is a **beginner in Swift/iOS** — explain concepts from scratch, prefer the simplest solution, and explain what and why before writing code. Comments in Spanish; variable/function names in English.

## Build & Run

Build and run via Xcode (`BuildProject` MCP tool or Xcode UI). The app targets **iPhone only, iOS 17+** — do not add macOS or Mac Catalyst targets.

```bash
# CLI build check (no signing, simulator only)
xcodebuild -project Rupestra.xcodeproj -scheme Rupestra -destination 'platform=iOS Simulator,name=iPhone 16' build 2>&1 | tail -5
```

Zero external dependencies — no SPM, CocoaPods, or Carthage. Everything is Apple frameworks.

```bash
# Ejecutar unit tests (48 tests, simulador)
xcodebuild test -project Rupestra.xcodeproj -scheme RupestraTests -destination 'platform=iOS Simulator,name=iPhone 17' 2>&1 | tail -20
```

Use `XcodeRefreshCodeIssuesInFile` to verify Swift files compile before reporting work done.

## Architecture

MVVM with `@Observable` (iOS 17+). Never use `ObservableObject`, `@StateObject`, or Combine.

```
Views/          → SwiftUI views, no business logic
  Library/      → Biblioteca tab: LibraryView, ProjectsListView, ProjectDetailView,
                   SessionDetailView, SessionRowView, MoveToProjectSheet
ViewModels/     → AnalysisViewModel (@Observable) — single VM for the whole app
Models/         → Plain data structs/enums (PigmentType, DetectionResult, AnalysisSession)
  Persistence/  → SwiftData @Model classes (StoredSession, StoredProject)
Engine/         → HSVDetector, DStretch pipeline — all pixel processing logic
Services/       → ImageService (Photos I/O), AudioService (recording), ExportService (PDF)
                   LiveScanManager (AVFoundation), DStretchService, LocationService
                   LibraryStorageService (disk I/O), LibrarySaveService (SwiftData coordinator)
                   PurchaseManager (freemium gating)
Utils/          → Extensions only (design tokens)
```

### State flow

`ContentView` owns these `@State` properties and a single `AnalysisViewModel` instance:
- `pickedImage: CGImage?` — raw image from camera or photo picker
- `calibratedImage: CGImage?` — white-balance-corrected version (nil if not calibrated)
- `showingWhiteBalance: Bool` — opens `WhiteBalancePickerView` as a `.fullScreenCover`
- `audioURL: URL?` — voice note recording; reset to nil on new image load
- `imageToAnalyze: CGImage?` — computed: `calibratedImage ?? pickedImage`
- `pigmentConfirmed: Bool` — controls the transition from vertical pigment list to compact horizontal chips
- `showingResults: Bool` — opens `ResultSection` as a `.fullScreenCover` when `latestResult` changes
- `isFromLiveScan: Bool` — hides the analysis flow and shows a save-to-library button instead
- `isAnalyzing: Bool` — spinner; set synchronously on tap so the overlay renders immediately
- `originalPickedData: Data?` — raw HEIC/JPEG bytes from the photo picker; used by `saveImages` to export the original at full resolution alongside analysis images
- `showingCalibration: Bool` — opens `CalibrationView` as a `.fullScreenCover`

Auto white balance (Gray World) is applied automatically in `onChange(of: pickedImage)` via `Task.detached` — the result is stored in `calibratedImage`. The task is tracked in `whiteBalanceTask` and cancelled when a new image is picked (prevents stale results from racing). The indicator "Balance automático aplicado" appears with an "Ajustar" button that opens `WhiteBalancePickerView` for manual correction. `WhiteBalancePickerView` also runs white balance corrections via `Task.detached` (not on MainActor).

When the user taps Analyze:
1. `viewModel.startSession()` → creates `AnalysisSession`, clears `latestResult`
2. `viewModel.analyze(image:)` → calls `HSVDetector.detect()` in a detached `Task`; `progressMessage` is updated via `onProgress` callback (dispatched to main via GCD)
3. `HSVDetector` returns a `DetectionResult` (3 images + coverage ratio + `siteMetadata`)
4. `viewModel.latestResult` is set → `showingResults = true` → `ResultSection` presented as `.fullScreenCover`

`ResultSection` pre-generates the PDF in a `.task(id: result.date)` block via `rebuildPDF()` (runs on background thread via `Task.detached`), then again after each DStretch mode completes. On `onChange(of: siteMetadata)`, PDF rebuilds are **debounced** (500ms via `schedulePDFRebuild()`) to avoid per-keystroke lag. Uses `ShareLink` (not `UIActivityViewController`) to avoid a black-screen bug in SwiftUI sheets.

### UI flow (progressive disclosure)

`ContentView` uses progressive disclosure — each section appears only when the previous step is complete:

1. **Source** (always visible) — Gallery / Camera / Live Scan buttons
2. **Image preview** (after loading image, preset mode only) — static preview at max 280pt
3. **Mode** (after loading image) — Automatic / Manual segmented control
4. **Pigment / Eyedropper** — preset mode shows `PigmentRow` list → horizontal chips on confirm; manual mode shows `ImageSamplerView` with drag-to-sample
5. **Settings** (after pigment selected) — white balance correction row
6. **CTA** (when ready) — "Analizar pigmento" button → triggers analysis → result opens as `.fullScreenCover`

Live Scan is a **source** (not a detection mode): on capture, `detectionMode` switches to `.preset` automatically. `isFromLiveScan = true` hides steps 3–6 and shows a "Save to library" button instead.

### Save behavior

When the user taps "Galería" in ResultSection, **all 6 PCA modes** are saved (button disabled until all 6 finish processing):
- **Gallery photo** (`originalPickedData != nil`): saves original HEIC at full resolution + overlay + calco + 6 PCA images
- **Camera/Live Scan photo** (`originalPickedData == nil`): saves all analysis images as JPEG (0.92 quality)

After gallery save, the session is **automatically persisted to the local library** (SwiftData + disk) with all images and metadata. The user organizes into projects later.

### Notable file layout quirks

- `DetectionMode` enum (`.preset` / `.eyedropper` / `.liveScan`) and `AnalysisType` enum (`.complete` / `.decorrelationOnly`) are defined at the top of `AnalysisViewModel.swift`, not in `Models/`. When `analysisType == .decorrelationOnly`, the pigment selection step is skipped and only DStretch PCA is performed.
- `ResultSection` is a `private struct` at the bottom of `ContentView.swift`, not a separate file.
- `DetectionTarget` and `DetectionError` enums are defined at the bottom of `HSVDetector.swift`.
- `CalibrationView` — full-screen view (`.fullScreenCover`) with a live camera feed showing the pigment filter in real time. Four sliders: hue center (±20° around default), hue tolerance (20–100%), minimum saturation (5–60%), minimum brightness (5–60%). `HueRangeBar` visualizes the active hue range on a 0°–360° spectrum. "Aplicar cambios" persists all four via `CalibrationService`. Only available for chromatic pigments. The live preview uses the same filter logic as the automatic mode — what the user sees is what the analysis will detect.
- `CalibrationService` is a pure singleton — do not make it `@Observable`; views read/write it pointually, not reactively. `reset(for:)` removes all four `UserDefaults` keys for a pigment.
- `HueRangeBar` — component in `Views/Components/` showing a 0°–360° hue spectrum bar with the active detection range highlighted and a triangle marker at the center. Supports wrap-around ranges (reds crossing 0°).
- `DStretchMode`, `DStretchResult`, and `DStretchError` are defined in `Engine/DStretchAnalyzer.swift`, alongside `DStretchAnalyzer` itself.

## Concurrency — Critical Constraint

The project has **`SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor`** in build settings. This makes **all functions in the module `@MainActor` by default**, which prevents calling them from `Task.detached` without actor isolation errors.

**Rule: use GCD (`DispatchQueue`) for background work in classes. `Task.detached` is safe inside struct methods ONLY if the methods are marked `nonisolated`.**

Without `nonisolated`, Swift silently hops back to MainActor even inside `Task.detached` — the code compiles and appears to work but blocks the main thread.

```swift
// ✅ Correct — GCD bypasses Swift's actor system (use for class methods)
captureQueue.async { self.configureSession() }

// ✅ Correct — bridge GCD↔async with continuation (use for class methods)
try await withCheckedThrowingContinuation { continuation in
    DispatchQueue.global(qos: .userInitiated).async {
        do { continuation.resume(returning: try heavyWork()) }
        catch { continuation.resume(throwing: error) }
    }
}

// ✅ Correct — nonisolated + Task.detached in structs (e.g. HSVDetector)
nonisolated func detect(...) async throws -> Result {
    try await Task.detached(priority: .userInitiated) {
        try self.processImage(...)  // also nonisolated
    }.value
}

// ❌ Avoid — Task.detached WITHOUT nonisolated silently runs on MainActor
func detect(...) async throws -> Result {  // implicitly @MainActor
    Task.detached { try self.processImage(...) }  // still hops to MainActor!
}

// ❌ Avoid — Task.detached fails with SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor on class methods
Task.detached { await self.configureSession() }
```

**Critical:** mark `nonisolated` on the method itself AND all private helpers it calls (e.g., `processImage`, `applyMorphologicalOpening`, `buildRGBAImage`).

## Detection Engines

The app has three image processing engines — never use generative AI in any of them.

### Engine 1 — HSVDetector (static images)

`HSVDetector` is the core. Classical computer vision only.

1. Read RGBA bytes via `CGContext`
2. Per-pixel RGB → HSV conversion; compare against `DetectionTarget`
3. Optional morphological opening (erosion → dilation via `vImageErode/Dilate_Planar8`) to remove noise
4. Single pass over pixel array to produce `overlay` (pigment tinted at 55% opacity) and `calco` (white background + pigment pixels only)

`DetectionTarget` has two cases:
- `.preset(PigmentType)` — HSV thresholds read entirely from `PigmentType` properties (single source of truth — see below). `HSVDetector.matches()` and `PigmentCIFilter.configure()` both derive their values from `PigmentType`; never hardcode thresholds in either engine.
- `.sampled(h:s:v:tolerance:)` — distance-based matching from a user-picked color; tolerance slider 5–50%. Tolerances: hue ±(tolerance×60°), sat ±(tolerance×0.5), val ±(tolerance×0.6)

**`PigmentType` is the single source of truth for all HSV thresholds.** Properties used by both engines:
- `hueCenter: Float?` — center of hue range in degrees; `0.0` = redOchre (wraps at 360°); `nil` = no hue constraint (black/white)
- `hueSemiwidth: Float` — half-width at tolerance=1.0
- `hueRange(tolerance:) -> (min,max)?` — computed range for both engines; if `min > max` the range wraps around 0°. Overload `hueRange(tolerance:centerOverride:)` accepts a shifted center (from `CalibrationService.hueCenter(for:)`)
- `hueCenterRange: ClosedRange<Float>?` — allowed range for the hue center slider (±20° around default); `nil` for achromatic pigments
- `defaultMinSat / defaultMaxSat / defaultMinVal / defaultMaxVal: Float` — S/V bounds; `CalibrationService` falls back to these when the user has not calibrated

Current base thresholds (at tolerance=1.0):
- redOchre: center 0°, ±35° → [325°,360°]∪[0°,35°], s∈[0.30,1.0], v∈[0.20,1.0]
- yellowOchre: center 40°, ±25° → [15°,65°], s∈[0.35,1.0], v∈[0.15,1.0]
- purpleRed: center 305°, ±45° → [260°,350°], s∈[0.30,1.0], v∈[0.15,1.0]
- black: any hue, s∈[0,0.15], v∈[0,0.30]
- white: any hue, s∈[0,0.12], v∈[0.75,1.0]

`PigmentType.sampled` is a special enum case used only as a placeholder in `DetectionResult` when the eyedropper was used. `HSVDetector.matches()` returns `false` for it — never pass `.preset(.sampled)` as a detection target.

`HSVDetector.samplePixel(at:in:displaySize:)` is static and maps a tap coordinate (in display space, accounting for `scaledToFit` letterboxing) to the actual pixel in the `CGImage`.

`HSVDetector.applyWhiteBalance(to:referencePoint:displaySize:)` is static. It reads a single reference pixel, computes per-channel scale factors (avg/channel), and applies them to all pixels. If the reference pixel is near-black (any channel ≤ 5), the image is returned unchanged to avoid amplifying noise.

### Engine 2 — Live Scan (real-time camera)

- `PigmentFilter.metal` — `CIColorKernel` that converts RGB→HSV and highlights pixels matching the hue, saturation, and brightness ranges (identical logic to `HSVDetector`); desaturates the rest to luminance. Supports hue ranges crossing 0° (reds).
- `PigmentCIFilter.swift` — wrapper `CIFilter` that loads the kernel from `default.metallib` and exposes `minHue`/`maxHue`/`minSat`/`maxSat`/`minVal`/`maxVal`. Exposes `static let kernelLoadError: String?` — if non-nil, the Metal kernel failed to load and `LiveScanManager.start()` shows the error instead of a broken view. `configure(for:tolerance:minSat:minVal:hueCenter:)` reads thresholds from `PigmentType`; accepts `nil` for S/V/hueCenter to use defaults.
- `LiveScanManager.swift` — `@Observable NSObject` managing `AVCaptureSession` (720p, BGRA). Applies `PigmentCIFilter` frame-by-frame on the capture thread (GPU via CoreImage). Publishes `processedFrame: CIImage?` and `rawFrame: CIImage?`.
- `LiveScanView.swift` — full-screen view with `CameraPreviewView` (UIViewRepresentable + UIImageView), horizontal pigment selector, and capture button. On capture, converts `rawFrame` (not the filtered frame) to `CGImage` and calls `onCapture`.

`LiveScanManager.start()` checks `PigmentCIFilter.kernelLoadError` before starting — if Metal failed, it sets `errorMessage` and returns without starting the camera. Uses `captureQueue.async` (GCD), not `Task.detached`. `stop()` also dispatches `session.stopRunning()` to `captureQueue` to avoid blocking MainActor. `@ObservationIgnored` on all AVFoundation objects (no observation tracking needed). `videoRotationAngle = 90` for portrait orientation.

`LiveScanManager.selectPigment(_:)` reads all four calibration parameters (hueCenter, tolerance, minSat, minVal) from `CalibrationService.shared`. The overload `selectPigment(_:tolerance:minSat:minVal:hueCenter:)` takes explicit values — used by `CalibrationView` for the live preview while the user drags the sliders.

`CameraPreviewView` and `CIImagePreviewView` are `internal` (not `private`) so they can be shared between `LiveScanView` and `CalibrationView`.

### Engine 3 — DStretch (color decorrelation)

Reveals nearly-invisible pigments via RGB channel decorrelation — the algorithm used in rupestrian archaeology.

**`DStretchMode` enum** (defined in `Engine/DStretchAnalyzer.swift`, 6 cases): each mode applies a linear color-space transformation T before PCA whitening, tuning which pigment class is enhanced:

| Mode | `descripcion` | Best for |
|------|--------------|----------|
| `.rgb` | Estándar | generic / sampled color |
| `.ybr` | Realza rojos | `redOchre` |
| `.yds` | Realza amarillos | `yellowOchre` |
| `.yrk` | Realza violetas | `purpleRed` |
| `.ybk` | Realza negros | `black` |
| `.crgb` | Atenúa blancos, grises y negros | `white` |

`DStretchMode.recommended(for:)` returns the best mode for a `PigmentType`. `ResultSection` selects it automatically on first load. Processing order: the recommended mode is processed first (await ~1-2s), then the remaining 5 modes are processed **sequentially** (one at a time) to keep peak memory under control.

**`DStretchAnalyzer` algorithm** (for a given mode T):
1. Extract RGBA pixels via `CGContext` (stride-4 sampling by default)
2. Compute mean μ_T in the transformed space `q = T·p`, plus μ_RGB for the shader
3. Compute 3×3 covariance matrix Σ_T in the T space
4. Spectral decomposition with **custom Jacobi** (max 50 iterations, no LAPACK)
5. Whitening W in T space: row k = `scale × eigenvector_k / sqrt(eigenvalue_k)`; `scale = 0.15` (±3σ → [0.05, 0.95])
6. Each mode has an `outputColorMatrix` (post-whitening channel rotation) and a `finalMatrix(whitening:)` function. Final matrix = `outputColorMatrix · W · T`; output offset = (0.5, 0.5, 0.5). `.rgb`, `.yrk`, `.ybk`, `.crgb` use identity for `outputColorMatrix`; `.ybr` swaps G↔B channels (makes reds/ochres appear magenta); `.yds` cycles channels (R→G, G→B, B→R).

The GPU shader then applies `finalMatrix · (pixel − μ_RGB) + 0.5`.

`DStretchResult` struct carries `matrix: simd_float3x3`, `inputMean: simd_float3`, and `outputOffset: simd_float3` — passed directly to `DStretchCIFilter`.

**GPU rendering:**
- `DStretchFilter.metal` — `CIColorKernel`: `output = clamp(dot(row_k, pixel − mean) + offset, 0, 1)` per channel
- `DStretchCIFilter.swift` — extracts rows from `simd_float3x3` (column-major) and passes them as `CIVector`. Exposes `static let kernelLoadError: String?` — `DStretchService` checks this before processing and throws `DStretchError.kernelLoadFailed` if non-nil.
- `DStretchService.swift` — coordinates CPU analysis + GPU rendering; uses `withCheckedThrowingContinuation + DispatchQueue.global()` (see concurrency section)

**UI integration:**
`ResultImageViewer` has **3 tabs**: Original / Resaltado / Calco. The PCA result is a **separate section** (`pcaSection`) below the viewer inside `ResultSection`. It shows a horizontal mode-chip selector (all 6 `DStretchMode` cases). On `ResultSection` appearance, the recommended mode is processed first, then the remaining 5 are processed sequentially inside `.task(id: result.date)`; the UI shows a spinner per mode while processing. Results land in `dstretchImages: [DStretchMode: CGImage]`; each completion triggers a debounced PDF rebuild. `FullscreenImageView` and `ZoomableResultView` are `internal` structs in `ResultImageViewer.swift` — `FullscreenImageView` is reused by `ResultSection`'s `pcaSection` fullscreen button.

## ImageSamplerView

Supports zoom (up to 6×, pinch) and pan (drag in zoom mode) via `.scaleEffect` and `.offset`. Has two operating modes controlled by `onCalibrateTap`:

- **Eyedropper mode** (`onCalibrateTap == nil`): drag to sample; calls `onSample(h, s, v, color)` after inverse-transforming coordinates.
- **Calibration mode** (`onCalibrateTap != nil`): tap-only; calls `onCalibrateTap(point, displaySize)` with the untransformed point for `HSVDetector.applyWhiteBalance`.

The inverse transform (applied internally in `untransform(_:displaySize:)`):
```swift
let unPanned = CGPoint(x: location.x - panOffset.width, y: location.y - panOffset.height)
let unZoomed = CGPoint(
    x: (unPanned.x - center.x) / zoom + center.x,
    y: (unPanned.y - center.y) / zoom + center.y
)
```

## Design System

All tokens are in `Utils/Extensions.swift`. **Never hard-code hex colors, font sizes, or spacing values** — always use these:

- **Colors:** `Color.bgPrimary/bgSecondary/bgTertiary`, `Color.inkPrimary/inkSecondary/inkTertiary/inkQuaternary`, `Color.accent`, `Color.accentLight`, `Color.surface`, `Color.destructive`
- **Fonts:** `.appTitle` (Georgia 26pt), `.coverageStat` (Georgia 28pt), `.screenTitle`, `.bodyRegular`, `.bodySemibold`, `.uiCaption`, `.overline`, `.ctaLabel`
- **Spacing:** `Spacing.sp4/sp8/sp12/sp16/sp20/sp24`
- **Radius:** `Radius.sm/md/lg/xl/xxl`
- **Pigment color for UI:** `Color.forPigment(_ pigment: PigmentType)` — returns the representative swatch color (distinct from `highlightRGB` used in the overlay image)
- **DStretch mode color for UI:** `Color.forDStretchMode(_ mode: DStretchMode)` — representative color for each mode chip in the PCA section

## Services

**`ImageService`** — never touches `UIImage`. `loadImageAndEXIF(from:)` loads a 3072 px thumbnail `CGImage` via `CGImageSourceCreateThumbnailAtIndex` (ImageIO, EXIF orientation applied automatically via `kCGImageSourceCreateThumbnailWithTransform`). Attempts full EXIF via `PHAsset` (preserves GPS, HEIC metadata); falls back to inline CGImageSource properties if `PHAsset` returns no data. Returns `(CGImage, PhotoEXIF, Data)` — the third element is the original file bytes (HEIC/JPEG), stored in `ContentView.originalPickedData` for full-resolution export. The 3072 px limit keeps HSVDetector peak memory under ~500 MB while preserving sufficient spatial detail for scientific pigment/engraving analysis. `PhotoEXIF` is a plain struct (aperture, ISO, focal length, device make, lens model, lat/lon, gpsAltitude, trueNorth) defined in this file. `ContentView.applyEXIF(_:)` copies these fields into `siteMetadata`, auto-filling coordinates if the photo has embedded GPS.

`ImageService.parseEXIF(from:)` is `static` — shared with `CameraPickerView`, which calls it on `info[.mediaMetadata]` from `UIImagePickerController`. **EXIF casting rule:** all numeric EXIF values arrive as `NSNumber` — always use `(value as? NSNumber)?.doubleValue`, never cast to `Double` directly. ISO is `[NSNumber]` (take first element). GPS lat/lon are always positive with a separate ref key ("N"/"S", "E"/"W") for sign.

Saving: `saveOriginalToLibrary(_ data: Data)` saves the raw bytes directly (preserving full resolution and metadata). `saveToLibrary(_ images: [CGImage])` saves all CGImages as JPEG (0.92 quality via `CGImageDestination`) in a **single** `PHPhotoLibrary.performChanges` transaction (not one per image). Both use `PHPhotoLibrary` with `.addOnly` permission.

**Race condition note:** `loadImageAndEXIF` calls `loadTransferable` once and reuses the bytes for both the thumbnail and EXIF — never call `loadTransferable` twice. EXIF is applied via `ContentView.applyEXIF(_:)` **after** assigning `pickedImage`; do not clear EXIF in `onChange(of: pickedImage)` (causes a race).

**`AudioService`** — `@Observable`. Wraps `AVAudioRecorder` / `AVAudioPlayer` / `SFSpeechRecognizer`. Records `.m4a` (AAC 44100 Hz mono) to the app's Documents directory. Uses `AVAudioApplication.requestRecordPermission()` (iOS 17+ API — not the deprecated `AVAudioSession` version). After `stopRecording()`, call `transcribeAudio(at:)` to get the Spanish (`es-ES`) transcript via `SFSpeechRecognizer`; `VoiceNoteView` does this automatically and appends the result to the `notes: String` binding.

**`ExportService`** — generates A4 PDF via `UIGraphicsPDFRenderer`. All methods are `nonisolated` — PDF generation runs on background threads via `Task.detached` from ContentView. Sections (top to bottom): header, site data block, analysis block, photo metadata block, then images (Original / Resaltado / Calco / PCA if available) stacked vertically. CGImages are normalized through `normalizedUIImage()` (uses `UIGraphicsImageRenderer` with `scale=1`, `opaque=true`, `preferredRange=.standard`) before drawing — this avoids black pixels from `premultipliedLast` alpha and incorrect P3 colors in PDF contexts. Notes field truncates to one line in the PDF.

**`CalibrationService`** — pure singleton (`static let shared`), **not** `@Observable`. Persists four parameters per chromatic pigment (`redOchre`, `yellowOchre`, `purpleRed`) in `UserDefaults`:
- `hueCenter` (shifted hue center, ±20° around default) — key `rupestra.calibration.<rawValue>.hueCenter`; returns `nil` if never saved (uses `PigmentType.hueCenter`)
- `tolerance` (hue range width) — key `rupestra.calibration.<rawValue>`, default 1.0
- `minSat` (minimum saturation) — key `rupestra.calibration.<rawValue>.minSat`
- `minVal` (minimum brightness) — key `rupestra.calibration.<rawValue>.minVal`

`hueCenter(for:)`, `minSat(for:)` and `minVal(for:)` return `Float?` — `nil` for non-chromatic pigments (black/white use fixed thresholds). When `UserDefaults` has no stored value, the fallback is `pigment.defaultMinSat/defaultMinVal` from `PigmentType` — do **not** add default constants here. `AnalysisViewModel.analyze()` reads all four and passes them to `HSVDetector.detect(calibrationTolerance:minSat:minVal:hueCenter:)`. `LiveScanManager.selectPigment(_:)` reads all four; the overload `selectPigment(_:tolerance:minSat:minVal:hueCenter:)` takes explicit values (used by `CalibrationView`).

**`LocationService`** — `@Observable` wrapper around `CoreLocation`. Provides one-shot GPS coordinates for the site metadata form.

**`SiteMetadata`** — plain `Equatable` struct holding all report data: `siteName`, `notes`, `coordinates`, `altitude`, `trueNorth`, `captureDate`, `locality`/`administrativeArea` (geocoded from `LocationService`), and EXIF fields from the photo (`photoAperture`, `photoISO`, `photoFocalLength`, `photoDeviceMake`, `photoLensModel`). EXIF fields are populated automatically by `ContentView.applyEXIF(_:)` when a photo is loaded. `SiteMetadataFormView` exposes the user-editable fields.

## Persistence & Library (SwiftData)

The app persists all analyses and captures via SwiftData + CloudKit, synced across the user's devices via iCloud.

### iCloud Sync Architecture

Two parallel mechanisms:
- **SwiftData + CloudKit** — syncs model metadata (StoredSession, StoredProject) automatically. `ModelConfiguration(cloudKitDatabase: .private("iCloud.com.collworks.Rupestra"))` — only enabled when `ubiquityIdentityToken != nil`; falls back to local-only `ModelConfiguration()` otherwise.
- **iCloud Drive** — syncs image/audio files via the ubiquity container. `LibraryStorageService.baseURL` points to `iCloud Drive/Documents/RupestraLibrary/` when available, falls back to `Application Support/RupestraLibrary/` when iCloud is unavailable. Thumbnails stay in local Caches (not synced).

`CloudMigrationService.migrateFilesIfNeeded()` runs once at launch (GCD background) — moves existing local files to the iCloud ubiquity container. Idempotent, guarded by `UserDefaults("cloudMigrationComplete")`.

`LibraryStorageService` exposes `isCloudAvailable: Bool`, `downloadStatus(filename:) -> FileDownloadStatus`, and `startDownloading(filename:)` for on-demand iCloud file downloads. `SessionRowView` and `SessionDetailView` show iCloud download indicators when files are not yet available locally.

### Navigation structure

```
RupestraApp (.modelContainer)
└── MainTabView
    ├── Tab 1: "Análisis" → ContentView (analysis flow)
    └── Tab 2: "Biblioteca" → LibraryView
          ├── Tab "Sesiones" — all sessions chronologically
          │     └── Tap → SessionDetailView
          └── Tab "Proyectos" — ProjectsListView
                └── Tap → ProjectDetailView → sessions within
```

### Models

**`StoredSession`** (`@Model`) — one per analysis or live scan save. Fields: `pigmentType` (rawValue string), `analysisTypeRaw` ("complete"/"decorrelationOnly"/"liveScan"), `coverageRatio`, `createdAt`, image filenames (source, overlay, calco, `pcaImageFilenames: [String]` for all 6 PCA modes), `voiceNoteFilename`, all `SiteMetadata` fields flattened (no nested structs in SwiftData), optional `@Relationship var project: StoredProject?`.

**`StoredProject`** (`@Model`) — folder/group. Has `name`, `createdAt`, `modifiedAt`, `@Relationship(deleteRule: .nullify, inverse: \StoredSession.project) var sessions: [StoredSession]`. Deleting a project orphans its sessions (does NOT delete them).

### Storage layout

```
Application Support/RupestraLibrary/
├── images/       ← JPEG 0.85 quality, filename {uuid}.jpg
├── thumbnails/   ← JPEG 0.70, filename {uuid}_{maxSize}.jpg (e.g. _200 for lists, _800 for detail)
└── audio/        ← .m4a moved from Documents (not copied — source is deleted)
```

`LibraryStorageService` handles all disk I/O (save/load images, generate thumbnails, move audio, delete files). Thumbnail cache includes the `maxSize` in the filename to support multiple sizes (200px for `SessionRowView`, 800px for `SessionDetailView`). `LibrarySaveService` coordinates SwiftData insert + disk writes — both `saveAnalysisSession` and `saveLiveScanSession` are `async`: disk I/O runs on GCD background via `withCheckedContinuation`, SwiftData `insert`+`save` runs on MainActor. Called from `ContentView.saveImages()` and `ContentView.saveLiveScanImages()` with `await`.

### Container initialization

`RupestraApp.init()` tries three `ModelContainer` strategies in order: (1) CloudKit-backed if `ubiquityIdentityToken != nil`, (2) local-only `ModelConfiguration()` as fallback, (3) in-memory container as last resort (analysis/export works, but library data won't persist). On `ModelContainer` init failure the error is logged to `UserDefaults("lastContainerError")`.

### Library UI

`LibraryView` uses `ModeSegmentedControl<LibraryTab>` to switch between Sesiones (flat list) and Proyectos (folder list). Sessions have `.contextMenu` for "Mover a proyecto..." (presents `MoveToProjectSheet`) and "Quitar de proyecto". `SessionRowView` shows a project badge if assigned. `SessionDetailView` shows image viewer (Original/Resaltado/Calco tabs) + separate PCA section with all 6 modes + metadata + voice note playback.

## Key Constraints

- **Light mode only** — `RupestraApp` forces `.preferredColorScheme(.light)`. Do not add dark mode support or dark-mode color variants.
- Use `CGImage` throughout — not `UIImage`. `UIKit` is only imported in `CameraPickerView` (UIViewControllerRepresentable) and `ExportService`.
- Swift function types cannot have argument labels: use `(Float, Float, Float, Color) -> Void`, not `(h: Float, ...)`.
- Pixel processing in structs uses `nonisolated` + `Task.detached` (e.g. `HSVDetector`); in classes/services uses GCD (`DispatchQueue.global`) — see concurrency section.
- Never use `UIActivityViewController` in a SwiftUI `.sheet` — use `ShareLink` (avoids black-screen bug).

## Build Settings

| Setting | Value | Why |
|---------|-------|-----|
| `OTHER_METAL_FLAGS` | `-fcikernel` | Compiles `coreimage::` functions in .metal files |
| `OTHER_LDFLAGS` | `-cikernel` | Links CIColorKernel support into the binary |
| `SWIFT_DEFAULT_ACTOR_ISOLATION` | `MainActor` | Whole module is MainActor by default — see concurrency section |

## Info.plist Permissions

| Key | Purpose |
|-----|---------|
| `NSCameraUsageDescription` | Photograph rock art |
| `NSPhotoLibraryAddUsageDescription` | Save analysis images |
| `NSMicrophoneUsageDescription` | Record voice notes |
| `NSLocationWhenInUseUsageDescription` | GPS coordinates for the site report |
| `NSSpeechRecognitionUsageDescription` | Transcribe voice notes to text via `SFSpeechRecognizer` |

## Roadmap

### App Store preparation (high priority)

- **AS-1 Onboarding** — DONE: `OnboardingView` with `@AppStorage("hasSeenOnboarding")` gate in `RupestraApp`
- **AS-2 Accessibility** — DONE: 39 accessibility labels across the project
- **AS-3 About screen** — DONE: `AboutView` with version, credits, privacy policy link, support
- **AS-6 Launch screen** — branded (not system default); actualmente `UILaunchScreen` es `<dict/>` (pantalla blanca). DONE: `SplashScreenView` con `LaunchBackground` color asset
- **AS-7 App Store metadata** — DONE: `AppStoreMetadata.md` with description, subtitle, keywords, promotional text, release notes (ES + EN), screenshot plan, IAP details, category selection

### Quality & maintenance

- **QA-1 Crash reporting** — DESCARTADO por ahora: requiere dependencias externas (Firebase Crashlytics o Sentry). Usar Xcode Organizer / App Store Connect como alternativa gratuita sin dependencias una vez publicada la app
- **QA-2 Unit tests** — DONE: 48 tests en `RupestraTests/` (HSVDetectorTests, DStretchAnalyzerTests, CalibrationServiceTests, ImageServiceTests). `Helpers/CGImageFactory.swift` creates synthetic `CGImage` instances (solid colors, custom pixel data) for tests. Ejecutar con `xcodebuild test -scheme RupestraTests` o Cmd+U en Xcode
- **QA-3 Localization** — DONE: ~250 strings in `es.lproj` and `en.lproj`, 147 `NSLocalizedString` usages in code

### iCloud & Developer Program

- **F5.1 iCloud sync** — DONE: CloudKit + iCloud Drive. Entitlements, `CODE_SIGN_ENTITLEMENTS` in pbxproj, `ModelConfiguration(cloudKitDatabase:)` with local fallback, `LibraryStorageService` with ubiquity container, `CloudMigrationService`, download indicators in `SessionRowView`/`SessionDetailView`/`AudioPlaybackView`. Bundle ID: `com.collworks.Rupestra`, team: Pedro Coll (Individual)

### Monetization — Freemium (high priority)

- **MON-1 PurchaseManager** — DONE: `@Observable` class with `isPro: Bool`, `UserDefaults`-backed, injected via `.environment()` from `RupestraApp`
- **MON-2 Debug toggle** — DONE: gear button in `MainTabView` (`#if DEBUG` only) with FREE/PRO toggle sheet
- **MON-3 Feature gating** — DONE: PRO features shown disabled with lock icon + "PRO" badge; tapping opens `PaywallView`. Session limit banner in `ResultSection` and `LibraryView`. Gallery exports only overlay for free users
- **MON-4 StoreKit 2 integration** — DONE: `PurchaseManager` uses `Product.products(for:)`, `Transaction.currentEntitlements`, `Transaction.updates`. Product ID: `com.collworks.Rupestra.pro` (non-consumable). `PaywallView` shows real `displayPrice`, handles purchase/restore with loading/error states. Debug toggle uses `debugOverridePro` (`#if DEBUG`). Requires StoreKit Configuration file in scheme for sandbox testing and product created in App Store Connect for production
- **MON-5 Paywall UI** — DONE: `PaywallView.swift` — full paywall sheet with feature list, price, purchase button, and restore link. Presented from all locked feature touch points

#### Freemium feature split

| Feature | Free | PRO |
|---------|------|-----|
| Análisis completo (5 pigmentos, eyedropper, calibración) | Sí | Sí |
| DStretch (6 modos) | Sí | Sí |
| Live Scan | Sí | Sí |
| Guardar en galería | Solo overlay | Todas (original + overlay + calco + 6 PCA) |
| Exportar PDF | No | Sí |
| Notas de voz | No | Sí |
| Biblioteca | 5 sesiones | Ilimitada |
| Proyectos | No | Sí |

### Future features

- **UX-6 Zoom in Auto mode** — reuse `ZoomableResultView` (already `internal`)
- **F3.1 Live Scan video** — record video with pigment filter in real time (`AVAssetWriter`)
- **F4.1 Multi-layer analysis** — simultaneous detection of multiple pigments; refactor `HSVDetector.buildMask()`
