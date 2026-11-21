import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return <section className="container-width flex min-h-[70vh] flex-col items-center justify-center text-center"><p className="text-8xl font-black tracking-tighter text-violet-600">404</p><h1 className="mt-5 text-2xl font-bold">{t.notFound.title}</h1><p className="muted mt-3">{t.notFound.description}</p><Link to="/" className="btn-primary mt-8">{t.notFound.back}</Link></section>;
}
