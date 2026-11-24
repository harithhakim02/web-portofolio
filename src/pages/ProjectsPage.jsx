import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { projectCategories } from "../data/projectCategories";
import { useLanguage } from "../contexts/LanguageContext";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const location = useLocation();
  const [category, setCategory] = useState("All");
  const categories = projectCategories;
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
      <Link
        to="/"
        state={{ scrollTo: "projects" }}
        className="project-back-link mb-8"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {language === "id" ? "Kembali ke beranda" : "Back to home"}
      </Link>
      <SectionTitle
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="projects-category-list my-9 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("All")}
          className={`projects-category-chip rounded-full px-4 py-2 text-sm transition ${category === "All" ? "is-active" : ""}`}
        >
          {copy.all}
        </button>
        {categories.map((item) => (
          <button
            key={item.value}
            onClick={() => setCategory(item.value)}
            className={`projects-category-chip rounded-full px-4 py-2 text-sm transition ${category === item.value ? "is-active" : ""}`}
          >
            {item.label[language] || item.label.en || item.value}
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
