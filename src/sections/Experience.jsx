import React from "react";
import {
  BriefcaseBusiness,
  GraduationCap,
  ArrowUpRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { experiences } from "../data/experiences";
import { useLanguage } from "../contexts/LanguageContext";

function SectionKicker({ icon: Icon, title, count, note, entriesLabel }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon size={19} />
        </span>
        <div>
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          {note && <p className="muted mt-1 text-xs">{note}</p>}
        </div>
      </div>
      <span className="font-mono text-xs tracking-widest text-[var(--text-muted)]">
        {String(count).padStart(2, "0")}{" "}
        <span className="opacity-50">/ {entriesLabel}</span>
      </span>
    </div>
  );
}

function InstitutionLogo({ src, alt, fallback = "work" }) {
  const [failed, setFailed] = React.useState(false);
  const Icon = fallback === "education" ? GraduationCap : BriefcaseBusiness;
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-2.5 shadow-sm dark:bg-white/95">
      {src && !failed ? (
        <img
          src={src}
          alt={alt || "Institution logo"}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
          loading="lazy"
        />
      ) : (
        <Icon size={23} className="text-[var(--accent)]" aria-hidden="true" />
      )}
    </div>
  );
}

function getLocalizedDescription(description, language) {
  if (!description) return "";
  // Backward compatibility: plain strings are shown as-is in both languages.
  if (typeof description === "string") return description;
  return description[language] || description.en || description.id || "";
}

function ExperienceRail({ items, emptyLabel, labels, language }) {
  const railRef = React.useRef(null);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = React.useState(false);

  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail || !items.length) {
      setHasHorizontalOverflow(false);
      return undefined;
    }

    const checkOverflow = () => {
      setHasHorizontalOverflow(rail.scrollWidth > rail.clientWidth + 2);
    };

    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(rail);
    if (rail.parentElement) resizeObserver.observe(rail.parentElement);
    window.addEventListener("resize", checkOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [items.length]);

  if (!items.length)
    return (
      <p className="muted rounded-2xl border border-dashed border-[var(--line)] p-6 text-sm">
        {emptyLabel}
      </p>
    );
  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.2em] text-[var(--text-muted)]">
        <span>{labels.careerArchive}</span>
        {hasHorizontalOverflow && (
          <span className="hidden sm:inline">
            {labels.scrollHint} <span className="text-[var(--accent)]">↗</span>
          </span>
        )}
      </div>
      <div ref={railRef} className="experience-rail flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5">
        {items.map((item, index) => (
          <article
            key={item.id ?? `${item.type}-${item.role}-${index}`}
            className="experience-panel group relative flex min-h-[270px] w-[min(88vw,390px)] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] border border-[var(--line)] p-6 sm:w-[410px] sm:p-7"
          >
            <span className="pointer-events-none absolute -right-2 -top-9 select-none font-mono text-[150px] font-black leading-none text-[var(--accent)] opacity-[.075]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <InstitutionLogo
                  src={item.logo}
                  alt={item.logoAlt || item.place}
                  fallback="work"
                />
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-[11px] font-semibold text-[var(--accent)]">
                  <CalendarDays size={13} />
                  {item.period}
                </span>
              </div>
              <ArrowUpRight
                size={18}
                className="mt-1 shrink-0 text-[var(--text-muted)] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
              />
            </div>
            <div className="relative z-10 mt-7">
              <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[.22em] text-[var(--accent)]">
                {labels.position} · {String(index + 1).padStart(2, "0")}
              </p>
              <h4 className="max-w-[300px] text-2xl font-bold leading-tight tracking-[-.04em]">
                {item.role}
              </h4>
              <p className="muted mt-2 text-sm font-medium">{item.place}</p>
            </div>
            {getLocalizedDescription(item.description, language) && (
              <p className="muted relative z-10 mt-5 max-w-[330px] text-sm leading-6">
                {getLocalizedDescription(item.description, language)}
              </p>
            )}
            <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100" />
          </article>
        ))}
      </div>
      <style>{`.experience-rail{scrollbar-width:thin;scrollbar-color:var(--accent) color-mix(in srgb,var(--line) 60%,transparent)}.experience-panel{background:linear-gradient(145deg,color-mix(in srgb,var(--page-bg) 88%,white 12%),color-mix(in srgb,var(--accent) 7%,var(--page-bg)));}.dark .experience-panel{background:linear-gradient(145deg,color-mix(in srgb,var(--page-bg) 90%,white 3%),color-mix(in srgb,var(--accent) 13%,var(--page-bg)));}`}</style>
    </div>
  );
}

function EducationIndex({ items, emptyLabel, labels, language }) {
  if (!items.length)
    return (
      <p className="muted rounded-2xl border border-dashed border-[var(--line)] p-6 text-sm">
        {emptyLabel}
      </p>
    );
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={item.id ?? `${item.type}-${item.role}-${index}`}
          className="education-ticket group relative overflow-hidden rounded-2xl border border-[var(--line)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
        >
          <div className="mb-6 flex items-start justify-between gap-3">
            <InstitutionLogo
              src={item.logo}
              alt={item.logoAlt || item.place}
              fallback="education"
            />
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wider text-[var(--accent)]">
              {item.period}
            </span>
          </div>
          <h4 className="text-lg font-bold leading-snug tracking-tight">
            {item.role}
          </h4>
          <p className="muted mt-2 text-sm leading-6">{item.place}</p>
          <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-3">
            <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--text-muted)]">
              {labels.educationLabel}
            </span>
            <Sparkles
              size={14}
              className="text-[var(--accent)] opacity-60 transition group-hover:rotate-12 group-hover:opacity-100"
            />
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Experience() {
  const { t, language } = useLanguage();
  const workItems = experiences.filter(
    (item) => item.type?.toLowerCase() === "experience",
  );
  const internshipItems = experiences.filter(
    (item) => item.type?.toLowerCase() === "internship",
  );
  const educationItems = experiences.filter(
    (item) => item.type?.toLowerCase() === "education",
  );
  return (
    <section className="section-space">
      <div className="container-width">
        <div className="mb-14 max-w-2xl">
          <SectionTitle
            eyebrow={t.experience.eyebrow}
            title={t.experience.title}
            description={t.experience.description}
          />
        </div>
        <section className="mb-14">
          <SectionKicker
            icon={BriefcaseBusiness}
            title={t.experience.workTitle}
            count={workItems.length}
            note={t.experience.workNote}
            entriesLabel={t.experience.entriesLabel}
          />
          <ExperienceRail
            items={workItems}
            emptyLabel={t.experience.emptyWork}
            labels={t.experience}
            language={language}
          />
        </section>
        <section className="mb-16">
          <SectionKicker
            icon={Sparkles}
            title={t.experience.internshipTitle}
            count={internshipItems.length}
            note={t.experience.internshipNote}
            entriesLabel={t.experience.entriesLabel}
          />
          <ExperienceRail
            items={internshipItems}
            emptyLabel={t.experience.emptyInternship}
            labels={t.experience}
            language={language}
          />
        </section>
        <section className="relative">
          <div className="mb-7 flex items-end justify-between gap-4">
            <SectionKicker
              icon={GraduationCap}
              title={t.experience.educationTitle}
              count={educationItems.length}
              note={t.experience.educationNote}
              entriesLabel={t.experience.entriesLabel}
            />
            <span className="mb-1 hidden font-mono text-[10px] uppercase tracking-[.2em] text-[var(--text-muted)] sm:block">
              {t.experience.learningLog}
            </span>
          </div>
          <EducationIndex
            items={educationItems}
            emptyLabel={t.experience.emptyEducation}
            labels={t.experience}
            language={language}
          />
        </section>
      </div>
    </section>
  );
}
