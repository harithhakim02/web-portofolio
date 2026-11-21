import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PAGE_META = {
  home: {
    title: "Harith Hakim — Frontend Web Developer | Portfolio",
    description:
      "Harith Hakim is a frontend web developer focused on building responsive, accessible, and user-friendly web experiences with React and JavaScript.",
  },
  projects: {
    title: "Projects — Harith Hakim | Frontend Developer Portfolio",
    description:
      "Explore selected frontend projects by Harith Hakim, including web interfaces, responsive applications, and UI experiments.",
  },
};

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    const isProjects = location.pathname.startsWith("/projects");
    const isDetail = /^\/projects\/[^/]+/.test(location.pathname);
    const projectSlug = isDetail
      ? location.pathname.split("/").filter(Boolean).at(-1)
      : "";
    const projectName = projectSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const meta = isDetail
      ? {
          title: `${projectName} — Project by Harith Hakim`,
          description: `Explore ${projectName}, a frontend project by Harith Hakim. View its overview, features, and technologies.`,
        }
      : isProjects
        ? PAGE_META.projects
        : PAGE_META.home;

    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", meta.description);

    ["og:title", "twitter:title"].forEach((property) => {
      document.querySelector(`meta[property="${property}"], meta[name="${property}"]`)
        ?.setAttribute("content", meta.title);
    });
    ["og:description", "twitter:description"].forEach((property) => {
      document.querySelector(`meta[property="${property}"], meta[name="${property}"]`)
        ?.setAttribute("content", meta.description);
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-zinc-900 transition-colors duration-300 dark:text-zinc-100">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
