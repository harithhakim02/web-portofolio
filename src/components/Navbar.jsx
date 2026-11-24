import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight, Languages } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import BrandLogo from "./BrandLogo";
import { useLanguage } from "../contexts/LanguageContext";

const sectionIds = ["about", "skills", "projects", "experience", "contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (location.pathname !== "/") {
      setActive(
        location.pathname.startsWith("/projects") ? "projects-page" : "",
      );
      return undefined;
    }

    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (window.scrollY < 80) {
          setActive("top");
          return;
        }

        // Pick the section crossing a fixed reading line below the sticky navbar.
        // This avoids IntersectionObserver ratio ties when adjacent sections are tall.
        const readingLine = Math.min(window.innerHeight * 0.38, 340);
        const sections = ["top", ...sectionIds]
          .map((id) => document.getElementById(id))
          .filter(Boolean)
          .map((element) => ({
            id: element.id,
            top: element.getBoundingClientRect().top,
            bottom: element.getBoundingClientRect().bottom,
          }));

        const current = sections.find(
          (section) =>
            section.top <= readingLine && section.bottom > readingLine,
        );
        if (current) {
          setActive(current.id);
          return;
        }

        const next = sections.find((section) => section.top > readingLine);
        setActive(
          next
            ? sections[sections.indexOf(next) - 1]?.id || next.id
            : "contact",
        );
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [location.pathname]);

  const goToSection = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  const navClass = (id) =>
    `relative py-2 text-sm transition-colors hover:text-[var(--accent)] ${active === id || (id === "projects" && active === "projects-page") ? "font-semibold text-[var(--accent)] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[var(--accent)]" : "text-zinc-600 dark:text-zinc-300"}`;
  const sectionButton = (id, label) => (
    <button
      key={id}
      onClick={() => goToSection(id)}
      aria-current={active === id ? "location" : undefined}
      className={navClass(id)}
    >
      {label}
    </button>
  );

  return (
    <header
      className="sticky top-0 z-50 border-b border-zinc-200/70 backdrop-blur-xl dark:border-zinc-800"
      style={{
        backgroundColor: "color-mix(in srgb, var(--page-bg) 88%, transparent)",
      }}
    >
      <nav className="navbar-inner container-width flex h-[76px] items-center justify-between">
        <Link
          to="/"
          onClick={() => setActive("top")}
          className="inline-flex items-center"
          aria-label="Hakim - Beranda"
        >
          <BrandLogo
            className="navbar-brand-logo"
            alt="Harith Hakim — Web Developer"
          />
        </Link>
        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          <button
            onClick={() => goToSection("top")}
            className={navClass("top")}
          >
            {t.nav.home}
          </button>
          {sectionButton("about", t.nav.about)}
          {sectionButton("skills", t.nav.skills)}
          {sectionButton("projects", t.nav.projects)}
          {sectionButton("experience", t.nav.experience)}
          {sectionButton("contact", t.nav.contact)}
        </div>
        <div className="navbar-actions flex shrink-0 items-center gap-2">
          <button
            onClick={() => setLanguage(language === "en" ? "id" : "en")}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-zinc-200 px-3 text-xs font-semibold transition hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-zinc-700"
            aria-label="Change language"
          >
            <Languages size={15} />
            {language === "en" ? "EN" : "ID"}
          </button>
          <ThemeToggle />
          <button
            onClick={() => goToSection("contact")}
            className="hidden items-center gap-1 rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-90 sm:inline-flex"
          >
            {t.nav.talk} <ArrowUpRight size={15} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full border border-zinc-200 p-2 dark:border-zinc-700 lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="container-width flex flex-col gap-4 border-t border-zinc-200 py-5 dark:border-zinc-800 lg:hidden">
          <button
            onClick={() => goToSection("top")}
            className={`text-left ${navClass("top")}`}
          >
            {t.nav.home}
          </button>
          {sectionButton("about", t.nav.about)}
          {sectionButton("skills", t.nav.skills)}
          {sectionButton("projects", t.nav.projects)}
          {sectionButton("experience", t.nav.experience)}
          {sectionButton("contact", t.nav.contact)}
        </div>
      )}
    </header>
  );
}
