import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { useLanguage } from "../contexts/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  return (
    <section className="section-space border-y border-zinc-100/70 dark:border-zinc-900 section-alt">
      <div className="container-width">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            description={t.projects.description}
          />
          <Link
            to="/projects"
            className="projects-view-all inline-flex items-center gap-2 text-sm font-semibold transition-all"
          >
            {t.projects.all} <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
