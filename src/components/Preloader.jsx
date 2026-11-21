import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import { useLanguage } from "../contexts/LanguageContext";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const revealTimer = window.setTimeout(() => setLeaving(true), reduceMotion ? 420 : 980);
    const removeTimer = window.setTimeout(
      () => setVisible(false),
      reduceMotion ? 460 : 1420,
    );
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`preloader${leaving ? " preloader-leaving" : ""}`}
      role="status"
      aria-label={t.preloader.caption}
      aria-live="polite"
    >
      <div className="preloader-orb preloader-orb-one" />
      <div className="preloader-orb preloader-orb-two" />
      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <BrandLogo
            className="preloader-logo"
            alt="Harith Hakim — Web Developer"
          />
        </div>
        <div className="preloader-progress" aria-hidden="true">
          <span />
        </div>
        <p className="preloader-caption">{t.preloader.caption}</p>
      </div>
    </div>
  );
}
