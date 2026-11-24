import { ArrowDown, ArrowUpRight } from "lucide-react";
import { BiLogoGithub, BiLogoLinkedin, BiLogoInstagram } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { siteConfig } from "../data/siteConfig";

export default function Hero() {
  const { t } = useLanguage();
  const isOpenToOpportunities = siteConfig.openToOpportunities;

  return (
    <section className="container-width grid min-h-[680px] items-center gap-12 py-20 md:grid-cols-[1.1fr_.9fr] lg:gap-20">
      <div className="relative z-10">
        <div
          className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${
            isOpenToOpportunities
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "border-zinc-400/30 bg-zinc-500/10 text-zinc-600 dark:text-zinc-300"
          }`}
          aria-label={
            isOpenToOpportunities ? t.hero.statusOpen : t.hero.statusClosed
          }
        >
          <span
            className={`h-2 w-2 rounded-full ${isOpenToOpportunities ? "bg-emerald-500" : "bg-zinc-400"}`}
          />
          {isOpenToOpportunities ? t.hero.statusOpen : t.hero.statusClosed}
        </div>
        <p className="eyebrow">{t.hero.role}</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[1.08] tracking-[-.065em] sm:text-6xl lg:text-[4.4rem]">
          {t.hero.greeting} <span className="hero-name">Hakim</span>
          {t.hero.nameSuffix}
          <br />
          <span className="hero-title-accent">{t.hero.line}</span>
        </h1>
        <p className="muted mt-7 max-w-xl text-base leading-8">
          {t.hero.description}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/projects" className="btn-primary">
            {t.hero.work} <ArrowUpRight size={17} />
          </Link>
          <a href="/Harith-CV.pdf" download className="btn-secondary">
            {t.hero.cv}
          </a>
        </div>
        <div className="mt-10 flex items-center gap-3 text-zinc-500">
          <a
            href="https://github.com/harithhakim02"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition hover:text-[var(--accent)]"
          >
            <BiLogoGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/harith-hakim-30980b211/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-[var(--accent)]"
          >
            <BiLogoLinkedin size={20} />
          </a>
          <a
            href="https://www.instagram.com/harithhakimm_"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-[var(--accent)]"
          >
            <BiLogoInstagram size={20} />
          </a>
          <span className="h-px w-12 bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-xs">{t.hero.based}</span>
        </div>
      </div>

      <div className="hero-photo-wrap relative mx-auto w-full max-w-[390px]">
        <div className="hero-photo-glow absolute -inset-5 rounded-[2.5rem] blur-2xl" />
        <div className="hero-photo-frame relative aspect-[4/5] overflow-hidden rounded-[2.2rem] border p-3">
          <div className="relative h-full overflow-hidden rounded-[1.65rem]">
            <img
              src="/profile-photo-1080.webp"
              srcSet="/profile-photo-520.webp 520w, /profile-photo-840.webp 840w, /profile-photo-1080.webp 1080w"
              sizes="(max-width: 767px) calc(100vw - 58px), (max-width: 1100px) min(314px, calc(34vw - 26px)), 364px"
              alt="Foto profil Hakim"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1080"
              height="1350"
              className="h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/10" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white sm:p-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-white/70">
                  {t.hero.photoLabel}
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight">Hakim</p>
                <p className="mt-1 text-sm text-white/75">{t.hero.role}</p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/15 text-2xl backdrop-blur-md">
                ↗
              </span>
            </div>
          </div>
        </div>
        <div className="hero-photo-caption absolute -bottom-5 -left-5 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-9">
          <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[var(--text-muted)]">
            {t.hero.roleLabel}
          </p>
          <p className="mt-1 text-sm font-bold">{t.hero.photoCaption}</p>
        </div>
      </div>
      <a
        href="#about"
        className="muted hidden items-center gap-2 text-xs md:flex"
      >
        <ArrowDown size={15} /> {t.hero.scroll}
      </a>
    </section>
  );
}
