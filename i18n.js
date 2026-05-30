(function () {
  "use strict";

  var translations = {
    en: {
      // ── META (index) ──
      "meta.title.index": "Rupestra · Rock art documentation",
      "meta.description.index": "Rupestra is a support app for observing, enhancing and documenting rock pigments using classical computer vision and field tools.",
      "meta.og.title.index": "Rupestra · Visual rock art documentation",
      "meta.og.description.index": "A field tool for identifying, enhancing and documenting rock pigments with chromatic analysis and report generation.",

      // ── META (privacy) ──
      "meta.title.privacy": "Privacy Policy · Rupestra",
      "meta.description.privacy": "Rupestra privacy policy: data processed locally, app permissions, on-device storage and contact information.",
      "meta.og.title.privacy": "Privacy Policy · Rupestra",
      "meta.og.description.privacy": "Rupestra operates entirely on your device and does not send data to external servers.",

      // ── SHARED HEADER ──
      "skip-link": "Skip to content",
      "brand-subtitle": "visual rock art documentation",

      // ── NAV (index) ──
      "nav.que-es": "What is it",
      "nav.para": "For whom",
      "nav.como-funciona": "How it works",
      "nav.en-vivo": "Live mode",
      "nav.porque": "Why",
      "nav.agradecimientos": "Acknowledgements",

      // ── NAV (privacy) ──
      "nav.inicio": "Home",
      "nav.p.que-es": "What is it",
      "nav.p.como-funciona": "How it works",
      "nav.p.agradecimientos": "Acknowledgements",

      // ── HERO ──
      "hero.chip": "Coming soon to App Store",
      "hero.h1": "Reveal the invisible. Document with rigour.",
      "hero.p1": "Rupestra transforms field photography into an analysis and documentation tool, helping to detect and enhance possible rock pigments through advanced chromatic analysis and digital image processing.",
      "hero.p2": "Born from a multidisciplinary team linked to cave conservation, it combines expertise in speleology, archaeology, geology and software engineering to support observation, recording and report generation in caves, rock shelters and rock art environments.",
      "hero.cta": "Notify me at launch",

      // ── QUE ES ──
      "quees.label": "What is Rupestra?",
      "quees.h2": "A field tool for observing, analysing and recording pigments.",
      "quees.p1": "Rupestra combines advanced chromatic analysis and digital image processing to help detect, enhance and document possible rock pigments directly in the field.",
      "quees.feat.hsv": "<strong>HSV detection</strong> — segments pigments by hue, saturation and brightness with calibrated thresholds.",
      "quees.feat.pca": "<strong>PCA enhancement</strong> — 6 colour decorrelation modes to reveal degraded or imperceptible traces.",
      "quees.feat.live": "<strong>Live scan</strong> — preview the pigment filter in real time on the camera.",
      "quees.feat.calibration": "<strong>Custom calibration</strong> — adjust detection thresholds to adapt the analysis to each surface and lighting condition.",
      "quees.feat.pdf": "<strong>PDF report</strong> — images, GPS, EXIF metadata and field notes in one document.",
      "quees.feat.privacy": "<strong>100 % local</strong> — all analysis on-device, no generative AI, no external servers.",

      // ── PARA QUIEN ──
      "para.label": "Who is it for",
      "para.h2": "Designed for those who document on rock.",
      "para.speleo.h3": "Speleologists",
      "para.speleo.p": "To record cavities, panels, possible marks and pigment remains during explorations, field reviews or documentation work.",
      "para.arqueo.h3": "Archaeologists",
      "para.arqueo.p": "As a visual support tool for observing, comparing and preparing graphic documentation of rock surfaces.",
      "para.equipo.h3": "Documentation teams",
      "para.equipo.p": "To generate visual reports with analysis images, field notes, technical metadata and location context.",
      "para.conserv.h3": "Conservation and heritage",
      "para.conserv.p": "To support observation, monitoring and recording tasks, always respecting the heritage and without replacing expert judgement.",

      // ── COMO FUNCIONA ──
      "como.label": "How it works",
      "como.h2": "From the trace on the rock to the technical report.",
      "como.p": "Rupestra organises the analysis in clear steps to accompany real work in cavities: from an initial visual observation to the generation of technical documentation useful for subsequent analysis.",
      "como.step1.h3": "Capture or import the image",
      "como.step1.p": "Photograph the surface in the field or select an existing image to start the analysis.",
      "como.step2.h3": "Select the pigment",
      "como.step2.p": "Choose from predefined pigments or take a manual sample directly on the image using the eyedropper.",
      "como.step3.h3": "Adjust and enhance",
      "como.step3.p": "Correct colour casts, calibrate detection or apply advanced chromatic enhancement to observe faint or barely perceptible traces.",
      "como.step4.h3": "Document the result",
      "como.step4.p": "Save comparable images — original, highlighted, tracing and chromatic enhancement — together with GPS coordinates, camera metadata and field notes in a technical PDF report.",
      "como.step6.h3": "Custom calibration",
      "como.step6.p": "Adjust hue, saturation and brightness thresholds to adapt detection to the lighting conditions and pigment type of each surface.",

      // ── EN VIVO ──
      "envivo.label": "Differential mode",
      "envivo.h2": "Live scan: an augmented window on the rock.",
      "envivo.p1": "Live mode transforms the phone into a real-time observation tool. As you move the camera over walls, ceilings or rock surfaces, Rupestra highlights areas compatible with the selected pigment and neutralises the rest of the image in greyscale.",
      "envivo.p2": "This makes it possible to visually scan a cavity or rock shelter before taking the final photograph, detecting clues, contrasts or areas of interest that might otherwise go unnoticed.",
      "envivo.p3": "A quick way to decide where to look more closely, what to photograph and what to document later.",
      "envivo.feat.h3": "Direct enhancement on camera",
      "envivo.feat.p": "Augmented observation before the final capture.",

      // ── POR QUE ──
      "porque.label": "Why Rupestra",
      "porque.h2": "Rupestra is born from real fieldwork.",
      "porque.p1": "The project arises from direct experience in exploring, observing and documenting rock surfaces, within a context of cave conservation and fieldwork.",
      "porque.p2": "Real conditions shape the app’s design: low light, difficult access, irregular surfaces, the need to record context, carefully review clues and generate documentation useful for subsequent analysis.",
      "porque.p3": "Rupestra is designed to accompany that process: observe better, record with more precision and facilitate the creation of clear, traceable and useful reports for documentation teams.",
      "porque.note.strong": "A tool in constant evolution.",
      "porque.note.span": "Rupestra will continue evolving based on real needs detected in the field: new analysis modes, calibration adjustments, more complete reports and workflows adapted to multidisciplinary teams.",

      // ── GALERIA ──
      "galeria.label": "Gallery",
      "galeria.h3": "Fieldwork, documentation and analysis in cavities.",

      // ── AGRADECIMIENTOS ──
      "agradecimientos.label": "Acknowledgements",
      "agradecimientos.p1": "Rupestra has taken shape thanks to many conversations, field tests, comments and shared needs.",
      "agradecimientos.p2": "Thanks to the members of the Cave Conservation Commission of the Community of Madrid for their patience, ideas, time and willingness to test, question and improve every part of the project.",
      "agradecimientos.p3": "This work relies on a collective perspective: field experience, technical judgement and commitment to the documentation and conservation of underground heritage.",
      "agradecimientos.role1": "Developer of Rupestra",
      "agradecimientos.role2": "Cave Conservation Commission of the Community of Madrid",
      "agradecimientos.role3": "Madrid Speleology Federation",

      // ── CLOSING ──
      "closing.label": "Rupestra",
      "closing.h2": "Field technology for documenting the invisible.",
      "closing.p": "An evolving app, born from real experience in cavities and developed with a multidisciplinary perspective to observe better, record more systematically and rigorously document possible pigment remains on rock.",
      "closing.cta": "Contact about the project",

      // ── FOOTER ──
      "footer.privacy": "Privacy policy",
      "footer.contact": "Contact",

      // ── ARIA / ALT (shared) ──
      "aria.brand-home": "Rupestra home",
      "aria.brand-back": "Return to Rupestra home page",
      "aria.nav": "Main navigation",
      "aria.nav.toggle.open": "Open menu",
      "aria.nav.toggle.close": "Close menu",
      "alt.logo": "Rupestra logo",
      "aria.back-to-top": "Back to top",
      "aria.footer-nav": "Footer links",
      "aria.lang-switch": "Language selection",

      // ── ALT (index) ──
      "alt.screenshot-auto": "Rupestra interface showing automatic pigment detection mode",
      "alt.screenshot-processed": "Rupestra interface showing the image processing and analysis result",
      "alt.logo-conservacion": "Logo of the Cave Conservation Commission of the Community of Madrid",
      "alt.logo-fme": "Logo of the Madrid Speleology Federation",
      "alt.pedro": "Portrait of Pedro Coll",

      // ── CAROUSEL ALT ──
      "alt.campo01": "Exploration and observation of rock surfaces in a cavity",
      "alt.campo02": "Documentation team working inside a cave",
      "alt.campo03": "Location of panels with possible pigment remains in a rock shelter",
      "alt.campo04": "Photographic record of rock surface with signs of pigmentation",
      "alt.campo05": "Fieldwork with lighting in an underground cavity",
      "alt.campo06": "Detail of rock wall during a documentation session",
      "alt.campo07": "Speleologists accessing an area of interest in a cavity",
      "alt.campo08": "Observation of ceiling and walls in a cave with possible marks",
      "alt.campo09": "General view of the entrance to a rock shelter in the field",
      "alt.campo10": "Conservation team reviewing a surface with possible pigment remains",

      // ── SRC (language-dependent assets) ──
      "src.step1": "pantallazos_app/en/04_Init_Screen.png",
      "src.step2": "pantallazos_app/en/03_Manual_Detection.png",
      "src.step3": "pantallazos_app/en/01_PCA_Analisis.png",
      "src.step4": "pantallazos_app/en/05_PDF_Report.png",
      "src.step6": "pantallazos_app/en/02_Calibration.png",
      "src.library": "pantallazos_app/en/06_Library.png",
      "src.live-video": "videos/LiveMode_EN.mp4",
      "src.hero-screenshot": "pantallazos_app/en/01_PCA_Analisis.png",
      "src.quees-screenshot": "pantallazos_app/en/02_Calibration.png",

      // ── COMO FUNCIONA ALT ──
      "alt.step1": "Rupestra start screen showing Gallery, Camera and Live Scan options",
      "alt.step2": "Manual pigment detection with eyedropper sampling on the image",
      "alt.step3": "Calibration screen with real-time pigment detection adjustments",
      "alt.step4": "Generated PDF report with GPS coordinates, metadata and analysis images",
      "alt.step6": "Calibration screen with hue, saturation and brightness threshold adjustments",
      "alt.library": "Session library with project organisation and iCloud sync",

      // ── LIBRARY SHOWCASE ──
      "library.h3": "Session library",
      "library.p": "Organise your analyses by project. Sync across devices with iCloud.",

      // ── PARTNERS ──
      "porque.partners": "Developed in collaboration with field teams from:",

      // ── CAROUSEL CONTROLS ──
      "aria.carousel": "Fieldwork photo carousel",
      "aria.carousel.prev": "View previous image",
      "aria.carousel.next": "View next image",
      "aria.carousel.dots": "Select carousel image",
      "aria.carousel.dot1": "View image 1",
      "aria.carousel.dot2": "View image 2",
      "aria.carousel.dot3": "View image 3",
      "aria.carousel.dot4": "View image 4",
      "aria.carousel.dot5": "View image 5",
      "aria.carousel.dot6": "View image 6",
      "aria.carousel.dot7": "View image 7",
      "aria.carousel.dot8": "View image 8",
      "aria.carousel.dot9": "View image 9",
      "aria.carousel.dot10": "View image 10",

      // ── PRIVACY POLICY ──
      "privacy.label": "Rupestra",
      "privacy.h1": "Privacy Policy",
      "privacy.updated": "Last updated: May 17, 2026",
      "privacy.intro": "Rupestra is a rock art analysis application developed by Collworks. This policy explains what data the application collects, how it uses it and your rights as a user.",
      "privacy.principle.strong": "Fundamental principle",
      "privacy.principle.p": "Rupestra operates entirely on your device. We do not send, store or process your data on any external server. There is no account registration or login.",

      "privacy.data.h2": "Data collected by the application",
      "privacy.data.intro": "Rupestra accesses the following data exclusively for local operation:",

      "privacy.camera.h3": "1. Camera",
      "privacy.camera.li1": "To photograph rock art and perform real-time analysis (Live Scan).",
      "privacy.camera.li2": "Captured images are stored solely on your device, in the app’s local storage.",

      "privacy.gallery.h3": "2. Photo gallery",
      "privacy.gallery.li1": "To select existing images and analyse them.",
      "privacy.gallery.li2": "When loading a photo, the app extracts EXIF metadata (aperture, ISO, focal length, camera model and lens). If the photo contains embedded GPS coordinates, these are also extracted and stored in the analysis record.",
      "privacy.gallery.li3": "Analysis results can be saved to your photo gallery if you explicitly request it.",

      "privacy.mic.h3": "3. Microphone",
      "privacy.mic.li1": "To record voice notes about the site.",
      "privacy.mic.li2": "Recordings are stored locally as audio files (M4A).",

      "privacy.speech.h3": "4. Speech recognition",
      "privacy.speech.li1": "To transcribe voice notes to text.",
      "privacy.speech.li2": "Transcription is performed on the device using Apple’s speech recognition engine (SFSpeechRecognizer, Spanish language). Audio is not sent to any server.",

      "privacy.gps.h3": "5. Location (GPS)",
      "privacy.gps.li1": "To record the geographic coordinates of the site in the report.",
      "privacy.gps.li2": "Latitude, longitude, altitude and orientation (true north) are captured.",
      "privacy.gps.li3": "Apple’s reverse geocoding is used to obtain the locality and region of the site.",
      "privacy.gps.li4": "Location is only requested when the user explicitly authorises it.",

      "privacy.compass.h3": "6. Compass",
      "privacy.compass.li1": "To capture the orientation (true north) of the site.",

      "privacy.storage.h2": "Data storage",
      "privacy.storage.intro": "All data is stored exclusively on your device:",
      "privacy.storage.li1": "<strong>Local database:</strong> session metadata (site name, coordinates, notes, EXIF data, pigment type, analysis results).",
      "privacy.storage.li2": "<strong>On-device files:</strong> analysis images (JPEG), voice notes (M4A), thumbnails.",
      "privacy.storage.li3": "<strong>Local preferences:</strong> pigment detection calibration parameters.",
      "privacy.storage.outro": "No data is uploaded to the cloud, synchronised with external servers or shared with third parties automatically.",

      "privacy.pdf.h2": "PDF reports",
      "privacy.pdf.intro": "Rupestra generates PDF reports that include:",
      "privacy.pdf.li1": "Site name and location (coordinates, altitude, locality).",
      "privacy.pdf.li2": "Analysis images (original, highlighted, tracing, PCA decorrelation).",
      "privacy.pdf.li3": "Photo metadata (aperture, ISO, focal length, device).",
      "privacy.pdf.li4": "User notes.",
      "privacy.pdf.warning": "<strong>Important:</strong> if you share an exported PDF, the recipient will be able to see all information contained in the report, including the GPS coordinates of the site. Share these reports only with people you trust.",

      "privacy.nocollect.h2": "Data we do not collect",
      "privacy.nocollect.li1": "We do not collect usage data or analytics.",
      "privacy.nocollect.li2": "We do not use advertising identifiers (IDFA).",
      "privacy.nocollect.li3": "We do not record IP addresses.",
      "privacy.nocollect.li4": "We do not use cookies or tracking technologies.",
      "privacy.nocollect.li5": "We do not share data with third parties.",
      "privacy.nocollect.li6": "We do not store data on our own or third-party servers.",
      "privacy.nocollect.li7": "We do not require account registration or login.",

      "privacy.thirdparty.h2": "Third-party services",
      "privacy.thirdparty.p1": "Rupestra does not integrate any third-party SDK, library or service. It uses exclusively native Apple frameworks (SwiftUI, AVFoundation, CoreImage, CoreLocation, Speech, Photos, SwiftData).",
      "privacy.thirdparty.p2": "The only external services invoked are iOS operating system APIs:",
      "privacy.thirdparty.li1": "<strong>Reverse geocoding</strong> (Apple’s CLGeocoder): converts GPS coordinates into locality names. Subject to <a href=\"https://www.apple.com/legal/privacy/\">Apple’s Privacy Policy</a>.",
      "privacy.thirdparty.li2": "<strong>Speech recognition</strong> (Apple’s SFSpeechRecognizer): transcribes audio to text on the device.",

      "privacy.deletion.h2": "Data deletion",
      "privacy.deletion.intro": "You can delete your data at any time:",
      "privacy.deletion.li1": "<strong>Individual sessions:</strong> swipe to delete in the Library. The session, all its images, thumbnails and associated voice notes are removed.",
      "privacy.deletion.li2": "<strong>Projects:</strong> deleting a project does not delete its sessions (they remain as unassigned sessions).",
      "privacy.deletion.li3": "<strong>Calibration:</strong> reset detection parameters from each pigment’s calibration screen.",
      "privacy.deletion.li4": "<strong>Complete deletion:</strong> uninstalling the app removes all locally stored data.",

      "privacy.security.h2": "Security",
      "privacy.security.intro": "Data stored in Rupestra is protected by iOS security mechanisms:",
      "privacy.security.li1": "File system-level encryption (iOS Data Protection).",
      "privacy.security.li2": "Application sandboxing (data is not accessible by other apps).",
      "privacy.security.li3": "The database is encrypted by default on iOS.",

      "privacy.minors.h2": "Minors",
      "privacy.minors.p": "Rupestra is not intended for children under 13. We do not intentionally collect information from minors. If you discover that a minor has provided personal data through the application, contact us to arrange its deletion.",

      "privacy.changes.h2": "Changes to this policy",
      "privacy.changes.p": "We reserve the right to update this privacy policy. Any changes will be published on this page with the date of the last update. We recommend reviewing this policy periodically.",

      "privacy.contact.h2": "Contact",
      "privacy.contact.p": "If you have questions about this privacy policy or about the processing of your data, you can contact us at:",
      "privacy.contact.detail": "<strong>Email:</strong> <a href=\"mailto:collworks.ai@gmail.com\">collworks.ai@gmail.com</a><br /><strong>Developer:</strong> Collworks"
    }
  };

  var spanishCache = {};
  var currentLang = "es";

  function getStoredLang() {
    try { return localStorage.getItem("rupestra-lang") || "es"; }
    catch (e) { return "es"; }
  }

  function setStoredLang(lang) {
    try { localStorage.setItem("rupestra-lang", lang); }
    catch (e) {}
  }

  function cacheSpanish(key, value) {
    if (!(key in spanishCache)) {
      spanishCache[key] = value;
    }
  }

  function applyTranslations(lang) {
    var dict = lang === "en" ? translations.en : null;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      cacheSpanish(key, el.textContent);
      el.textContent = dict && dict[key] ? dict[key] : spanishCache[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      cacheSpanish(key, el.innerHTML);
      el.innerHTML = dict && dict[key] ? dict[key] : spanishCache[key];
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      cacheSpanish(key, el.getAttribute("alt"));
      el.setAttribute("alt", dict && dict[key] ? dict[key] : spanishCache[key]);
    });

    document.querySelectorAll("[data-i18n-src]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-src");
      cacheSpanish(key, el.getAttribute("src"));
      var val = dict && dict[key] ? dict[key] : spanishCache[key];
      el.setAttribute("src", val);
      if (el.tagName === "VIDEO") el.load();
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      cacheSpanish(key, el.getAttribute("aria-label"));
      el.setAttribute("aria-label", dict && dict[key] ? dict[key] : spanishCache[key]);
    });

    document.documentElement.setAttribute("lang", lang);

    var page = document.body.getAttribute("data-i18n-page") || "index";
    var titleKey = "meta.title." + page;
    if (dict && dict[titleKey]) {
      document.title = dict[titleKey];
    } else if (spanishCache["__title"]) {
      document.title = spanishCache["__title"];
    }
    if (!spanishCache["__title"]) {
      spanishCache["__title"] = document.title;
    }

    var metaMap = {
      "description": "meta.description." + page,
      "og:title": "meta.og.title." + page,
      "og:description": "meta.og.description." + page
    };

    Object.keys(metaMap).forEach(function (attr) {
      var key = metaMap[attr];
      var isOg = attr.indexOf("og:") === 0;
      var selector = isOg
        ? 'meta[property="' + attr + '"]'
        : 'meta[name="' + attr + '"]';
      var el = document.querySelector(selector);
      if (!el) return;
      var cacheKey = "__meta_" + attr;
      cacheSpanish(cacheKey, el.getAttribute("content"));
      el.setAttribute("content", dict && dict[key] ? dict[key] : spanishCache[cacheKey]);
    });

    document.querySelectorAll(".lang-switch-btn").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive);
    });

    currentLang = lang;
    setStoredLang(lang);
    document.documentElement.classList.remove("lang-loading");
  }

  window.rupestra = window.rupestra || {};
  window.rupestra.setLang = function (lang) {
    applyTranslations(lang === "en" ? "en" : "es");
  };
  window.rupestra.getLang = function () { return currentLang; };

  var storedLang = getStoredLang();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      if (storedLang === "en") {
        applyTranslations("en");
      } else {
        document.documentElement.classList.remove("lang-loading");
      }
    });
  } else {
    if (storedLang === "en") {
      applyTranslations("en");
    } else {
      document.documentElement.classList.remove("lang-loading");
    }
  }
})();
