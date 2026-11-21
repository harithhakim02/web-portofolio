import SectionTitle from "../components/SectionTitle";
import { Code2, Layers3, MonitorSmartphone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const highlights = [
  {
    icon: Code2,
    title: "Clean code",
    text: "Building maintainable interfaces with reusable components.",
  },
  {
    icon: Layers3,
    title: "Component thinking",
    text: "Breaking complex interfaces into clear, consistent pieces.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive first",
    text: "Creating experiences that work across screen sizes.",
  },
];

export default function About() {
  const { t } = useLanguage();
  return (
    <section className="section-space border-y border-zinc-100/70 dark:border-zinc-900 section-alt">
      <div className="container-width grid gap-12 md:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionTitle eyebrow={t.about.eyebrow} title={t.about.title} />
        </div>
        <div>
          <p className="muted text-lg leading-8">{t.about.p1}</p>
          <p className="muted mt-5 leading-7">{t.about.p2}</p>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="surface rounded-xl p-5">
                <Icon className="text-violet-600" size={22} />
                <h3 className="mt-4 font-bold">
                  {t.about.highlights[index].title}
                </h3>
                <p className="muted mt-2 text-sm leading-6">
                  {t.about.highlights[index].text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
