import React from "react";
import { motion } from "framer-motion";

const RUPESTRA_LOGO = "logos/logo_rupestra_belen.png";

function SimpleIcon({ children, size = 21, className = "", strokeWidth = 1.8 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const Camera = (props) => (
  <SimpleIcon {...props}><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></SimpleIcon>
);
const Microscope = (props) => (
  <SimpleIcon {...props}><path d="M10 4v5l-3 5" /><path d="M12 4h4" /><path d="M8 14h8" /><path d="M5 20h14" /><path d="M14 9l4 6" /></SimpleIcon>
);
const Mountain = (props) => (
  <SimpleIcon {...props}><path d="M3 20l7-12 4 7 2-3 5 8z" /></SimpleIcon>
);
const MapPin = (props) => (
  <SimpleIcon {...props}><path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" /><circle cx="12" cy="9" r="2" /></SimpleIcon>
);
const FileText = (props) => (
  <SimpleIcon {...props}><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v4h4" /><path d="M9 12h6" /><path d="M9 16h6" /></SimpleIcon>
);
const Radio = (props) => (
  <SimpleIcon {...props}><circle cx="12" cy="12" r="2" /><path d="M7.8 16.2a6 6 0 0 1 0-8.4" /><path d="M16.2 7.8a6 6 0 0 1 0 8.4" /><path d="M4.9 19.1a10 10 0 0 1 0-14.2" /><path d="M19.1 4.9a10 10 0 0 1 0 14.2" /></SimpleIcon>
);
const Layers = (props) => (
  <SimpleIcon {...props}><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 16l9 5 9-5" /></SimpleIcon>
);
const Compass = (props) => (
  <SimpleIcon {...props}><circle cx="12" cy="12" r="9" /><path d="M15 9l-2 5-5 2 2-5z" /></SimpleIcon>
);
const AudioLines = (props) => (
  <SimpleIcon {...props}><path d="M4 10v4" /><path d="M8 7v10" /><path d="M12 4v16" /><path d="M16 8v8" /><path d="M20 11v2" /></SimpleIcon>
);
const Sparkles = (props) => (
  <SimpleIcon {...props}><path d="M12 3l1.5 5L19 10l-5.5 2L12 17l-1.5-5L5 10l5.5-2z" /><path d="M19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7z" /></SimpleIcon>
);
const ShieldCheck = (props) => (
  <SimpleIcon {...props}><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-5" /></SimpleIcon>
);
const ArrowRight = (props) => (
  <SimpleIcon {...props}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></SimpleIcon>
);

const palette = {
  bg: "#F5F2EE",
  bg2: "#EDE5DB",
  bg3: "#E0D8CE",
  ink: "#2C1A0E",
  ink2: "#5A4030",
  ink3: "#8B7060",
  accent: "#8B5E3C",
  accent2: "#C8A882",
  dark: "#1A1510",
  dark2: "#241C14",
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#C8A882]/40 bg-[#C8A882]/15 px-3 py-1 text-xs font-medium tracking-wide text-[#5A4030]">
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#8B7060]">
      {children}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, children, highlight = false }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-2xl border p-6 shadow-sm ${
        highlight
          ? "border-[#8B5E3C]/30 bg-[#2C1A0E] text-[#F5F2EE]"
          : "border-[#D7C8B8] bg-white/55 text-[#2C1A0E]"
      }`}
    >
      <div
        className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${
          highlight ? "bg-[#C8A882]/18 text-[#C8A882]" : "bg-[#8B5E3C]/10 text-[#8B5E3C]"
        }`}
      >
        <Icon size={21} strokeWidth={1.8} />
      </div>
      <h3 className={`mb-2 text-lg font-semibold ${highlight ? "text-[#F5F2EE]" : "text-[#2C1A0E]"}`}>{title}</h3>
      <p className={`text-sm leading-6 ${highlight ? "text-[#D8C8B8]" : "text-[#5A4030]"}`}>{children}</p>
    </motion.div>
  );
}

function ModeRow({ title, text, icon: Icon }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-[#D8CABC] bg-[#F9F6F1]/70 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B5E3C]/10 text-[#8B5E3C]">
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div>
        <h3 className="font-semibold text-[#2C1A0E]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[#5A4030]">{text}</p>
      </div>
    </div>
  );
}

function MockPhone() {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-[#C8A882]/30 blur-3xl" />
      <div className="absolute -right-8 bottom-10 h-44 w-44 rounded-full bg-[#8B5E3C]/25 blur-3xl" />
      <div className="relative rounded-[2.2rem] border border-[#C8A882]/30 bg-[#1A1510] p-3 shadow-2xl shadow-[#2C1A0E]/25">
        <div className="rounded-[1.7rem] bg-[#F5F2EE] p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="font-serif text-xl text-[#2C1A0E]">Rupestra</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#8B7060]">En vivo</div>
            </div>
            <img
              src={RUPESTRA_LOGO}
              alt="Logo de Rupestra"
              className="h-9 w-9 rounded-full bg-[#A39C90] object-cover shadow-sm"
            />
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#2C1A0E] p-3">
            <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 25% 30%, #C8A882 0 2px, transparent 3px), radial-gradient(circle at 70% 55%, #8B5E3C 0 3px, transparent 4px)" }} />
            <div className="relative h-56 rounded-xl bg-gradient-to-br from-[#5A4030] via-[#2C1A0E] to-[#8B7060]">
              <div className="absolute left-8 top-12 h-16 w-24 rounded-[50%] border-2 border-[#FF9B42]/80 bg-[#FF9B42]/25 blur-[1px]" />
              <div className="absolute bottom-12 right-8 h-12 w-20 rounded-[50%] border-2 border-[#F5D06A]/80 bg-[#F5D06A]/20 blur-[1px]" />
              <div className="absolute left-1/2 top-1/2 h-28 w-[1px] -translate-x-1/2 -translate-y-1/2 bg-white/35" />
              <div className="absolute left-1/2 top-1/2 h-[1px] w-28 -translate-x-1/2 -translate-y-1/2 bg-white/35" />
              <div className="absolute bottom-3 left-3 rounded-full bg-black/35 px-3 py-1 text-[10px] text-[#F5F2EE]">Rojo ocre · realce activo</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {['Original', 'Resaltado', 'Calco'].map((item, index) => (
              <div key={item} className={`rounded-xl px-2 py-2 text-center text-[10px] ${index === 1 ? 'bg-[#8B5E3C] text-white' : 'bg-[#EDE5DB] text-[#5A4030]'}`}>{item}</div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-[#2C1A0E] p-4 text-[#F5F2EE]">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#C8A882]">Informe</div>
            <div className="mt-2 text-2xl font-serif">1,8%</div>
            <div className="text-xs text-[#D8C8B8]">cobertura estimada</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RupestraLandingPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EE] text-[#2C1A0E]">
      <section className="relative overflow-hidden bg-[#1A1510] text-[#F5F2EE]">
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #C8A882 0 2px, transparent 2px), radial-gradient(circle at 80% 40%, #8B5E3C 0 2px, transparent 2px)", backgroundSize: "44px 44px" }} />
        <div className="mx-auto flex max-w-7xl flex-col px-6 py-6 lg:px-10">
          <header className="relative z-10 flex items-center justify-between border-b border-[#C8A882]/20 pb-5">
            <div className="flex items-center gap-3">
              <img
                src={RUPESTRA_LOGO}
                alt="Logo de Rupestra"
                className="h-11 w-11 rounded-xl border border-[#C8A882]/25 bg-[#A39C90] object-cover"
              />
              <div>
                <div className="font-serif text-3xl leading-none tracking-tight">Rupestra</div>
                <div className="mt-1 hidden font-serif text-sm italic text-[#9A8878] sm:block">documentación visual rupestre</div>
              </div>
            </div>
            <nav className="hidden items-center gap-7 text-sm text-[#D8C8B8] md:flex">
              <a href="#que-es" className="hover:text-white">Qué es</a>
              <a href="#modos" className="hover:text-white">Modos</a>
              <a href="#en-vivo" className="hover:text-white">En vivo</a>
              <a href="#documentacion" className="hover:text-white">Documentación</a>
            </nav>
          </header>

          <div className="relative z-10 grid items-center gap-14 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.65 }}>
              <Badge>Creada por espeleólogos · Comunidad de Madrid</Badge>
              <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[1.03] tracking-tight text-[#F5F2EE] md:text-7xl">
                Revelar lo invisible. Documentar con rigor.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#D8C8B8]">
                Rupestra ayuda a identificar, resaltar y documentar pigmentos rupestres mediante visión por computador clásica, análisis cromático avanzado y herramientas de registro pensadas para trabajo de campo.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#que-es" className="inline-flex items-center justify-center rounded-2xl bg-[#C8A882] px-6 py-4 text-sm font-semibold text-[#2C1A0E] shadow-lg shadow-black/20 transition hover:bg-[#D8B992]">
                  Conocer el proyecto <ArrowRight className="ml-2" size={17} />
                </a>
                <a href="#modos" className="inline-flex items-center justify-center rounded-2xl border border-[#C8A882]/35 px-6 py-4 text-sm font-semibold text-[#F5F2EE] transition hover:bg-white/5">
                  Ver modos de análisis
                </a>
              </div>
              <p className="mt-6 max-w-xl text-xs leading-5 text-[#9A8878]">
                Herramienta de apoyo documental. La interpretación arqueológica y la validación patrimonial corresponden siempre a especialistas y autoridades competentes.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.1 }}>
              <MockPhone />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="que-es" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
            <SectionLabel>Qué es Rupestra</SectionLabel>
            <h2 className="max-w-xl font-serif text-4xl leading-tight tracking-tight md:text-5xl">
              Una herramienta de campo para observar, analizar y registrar pigmentos.
            </h2>
          </motion.div>
          <div className="space-y-5 text-base leading-8 text-[#5A4030]">
            <p>
              Rupestra es una aplicación para iPhone diseñada para apoyar trabajos de documentación de pinturas, motivos y trazas pigmentarias en cuevas, abrigos y superficies rocosas.
            </p>
            <p>
              Permite analizar imágenes, resaltar rangos cromáticos, generar calcos visuales, aplicar realce cromático avanzado y exportar informes con datos de campo, imágenes procesadas, localización y notas.
            </p>
            <div className="rounded-2xl border border-[#D7C8B8] bg-[#EDE5DB]/70 p-5 text-sm leading-6 text-[#5A4030]">
              <strong className="text-[#2C1A0E]">Sin IA generativa.</strong> El procesamiento se basa en técnicas clásicas de visión por computador, filtros cromáticos, análisis HSV, PCA y procesado de imagen.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EDE5DB] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <SectionLabel>Para quién está pensada</SectionLabel>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Diseñada para quienes documentan sobre roca.</h2>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ staggerChildren: 0.08 }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={Mountain} title="Espeleólogos">
              Para documentar cavidades, paneles, posibles marcas y pigmentos durante exploraciones o revisiones de campo.
            </FeatureCard>
            <FeatureCard icon={Microscope} title="Arqueólogos">
              Como apoyo visual preliminar para registrar, contrastar y preparar documentación gráfica de superficies rupestres.
            </FeatureCard>
            <FeatureCard icon={FileText} title="Documentalistas">
              Para generar informes visuales con imágenes, notas, metadatos técnicos y localización del contexto.
            </FeatureCard>
            <FeatureCard icon={Compass} title="Entusiastas rigurosos">
              Para observar con más detalle, siempre desde el respeto al patrimonio y sin sustituir el criterio experto.
            </FeatureCard>
          </motion.div>
        </div>
      </section>

      <section id="modos" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionLabel>Modos de uso</SectionLabel>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Del análisis rápido al realce avanzado.</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#5A4030]">
              Rupestra organiza el flujo de trabajo en modos claros para que el usuario pueda elegir entre rapidez, control manual o análisis cromático más profundo.
            </p>
          </div>
          <div className="grid gap-4">
            <ModeRow icon={Sparkles} title="Modo automático" text="Selecciona un pigmento predefinido y aplica rangos calibrados para resaltar zonas compatibles: rojo ocre, ocre amarillo, rojo violáceo, negro y blanco." />
            <ModeRow icon={Camera} title="Modo manual / cuentagotas" text="Permite seleccionar un color directamente sobre la imagen y ajustar la tolerancia para analizar trazas no contempladas en los presets." />
            <ModeRow icon={ShieldCheck} title="Balance de blancos" text="Corrige dominantes de color tomando una referencia neutra de la escena, útil en fotografías tomadas con iluminación irregular." />
            <ModeRow icon={Layers} title="Realce cromático avanzado" text="Análisis basado en PCA para intensificar diferencias sutiles de color y facilitar la observación de pigmentos poco perceptibles." />
          </div>
        </div>
      </section>

      <section id="en-vivo" className="bg-[#1A1510] px-6 py-24 text-[#F5F2EE] lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionLabel>Modo diferencial</SectionLabel>
            <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
              Escaneo en vivo: una nueva forma de mirar el panel.
            </h2>
            <p className="mt-6 text-base leading-8 text-[#D8C8B8]">
              El modo En Vivo permite visualizar el realce de pigmentos directamente desde la cámara. En lugar de fotografiar primero y analizar después, Rupestra permite observar en tiempo real cómo responden distintas zonas de la superficie a los filtros de pigmento seleccionados.
            </p>
            <p className="mt-5 text-base leading-8 text-[#D8C8B8]">
              Una herramienta pensada para tomar mejores decisiones en campo: dónde observar, qué fotografiar y qué documentar con más detalle.
            </p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-3xl border border-[#C8A882]/20 bg-[#241C14] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C8A882]/15 text-[#C8A882]"><Radio size={22} /></div>
              <div>
                <h3 className="font-semibold text-[#F5F2EE]">Realce directo sobre cámara</h3>
                <p className="text-sm text-[#9A8878]">Exploración visual antes de la captura definitiva</p>
              </div>
            </div>
            <div className="rounded-2xl bg-[#120E08] p-5">
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="rounded-xl bg-[#8B5E3C]/30 p-4 text-[#E8D5C0]">Seleccionar pigmento</div>
                <div className="rounded-xl bg-[#8B5E3C]/30 p-4 text-[#E8D5C0]">Observar superficie</div>
                <div className="rounded-xl bg-[#8B5E3C]/30 p-4 text-[#E8D5C0]">Capturar evidencia</div>
              </div>
              <div className="mt-5 rounded-xl border border-[#C8A882]/20 p-4 text-sm leading-6 text-[#D8C8B8]">
                El escaneo en vivo no sustituye el análisis experto, pero acelera la inspección visual y ayuda a decidir qué zonas merecen una documentación más detallada.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="documentacion" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <SectionLabel>Documentación de campo</SectionLabel>
          <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Del indicio visual al informe documentado.</h2>
          <p className="mt-6 text-base leading-8 text-[#5A4030]">
            Rupestra no solo procesa imágenes. También ayuda a registrar el contexto del análisis para convertir una observación en documentación organizada.
          </p>
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ staggerChildren: 0.08 }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={MapPin} title="GPS y contexto">
            Registra coordenadas, altitud, localización y orientación cuando están disponibles.
          </FeatureCard>
          <FeatureCard icon={AudioLines} title="Notas de voz">
            Permite añadir observaciones de campo y convertirlas en notas asociadas al análisis.
          </FeatureCard>
          <FeatureCard icon={FileText} title="Exportación PDF">
            Genera informes con datos del yacimiento, metadatos de imagen y resultados visuales.
          </FeatureCard>
          <FeatureCard icon={Layers} title="Imágenes comparables">
            Exporta original, resaltado, calco y realce cromático para revisión posterior.
          </FeatureCard>
        </motion.div>
      </section>

      <section className="bg-[#EDE5DB] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>Origen del proyecto</SectionLabel>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Creada desde la experiencia en cavidades de la Comunidad de Madrid.</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[#5A4030]">
            <p>
              Rupestra nace de la necesidad de documentar de forma más ágil posibles motivos, trazas y pigmentos localizados durante trabajos espeleológicos en la Comunidad de Madrid.
            </p>
            <p>
              Su diseño responde a situaciones reales de campo: poca luz, superficies irregulares, necesidad de registrar datos y comparación visual rápida.
            </p>
            <div className="rounded-2xl bg-white/55 p-5 text-sm leading-6">
              <strong className="text-[#2C1A0E]">Una herramienta viva.</strong> Rupestra irá evolucionando según las necesidades reales que aparezcan en nuestros trabajos de documentación: nuevos modos de análisis, mejoras en los informes, ajustes de calibración y flujos específicos para campo.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1510] px-6 py-20 text-[#F5F2EE] lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-5 flex justify-center">
            <img
              src={RUPESTRA_LOGO}
              alt="Logo de Rupestra"
              className="h-16 w-16 rounded-2xl border border-[#C8A882]/25 bg-[#A39C90] object-cover"
            />
          </div>
          <SectionLabel>Rupestra</SectionLabel>
          <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Tecnología de campo para documentación rupestre.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#D8C8B8]">
            Una app en evolución, creada por espeleólogos, para observar mejor, registrar con más orden y documentar con rigor posibles restos pigmentarios sobre roca.
          </p>
          <div className="mt-9 flex justify-center">
            <a href="mailto:info@rupestra.com" className="inline-flex items-center justify-center rounded-2xl bg-[#C8A882] px-7 py-4 text-sm font-semibold text-[#2C1A0E] shadow-lg shadow-black/20 transition hover:bg-[#D8B992]">
              Contactar sobre el proyecto <ArrowRight className="ml-2" size={17} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
