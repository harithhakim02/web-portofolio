import { ArrowUpRight } from "lucide-react";
import { BiLogoGithub, BiLogoLinkedin, BiLogoInstagram } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="container-width flex flex-col items-center justify-between gap-5 py-8 text-sm sm:flex-row">
        <Link
          to="/"
          className="inline-flex items-center"
          aria-label="Hakim - Beranda"
        >
          <BrandLogo
            className="footer-brand-logo"
            alt="Harith Hakim — Web Developer"
          />
        </Link>
        <p className="muted text-center">
          © {new Date().getFullYear()} Harith Hakim
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/harithhakim02"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="muted hover:text-violet-600"
          >
            <BiLogoGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/harith-hakim-30980b211/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="muted hover:text-violet-600"
          >
            <BiLogoLinkedin size={18} />
          </a>
          <a
            href="https://www.instagram.com/harithhakimm_"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="muted hover:text-violet-600"
          >
            <BiLogoInstagram size={18} />
          </a>
          <a
            href="#top"
            className="muted flex items-center gap-1 hover:text-violet-600"
          >
            {t.footer.back} <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
