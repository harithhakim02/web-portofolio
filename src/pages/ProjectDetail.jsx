import { useLayoutEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Image as ImageIcon,
  Monitor,
  Images,
} from "lucide-react";
import { projects } from "../data/projects";
import { useLanguage, projectTranslations } from "../contexts/LanguageContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const project = projects.find((item) => item.id === id);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
    return () => {
      document.documentElement.style.overflowY = "";
      document.body.style.overflowY = "";
    };
  }, [id]);

  if (!project) {
    return (
      <div className="container-width min-h-[70vh] py-24">
        <h1 className="text-3xl font-bold">{t.notFound.title}</h1>
        <Link className="mt-6 inline-flex text-[var(--accent)]" to="/projects">
          ← {t.projectDetail.back}
        </Link>
      </div>
    );
  }

  const copy = {
    ...project,
    ...(projectTranslations[language]?.[project.id] || {}),
  };
  const gallery = (project.gallery || []).filter(Boolean);
  const returnTo = location.state?.returnTo || "/projects";
  const returnScrollY = location.state?.returnScrollY;

  const handleBack = () => {
    navigate(returnTo, {
      state:
        typeof returnScrollY === "number"
          ? { restoreScrollY: returnScrollY }
          : null,
    });
  };

  return (
    <main className="project-detail-page">
      <div className="container-width py-10 md:py-14">
        <button
          type="button"
          onClick={handleBack}
          className="project-back-link"
        >
          <ArrowLeft size={16} /> {t.projectDetail.back}
        </button>

        <header className="project-detail-heading">
          <div className="min-w-0">
            <p className="eyebrow">{copy.category}</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              {copy.title}
            </h1>
            <p className="muted mt-4 max-w-2xl text-base leading-7 md:text-lg">
              {copy.description}
            </p>
          </div>
          <div className="project-detail-index" aria-hidden="true">
            {t.projectDetail.projectLabel}
            <br />
            <span>
              {String(
                projects.findIndex((item) => item.id === id) + 1,
              ).padStart(2, "0")}
            </span>
          </div>
        </header>

        <section
          className="project-visual-section"
          aria-label={t.projectDetail.preview}
        >
          <div className="project-visual-topline">
            <span>
              <Monitor size={15} />{" "}
              {t.projectDetail.mainPreview}
            </span>
            <span>
              {t.projectDetail.showcase}
            </span>
          </div>
          {project.image ? (
            <a
              className="project-main-image-stage"
              href={project.image}
              target="_blank"
              rel="noreferrer"
              aria-label={
                t.projectDetail.openMainImage
              }
            >
              <img
                src={project.image}
                alt={`${copy.title} preview`}
                className="project-main-image"
              />
              <span className="project-image-open">
                <ArrowUpRight size={15} />{" "}
                {t.projectDetail.viewImage}
              </span>
            </a>
          ) : (
            <div className={`project-main-image-placeholder ${project.color}`}>
              <div className="project-placeholder-card">
                <ImageIcon size={30} />
                <p>
                  {t.projectDetail.missingImage}
                </p>
                <span>
                  {t.projectDetail.addImageHelp}
                </span>
              </div>
            </div>
          )}
        </section>

        <div className="project-detail-content">
          <article className="project-overview-column">
            <p className="eyebrow">{t.projectDetail.overview}</p>
            <p className="muted mt-4 text-base leading-8 md:text-lg">
              {copy.overview}
            </p>
            <h2 className="mt-10 text-xl font-bold md:text-2xl">
              {t.projectDetail.features}
            </h2>
            <ul className="project-feature-list">
              {copy.features.map((feature, index) => (
                <li key={feature}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {feature}
                </li>
              ))}
            </ul>
          </article>

          <aside className="project-info-panel">
            <p className="eyebrow">
              {t.projectDetail.projectInformation}
            </p>
            <h2 className="mt-3 text-xl font-bold">
              {t.projectDetail.builtWith}
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="project-tech-chip">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.demo}
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                {t.projectDetail.liveDemo} <ArrowUpRight size={15} />
              </a>
              <a
                href={project.github}
                className="btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={15} /> {t.projectDetail.source}
              </a>
            </div>
            <p className="muted mt-4 text-xs leading-5">
              {t.projectDetail.updateLinks}
            </p>
          </aside>
        </div>

        {gallery.length > 0 && (
          <section className="project-gallery-section">
            <div className="project-gallery-heading">
              <div>
                <p className="eyebrow">
                  {t.projectDetail.visualDocumentation}
                </p>
                <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                  {t.projectDetail.exploreInterface}
                </h2>
                <p className="muted mt-2 text-sm">
                  {t.projectDetail.galleryDescription}
                </p>
              </div>
              <span className="project-gallery-count">
                <Images size={15} /> {String(gallery.length).padStart(2, "0")}{" "}
                {t.projectDetail.image}
              </span>
            </div>
            <div className="project-gallery-grid">
              {gallery.map((src, index) => (
                <figure
                  key={`${src}-${index}`}
                  className="project-gallery-item"
                >
                  <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="project-gallery-image-stage"
                    aria-label={`${t.projectDetail.openImage} ${index + 1}`}
                  >
                    <img
                      src={src}
                      alt={`${copy.title} screenshot ${index + 1}`}
                      loading="lazy"
                      className="project-gallery-image"
                    />
                    <span className="project-gallery-zoom">
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                  <figcaption>
                    <span>
                      {t.projectDetail.galleryScreen}{" "}
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{copy.title}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
