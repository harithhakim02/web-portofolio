import { ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage, projectTranslations } from "../contexts/LanguageContext";

export default function ProjectCard({ project }) {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const copy = projectTranslations[language]?.[project.id] || project;

  return (
    <article className="surface group overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]">
      <Link
        to={`/projects/${project.id}`}
        onClick={(event) => {
          if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          event.preventDefault();
          navigate(`/projects/${project.id}`, {
            state: {
              returnTo: location.pathname,
              returnScrollY: window.scrollY,
            },
          });
        }}
        className="block"
      >
        <div
          className={`project-card-media relative flex aspect-[16/10] items-center justify-center overflow-hidden ${project.image ? "bg-zinc-100 dark:bg-zinc-900" : project.color}`}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${copy.title} — project preview`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                event.currentTarget.nextElementSibling?.classList.remove(
                  "hidden",
                );
              }}
            />
          ) : null}
          <div
            className={`project-image-fallback absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 ${project.image ? "hidden" : ""}`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-black/10 bg-white/65 text-[var(--accent)] shadow-lg backdrop-blur dark:border-white/10 dark:bg-zinc-900/65">
              <ImageIcon size={28} strokeWidth={1.5} />
            </div>
            <span className="rounded-full border border-black/10 bg-white/65 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-zinc-600 backdrop-blur dark:border-white/10 dark:bg-zinc-900/65 dark:text-zinc-300">
              {language === "id"
                ? "Tambahkan gambar project"
                : "Add project screenshot"}
            </span>
          </div>
          <span className="absolute bottom-4 right-4 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.16em] text-white backdrop-blur">
            {copy.category}
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {copy.category}
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight">
                {copy.title}
              </h3>
            </div>
            <ArrowUpRight
              className="mt-1 shrink-0 text-zinc-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
              size={20}
            />
          </div>
          <p className="muted mt-3 text-sm leading-6">{copy.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
