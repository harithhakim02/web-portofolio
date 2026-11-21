import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { useLanguage } from "../contexts/LanguageContext";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const location = useLocation();
  const [category, setCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];
  const filtered = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((project) => project.category === category),
    [category],
  );
  const copy =
    language === "id"
      ? {
          eyebrow: "Portofolio",
          title: "Semua proyek",
          description:
            "Jelajahi proyek dan eksperimen yang pernah saya kerjakan. Pilih kartu untuk melihat detailnya.",
          all: "Semua",
        }
      : {
          eyebrow: "Portfolio",
          title: "All projects",
          description:
            "Browse the projects and experiments I've worked on. Select a card to see more details.",
          all: "All",
        };

  useEffect(() => {
    const restoreScrollY = location.state?.restoreScrollY;
    const frame = requestAnimationFrame(() => {
      window.scrollTo({
        top: typeof restoreScrollY === "number" ? restoreScrollY : 0,
        left: 0,
        behavior: "auto",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.state]);

  return (
    <section className="container-width min-h-[70vh] py-20">
      <SectionTitle
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="my-9 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-sm transition ${category === item ? "bg-[var(--accent)] text-white" : "border border-zinc-200 hover:border-[var(--accent)] dark:border-zinc-700"}`}
          >
            {item === "All"
              ? copy.all
              : language === "id"
                ? item === "Frontend Website"
                  ? "Website Frontend"
                  : item === "Web Application"
                    ? "Aplikasi Web"
                    : item === "Dashboard"
                      ? "Dasbor"
                      : item
                : item}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
