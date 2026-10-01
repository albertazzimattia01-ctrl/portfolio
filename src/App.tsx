import { FormEvent, MouseEvent as ReactMouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import profilePhoto from "./imports/1-1.png";
import heroDecorationMd from "./imports/hero-decoration-md.svg";
import heroDecoration from "./imports/hero-decoration.svg";
import projectAllthebest from "./imports/project-allthebest.webp";
import projectAcumen from "./imports/project-acumen.webp";
import projectDna from "./imports/project-dna.webp";
import projectUsertest from "./imports/project-usertest.webp";
import projectPortfolio from "./imports/project-portfolio.png";

const CONTACT_EMAIL = "your.email@example.com";

const heroSkills = [
  "Discovery",
  "Copywriting",
  "Accessibility",
  "User centered",
  "Prototyping",
  "Design System",
  "User Test",
];

const projects = [
  { number: "01", title: "AllTheBest | Redesign", type: "UX/UI Case Study", tools: ["FI", "AF"], image: projectAllthebest, alt: "Anteprima del progetto AllTheBest Redesign – riprogettazione dell'interfaccia UX/UI", href: "https://www.behance.net/gallery/256229397/AllTheBest-UXIU-Redesign" },
  { number: "02", title: "Acumen Academy | Redesign", type: "UX/UI Case Study", tools: ["FI", "PS", "MZ"], image: projectAcumen, alt: "Anteprima del progetto Acumen Academy Redesign – riprogettazione dell'interfaccia UX/UI", href: "https://www.behance.net/gallery/256097191/Acumen-Academy-UXUI-Redesign" },
  { number: "03", title: "DNA | Nuova Identità", type: "Brand Identity", tools: ["AI", "ID", "PS"], image: projectDna, alt: "Anteprima del progetto DNA Nuova Identità – progetto di brand identity", href: "https://www.behance.net/gallery/232060525/Brand-dentity-Rivista-scientifica" },
  { number: "04", title: "Portfolio | HTML & CSS", type: "Web Development", tools: ["FI", "VSC"], image: projectPortfolio, imageBg: "#fef5ec", alt: "Anteprima del progetto Portfolio in HTML & CSS – sito portfolio sviluppato in HTML e CSS", href: "https://www.behance.net/gallery/240726351/Presentazione-Portfolio-UXUI-Design" },
  { number: "05", title: "Conduzione Usert Test da Remoto", type: "Usability Test", tools: ["FI", "MZ"], image: projectUsertest, alt: "Anteprima del progetto Conduzione User Test da Remoto – test di usabilità", href: "https://www.behance.net/gallery/236847919/Redesigning-Acumen-Academy-Usability-Testing-Insights" },
];

const story = [
  {
    year: "01 / IL BACKGROUND",
    title: "Dall'industria meccanica al digitale",
    text: "Ho iniziato dal montaggio meccanico, tra chiavi, precisione e lavoro di squadra. Mi ha insegnato a essere organizzato, ma col tempo ho sentito il bisogno di dare più spazio alla mia creatività.",
  },
  {
    year: "02 / IL CAMBIO DI ROTTA",
    title: "La transizione verso l'UX/UI",
    text: "Ho iniziato un corso gratuito di Web Design dopo il lavoro e ho riscoperto una passione che avevo messo da parte: il piacere di costruire siti. Da lì non ho più smesso di pensarci.",
  },
  {
    year: "03 / IL SALTO",
    title: "Il percorso con Start2impact",
    text: "Nel 2024 ho deciso di lasciare il lavoro per dedicarmi all'UX/UI con il percorso accademico di Start2impact, tra progetti reali e feedback di professionisti. Precisione e problem solving, eredità della meccanica, funzionano benissimo anche nel design.",
  },
  {
    year: "04 / OLTRE IL DESIGN",
    title: "Fuori dallo schermo",
    text: "Per il resto sono appassionato di sport, trekking e mare, e amo mettermi alla prova. Ah, e non me la cavo male nemmeno in cucina: mi piace sperimentare nuove ricette! Sono curioso di natura e sempre contento di parlare di nuovi progetti.",
  },
];

function useDragScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    isDragging.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    ref.current.style.cursor = "grabbing";
    ref.current.style.userSelect = "none";
  }, [ref]);

  const onMouseUp = useCallback(() => {
    if (!ref.current) return;
    isDragging.current = false;
    ref.current.style.cursor = "grab";
    ref.current.style.userSelect = "";
  }, [ref]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    ref.current.scrollLeft = scrollLeft.current - walk;
  }, [ref]);

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    isDragging.current = false;
    ref.current.style.cursor = "grab";
    ref.current.style.userSelect = "";
  }, [ref]);

  return { onMouseDown, onMouseUp, onMouseMove, onMouseLeave };
}

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : ""}
      fill="none"
      height="18"
      viewBox="0 0 24 24"
      width="18"
    >
      <path d="M2 12h17M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

function SectionTitle({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="section-title mb-10 flex items-end justify-between gap-6 border-b border-separator pb-5 md:mb-14">
      <h2 className="font-anton text-2xl font-normal tracking-[0] text-current md:text-4xl">{children}</h2>
      <span className="pb-1 font-montserrat text-xs uppercase tracking-widest text-page">{index}</span>
    </div>
  );
}

function ScrollButtons({ target }: { target: React.RefObject<HTMLDivElement | null> }) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const check = () => {
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", check); ro.disconnect(); };
  }, [target]);

  const move = (direction: number) => {
    target.current?.scrollBy({ left: direction * Math.min(440, window.innerWidth * 0.8), behavior: "smooth" });
  };

  const disabledCls = "border border-[#6b8a00] text-[#6b8a00] cursor-not-allowed opacity-60";
  const activeCls = "border border-cta text-cta hover:bg-accent hover:text-ink";

  return (
    <div className="flex gap-2">
      <button
        aria-disabled={atStart}
        aria-label="Scorri indietro"
        className={`grid size-11 place-items-center rounded-full bg-transparent transition ${atStart ? disabledCls : activeCls}`}
        onClick={() => !atStart && move(-1)}
        type="button"
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        aria-disabled={atEnd}
        aria-label="Scorri avanti"
        className={`grid size-11 place-items-center rounded-full bg-transparent transition ${atEnd ? disabledCls : activeCls}`}
        onClick={() => !atEnd && move(1)}
        type="button"
      >
        <ArrowIcon />
      </button>
    </div>
  );
}

function SideNav() {
  const [activeSection, setActiveSection] = useState("intro");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    ["Intro", "#intro"],
    ["Progetti", "#progetti"],
    ["About", "#about"],
    ["Contattami", "#contattami"],
  ];

  useEffect(() => {
    const sectionIds = ["intro", "progetti", "about", "contattami"];
    let animationFrame = 0;

    const updateActiveSection = () => {
      // Il cambio avviene quando l'inizio della sezione successiva supera
      // la linea posta al 60% dello schermo misurato dal basso.
      const activationLine = window.innerHeight * 0.4;
      let sectionAtActivationLine = sectionIds[0];

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          sectionAtActivationLine = id;
        }
      });

      setActiveSection(sectionAtActivationLine);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const navigateToSection = (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const id = href.slice(1);
    const section = document.getElementById(id);
    if (!section) return;

    const headerOffset = window.matchMedia("(max-width: 767px)").matches ? 64 : 0;
    const destination = section.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.history.pushState(null, "", href);
    window.scrollTo({ top: destination, behavior: "smooth" });
  };

  return (
    <aside className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-nav px-5 text-ink md:inset-y-0 md:right-auto md:h-auto md:w-24 md:flex-col md:px-0 md:py-8">
      <a aria-label="Torna all'intro" className="grid size-10 place-items-center rounded-full border border-ink text-sm font-semibold" href="#intro">
        MA
      </a>
      <nav aria-label="Navigazione principale" className="hidden md:block">
        <ul className="flex flex-col items-center gap-5">
          {navItems.map(([label, href]) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={href}>
                <a
                  aria-current={isActive ? "location" : undefined}
                  className={`font-montserrat relative block rotate-180 text-base uppercase tracking-widest [writing-mode:vertical-rl] ${isActive ? "font-semibold text-ink" : "font-normal text-ink/50 hover:font-semibold hover:text-ink"
                    }`}
                  href={href}
                  onClick={(event) => navigateToSection(event, href)}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -right-3 top-1/2 h-5 w-px -translate-y-1/2 bg-ink transition ${isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                      }`}
                  />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <span className="hidden text-center font-montserrat text-[12px] text-ink/70 md:block">
        UX/UI
        <br />
        DESIGNER
      </span>
      <button
        aria-controls="mobile-menu"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Chiudi il menu" : "Apri il menu"}
        className="relative grid size-10 place-items-center md:hidden"
        onClick={() => setIsMenuOpen((open) => !open)}
        type="button"
      >
        <span
          className={`absolute h-px w-6 bg-ink transition duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
        />
        <span
          className={`absolute h-px w-6 bg-ink transition duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
        />
        <span
          className={`absolute h-px w-6 bg-ink transition duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
        />
      </button>
      <div
        className={`absolute inset-x-0 top-full overflow-hidden border-b border-ink/20 bg-page text-ink transition-[max-height,opacity] duration-300 md:hidden ${isMenuOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        id="mobile-menu"
      >
        <nav aria-label="Navigazione mobile" className="px-5 py-5">
          <ul className="divide-y divide-ink/20">
            {navItems.map(([label, href], index) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <a
                    aria-current={isActive ? "location" : undefined}
                    className={`font-montserrat flex items-center justify-between py-4 text-sm font-normal uppercase tracking-widest transition ${isActive ? "text-ink font-semibold" : "text-ink"
                      }`}
                    href={href}
                    onClick={(event) => {
                      navigateToSection(event, href);
                      setIsMenuOpen(false);
                    }}
                  >
                    <span>{label}</span>
                    <span className="font-montserrat text-[10px] text-ink">0{index + 1}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

function ProfileIntro() {
  const [bubbleVisible, setBubbleVisible] = useState(false);
  return (
    <p className="font-montserrat flex items-center whitespace-nowrap text-[18px] uppercase tracking-widest text-[#fefefe]">
      Ciao, sono
      <span
        className="relative ml-3 size-[50px] shrink-0 md:size-[75px] lg:size-[100px]"
        onClick={() => setBubbleVisible((v) => !v)}
        onMouseEnter={() => setBubbleVisible(true)}
        onMouseLeave={() => setBubbleVisible(false)}
      >
        <span className="block size-full overflow-hidden rounded-full border border-accent">
          <img
            alt="Mattia Albertazzi"
            className="size-full object-contain object-bottom"
            src={profilePhoto}
          />
        </span>
        <span
          aria-hidden={!bubbleVisible}
          className={`pointer-events-none absolute -top-10 left-1/2 whitespace-nowrap rounded-2xl rounded-bl-none bg-accent px-3 py-1.5 font-montserrat text-[12px] font-semibold text-black shadow transition-all duration-200 ${bubbleVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
          style={{ zIndex: 10 }}
        >
          MATTIA ALBERTAZZI
          <span className="absolute -bottom-2.5 left-0 h-0 w-0" style={{ borderTop: "10px solid var(--color-accent)", borderRight: "10px solid transparent" }} />
        </span>
      </span>
    </p>
  );
}

export default function App() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const projectsDrag = useDragScroll(projectsRef);
  const storyDrag = useDragScroll(storyRef);
  const [isSkillsPaused, setIsSkillsPaused] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = `${data.get("nome")} ${data.get("cognome")}`.trim();
    const subject = encodeURIComponent(`Richiesta portfolio da ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${data.get("email")}\n\n${data.get("messaggio")}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="page-surface min-h-screen text-ink selection:bg-ink selection:text-page">
      <SideNav />
      <main className="overflow-hidden pt-16 md:ml-24 md:pt-0">
        <section className="relative flex h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-between overflow-hidden bg-intro px-5 py-4 text-page sm:px-10 md:h-svh md:scroll-mt-0 md:rounded-b-[10px] md:px-16 md:py-8 lg:px-24 lg:py-10" id="intro">
          <div className="border-b border-page pb-4">
            <div className="overflow-hidden">
              <div className={`skills-track flex min-w-max items-center ${isSkillsPaused ? "skills-paused" : ""}`}>
                {[0, 1].map((copy) => (
                  <div
                    aria-hidden={copy === 1 ? "true" : undefined}
                    className={`flex shrink-0 items-center gap-3 pr-3 ${copy === 1 ? "skills-copy" : ""}`}
                    key={copy}
                  >
                    {heroSkills.map((skill) => (
                      <div className="flex items-center gap-3" key={skill}>
                        <span className="font-montserrat text-xs uppercase tracking-widest text-page/80">{skill}</span>
                        <span
                          aria-hidden="true"
                          className={`size-1 rounded-full bg-accent ${skill === heroSkills.at(-1) ? "min-[1281px]:hidden" : ""
                            }`}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <button
              aria-pressed={isSkillsPaused}
              className="skills-toggle mt-3 items-center gap-2 font-montserrat text-[10px] uppercase tracking-widest text-page underline decoration-page/50 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-page"
              onClick={() => setIsSkillsPaused((paused) => !paused)}
              type="button"
            >
              {isSkillsPaused ? "Riprendi animazione" : "Pausa animazione"}
            </button>
          </div>
          <div className="w-full py-3 sm:py-6 md:py-10">
            <div className="flex items-center">
              <div className="min-w-0 flex-1 pr-6">
                <ProfileIntro />
                <h1 className="font-anton mt-5 w-full max-w-none text-[72px] min-[375px]:text-[clamp(5.3125rem,17vw,8rem)] font-normal leading-[0.75] tracking-[0] text-accent md:mt-8 md:text-[min(12vw,calc((100svh-500px)/2))] lg:text-[min(12vw,calc((100svh-520px)/2))] min-[1360px]:text-[15vw]">
                  <span className="fg-inline-bold" data-fge-id="fge-237">SIMPLE, BETTER</span>
                </h1>
                <p className="font-montserrat mt-6 max-w-2xl text-[18px] leading-relaxed text-[#fefefe] md:mt-10">
                  Nei miei progetti cerco di bilanciare al meglio usabilità ed estetica, per creare interfacce intuitive e visivamente coinvolgenti.
                </p>
              </div>
              <div className="hidden w-[249px] shrink-0 self-stretch min-[769px]:block min-[1360px]:w-[327px]">
                <picture className="relative block size-full">
                  <source media="(min-width: 1360px)" srcSet={heroDecoration} />
                  <source media="(min-width: 769px)" srcSet={heroDecorationMd} />
                  <img alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 h-full max-h-[500px] w-auto max-w-full -translate-x-1/2 -translate-y-1/2 object-contain min-[1360px]:max-h-[600px]" src={heroDecorationMd} />
                </picture>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 border-t border-page pt-3 sm:flex-row sm:items-center sm:gap-8 sm:pt-6">
            <a className="font-anton group inline-flex w-fit items-center gap-5 rounded-full bg-accent px-5 py-3 text-base font-normal uppercase text-ink transition-all md:gap-0 md:hover:gap-5 sm:px-7 sm:py-4" href="#contattami">
              mettiamoci in contatto
              <span className="w-[18px] overflow-hidden transition-all duration-300 md:w-0 md:group-hover:w-[18px]"><ArrowIcon /></span>
            </a>
            <div className="flex items-center gap-3">
              {([
                ["in", "LinkedIn", "https://www.linkedin.com/in/mattia-albertazzi", "Vai alla mia pagina di Linkedin", "Vai a Linkdedin"],
                ["Be", "Behance", "https://www.behance.net/mattia-albertazzi", "Vai alla mia pagina di Behance", "Vai a Behance"],
                ["CV", "Scarica CV", "/src/imports/CV.pdf", "Apri il mio Corriculum", "Apri il mio CV"],
              ] as [string, string, string, string, string][]).map(([mark, key, href, ariaLabel, title]) => (
                <a
                  aria-label={ariaLabel}
                  className="grid size-10 place-items-center rounded-full border border-accent bg-transparent text-xs font-semibold text-accent transition hover:scale-105 hover:bg-accent hover:text-black sm:size-11"
                  href={href}
                  key={key}
                  rel="noopener noreferrer"
                  target={href !== "#" ? "_blank" : undefined}
                  title={title}
                >
                  {mark}
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="h-10 bg-page" />
        <section className="scroll-mt-16 bg-ink px-5 py-20 text-page sm:px-10 md:scroll-mt-0 md:rounded-[10px] md:px-16 md:py-28 lg:px-24" id="progetti">
          <SectionTitle index="01 / Selected work">Progetti</SectionTitle>
          <div className="mb-6 flex items-center justify-end">
            <ScrollButtons target={projectsRef} />
          </div>
          <div className="-mr-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pr-5 [scrollbar-width:none] sm:-mr-10 sm:pr-10 md:-mr-16 md:pr-16 lg:-mr-24 lg:pr-24" ref={projectsRef} style={{ cursor: "grab" }} {...projectsDrag}>
            {projects.map((project) => (
              <article aria-label={`Progetto ${project.number}: ${project.title} – ${project.type}`} className="group min-w-[84vw] snap-start sm:min-w-[28rem] lg:min-w-[36rem]" key={project.number}>
                {project.href ? (
                  <a aria-label={`Apri il progetto ${project.title} su Behance`} className="block" href={project.href} rel="noopener noreferrer" target="_blank">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] border border-page transition-colors duration-300 group-hover:border-accent" style={project.imageBg ? { backgroundColor: project.imageBg } : undefined}>
                      {project.image ? (
                        <img alt={project.alt ?? project.title} className="size-full object-cover transition duration-500 group-hover:scale-[1.08]" src={project.image} />
                      ) : (
                        <div aria-hidden="true" className="grid h-full place-items-center bg-page/5">
                          <span className="font-montserrat text-xs uppercase tracking-widest text-page/40">Project image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-page py-5 transition-colors duration-300 group-hover:border-accent">
                      <div>
                        <p className="mb-1 font-montserrat text-xs uppercase tracking-widest text-page/60">{project.type}</p>
                        <h3 className="font-anton text-lg font-normal tracking-[0] text-[#fefefe] md:text-xl">{project.title}</h3>
                      </div>
                      <div aria-label="Tool utilizzati" className="flex gap-2" role="list">
                        {project.tools.map((tool) => <span aria-label={tool} className="grid size-9 place-items-center rounded-full border border-page/30 font-montserrat text-[10px] text-page/60" key={tool} role="listitem">{tool}</span>)}
                      </div>
                    </div>
                  </a>
                ) : (
                  <>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] border border-page transition-colors duration-300 group-hover:border-accent" style={project.imageBg ? { backgroundColor: project.imageBg } : undefined}>
                      {project.image ? (
                        <img alt={project.alt ?? project.title} className="size-full object-cover transition duration-500 group-hover:scale-[1.08]" src={project.image} />
                      ) : (
                        <div aria-hidden="true" className="grid h-full place-items-center bg-page/5">
                          <span className="font-montserrat text-xs uppercase tracking-widest text-page/40">Project image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-page py-5 transition-colors duration-300 group-hover:border-accent">
                      <div>
                        <p className="mb-1 font-montserrat text-xs uppercase tracking-widest text-page/60">{project.type}</p>
                        <h3 className="font-anton text-lg font-normal tracking-[0] text-[#fefefe] md:text-xl">{project.title}</h3>
                      </div>
                      <div aria-label="Tool utilizzati" className="flex gap-2" role="list">
                        {project.tools.map((tool) => <span aria-label={tool} className="grid size-9 place-items-center rounded-full border border-page/30 font-montserrat text-[10px] text-page/60" key={tool} role="listitem">{tool}</span>)}
                      </div>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        </section>

        <div className="h-10 bg-page" />
        <section className="scroll-mt-16 bg-ink px-5 py-20 text-page sm:px-10 md:scroll-mt-0 md:rounded-[10px] md:px-16 md:py-28 lg:px-24" id="about">
          <SectionTitle index="02 / About me">Il mio percorso</SectionTitle>
          <div className="mb-6 flex justify-end min-[1627px]:hidden"><ScrollButtons target={storyRef} /></div>
          <div className="-mr-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pr-5 [scrollbar-width:none] sm:-mr-10 sm:pr-10 md:-mr-16 md:pr-16 lg:-mr-24 lg:pr-24" ref={storyRef} style={{ cursor: "grab" }} {...storyDrag}>
            {story.map((item, index) => (
              <article className="flex h-[420px] min-w-[82vw] snap-start flex-col justify-between overflow-hidden border border-page/20 bg-page p-7 text-ink sm:min-w-80 md:p-9" key={item.year}>
                <div>
                  <span className="font-montserrat text-xs uppercase tracking-widest text-ink">{item.year}</span>
                </div>
                <div>
                  <h3 className="font-anton mb-5 text-xl font-normal tracking-[0]">{item.title}</h3>
                  <p className="leading-relaxed text-ink">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="h-10 bg-page" />
        <section className="scroll-mt-16 bg-ink px-5 py-20 text-page sm:px-10 md:scroll-mt-0 md:rounded-[10px] md:px-16 md:py-28 lg:px-24" id="contattami">
          <SectionTitle index="03 / Contatti">Connettiti con me</SectionTitle>
          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="max-w-md text-lg leading-relaxed text-[#fefefe]">Che si tratti di lavoro o di semplice networking, sarò felice di ricontattarti!</p>
            </div>
            <form className="grid gap-7" onSubmit={handleSubmit}>
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="grid gap-2 text-[16px] uppercase tracking-widest text-page/60">Nome
                  <input className="border-0 border-b border-page/40 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-page outline-none transition placeholder:text-[#fefefe]/50 hover:border-accent focus:border-accent" name="nome" placeholder="Il tuo nome" required />
                </label>
                <label className="grid gap-2 text-[16px] uppercase tracking-widest text-page/60">Cognome
                  <input className="border-0 border-b border-page/40 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-page outline-none transition placeholder:text-[#fefefe]/50 hover:border-accent focus:border-accent" name="cognome" placeholder="Il tuo cognome" required />
                </label>
              </div>
              <label className="grid gap-2 text-[16px] uppercase tracking-widest text-page/60">Email
                <input className="border-0 border-b border-page/40 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-page outline-none transition placeholder:text-[#fefefe]/50 hover:border-accent focus:border-accent" name="email" placeholder="nome@email.com" required type="email" />
              </label>
              <label className="grid gap-2 text-[16px] uppercase tracking-widest text-page/60">Messaggio
                <textarea className="min-h-32 resize-y border-0 border-b border-page/40 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-page outline-none transition placeholder:text-[#fefefe]/50 hover:border-accent focus:border-accent" name="messaggio" placeholder="Raccontami del tuo progetto..." required />
              </label>
              <button className="font-anton group mt-3 inline-flex w-fit items-center gap-5 rounded-full bg-cta px-8 py-4 text-base font-normal uppercase text-ink transition-all md:gap-0 md:hover:gap-5" type="submit">
                Invia messaggio
                <span className="w-[18px] overflow-hidden transition-all duration-300 md:w-0 md:group-hover:w-[18px]"><ArrowIcon /></span>
              </button>
            </form>
          </div>
        </section>

        <div className="h-10 bg-page" />
        <footer className="flex flex-col justify-between gap-4 bg-ink px-5 py-8 font-montserrat text-xs uppercase tracking-widest text-page/40 sm:flex-row sm:px-10 md:rounded-tl-[10px] md:rounded-tr-[10px] md:px-16 lg:px-24">
          <span className="text-page">© 2026 — tutti i diritti riservati</span>
          <span className="text-page">Designed with intention</span>
        </footer>
      </main>
    </div>
  );
}
