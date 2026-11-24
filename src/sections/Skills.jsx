import {
  Code2,
  Database,
  Wrench,
  FileCode2,
  Palette,
  Braces,
  Atom,
  Wind,
  Server,
  Layers,
  Globe,
  GitBranch,
  Code,
} from "lucide-react";
import { FaFigma } from "react-icons/fa";
import { BiLogoGithub } from "react-icons/bi";
import SectionTitle from "../components/SectionTitle";
import { skillGroups } from "../data/skills";
import { useLanguage } from "../contexts/LanguageContext";

const groupIcons = [Code2, Database, Wrench];
const skillIcons = {
  HTML5: FileCode2,
  CSS3: Palette,
  JavaScript: Braces,
  "React.js": Atom,
  "Tailwind CSS": Wind,
  "Node.js": Server,
  Laravel: Layers,
  MySQL: Database,
  "REST API": Globe,
  Git: GitBranch,
  GitHub: BiLogoGithub,
  "VS Code": Code,
  Figma: FaFigma,
};
export default function Skills() {
  const { t } = useLanguage();
  return (
    <section className="section-space">
      <div className="container-width">
        <SectionTitle
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          description={t.skills.description}
        />
        <div className="mt-12 grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => {
            const GroupIcon = groupIcons[index];
            return (
              <div key={group.title} className="surface min-w-0 rounded-2xl p-5 sm:p-7">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                    <GroupIcon size={21} />
                  </div>
                  <h3 className="min-w-0 break-words text-base font-bold leading-snug sm:text-lg">
                    {t.skills.groups[index]}
                  </h3>
                </div>
                <div className="mt-6 grid min-w-0 grid-cols-2 gap-2.5 sm:gap-3">
                  {group.items.map((skill) => {
                    const Icon = skillIcons[skill] || Code2;
                    return (
                      <div
                        key={skill}
                        className="flex min-w-0 items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/35 px-2.5 py-3 text-xs font-medium transition hover:-translate-y-0.5 hover:border-violet-300 hover:bg-white/60 sm:gap-2.5 sm:px-3 sm:text-sm dark:border-zinc-700/80 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
                      >
                        <Icon size={18} className="shrink-0 text-violet-600" />
                        <span className="min-w-0 truncate">{skill}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
