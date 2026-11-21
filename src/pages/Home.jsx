import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Experience from "../sections/Experience";
import Contact from "../sections/Contact";

export default function Home() {
  const location = useLocation();

  useLayoutEffect(() => {
    const sections = Array.from(document.querySelectorAll(".home-glass-section"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Enable the glass-only reveal after hydration so the page never stays hidden
    // if JavaScript or IntersectionObserver is unavailable.
    document.documentElement.classList.add("glass-reveal-ready");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px -7% 0px" },
      );

      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }

    return undefined;
  }, []);

  useEffect(() => {
    const target = location.state?.scrollTo || location.hash.replace("#", "");
    const restoreScrollY = location.state?.restoreScrollY;
    if (!target && typeof restoreScrollY !== "number") return undefined;

    const frame = requestAnimationFrame(() => {
      if (target) {
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        window.scrollTo({ top: restoreScrollY, left: 0, behavior: "auto" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.state, location.hash]);

  return (
    <>
      <div id="top" className="home-glass-section">
        <Hero />
      </div>
      <div id="about" className="home-glass-section">
        <About />
      </div>
      <div id="skills" className="home-glass-section">
        <Skills />
      </div>
      <div id="projects" className="home-glass-section">
        <Projects />
      </div>
      <div id="experience" className="home-glass-section">
        <Experience />
      </div>
      <div id="contact" className="home-glass-section">
        <Contact />
      </div>
    </>
  );
}
