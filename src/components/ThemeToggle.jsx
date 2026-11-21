import { useState } from "react";
import { Check, Palette, RotateCcw, Sun, Moon, Monitor, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function ThemeToggle() {
  const [open, setOpen] = useState(false);
  const { t, language } = useLanguage();
  const { mode, setMode, palette, setPalette, accent, setAccent, palettes, accents, resetTheme } = useTheme();
  const modes = [
    { id: "light", label: t.theme.light, Icon: Sun },
    { id: "dark", label: t.theme.dark, Icon: Moon },
    { id: "auto", label: t.theme.auto, Icon: Monitor },
  ];
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-label={t.theme.appearance} title={t.theme.appearance}
        className="rounded-full border border-zinc-200 p-2.5 transition hover:border-violet-400 hover:text-violet-600 dark:border-zinc-700">
        {open ? <X size={18}/> : <Palette size={18}/>}
      </button>
      {open && <>
        <button className="fixed inset-0 z-40 cursor-default" aria-label={t.theme.appearance} onClick={() => setOpen(false)} />
        <div className="surface absolute right-0 top-14 z-50 w-[330px] max-w-[calc(100vw-2rem)] rounded-2xl p-5 shadow-2xl">
          <div className="mb-4"><h3 className="font-bold">{t.theme.appearance}</h3><p className="muted mt-1 text-xs">{t.theme.description}</p></div>
          <p className="mb-2 text-[10px] font-bold tracking-[.16em] text-zinc-500">{t.theme.mode}</p>
          <div className="grid grid-cols-3 gap-2">
            {modes.map(({id,label,Icon}) => <button key={id} onClick={() => setMode(id)} className={`flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${mode === id ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]" : "border-zinc-200 dark:border-zinc-700"}`}><Icon size={14}/>{label}</button>)}
          </div>
          <p className="mb-3 mt-5 text-[10px] font-bold tracking-[.16em] text-zinc-500">{t.theme.background}</p>
          <div className="grid grid-cols-2 gap-2">
            {palettes.map(item => <button key={item.id} onClick={() => setPalette(item.id)} className={`flex items-center gap-2 rounded-xl border p-2 text-left text-xs transition ${palette === item.id ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-zinc-200 dark:border-zinc-700"}`}>
              <span className="h-6 w-6 shrink-0 rounded-full border border-black/10" style={{background:item.swatch}}/>
              <span className="flex-1">{language === "id" ? ({ "Minimal White": "Putih Minimalis", "Soft Cream": "Krem Lembut", "Sage Green": "Hijau Sage", "Misty Blue": "Biru Lembut", "Soft Lavender": "Lavender Lembut", "Midnight": "Midnight", "Charcoal": "Arang" }[item.name] || item.name) : item.name}</span>{palette === item.id && <Check size={14} className="text-[var(--accent)]"/>}
            </button>)}
          </div>
          <p className="mb-3 mt-5 text-[10px] font-bold tracking-[.16em] text-zinc-500">{t.theme.accent}</p>
          <div className="flex items-center gap-3">
            {accents.map(item => <button key={item.id} onClick={() => setAccent(item.id)} title={item.name} aria-label={`${item.name} accent`} className={`flex h-8 w-8 items-center justify-center rounded-full ring-offset-2 ring-offset-white transition dark:ring-offset-zinc-900 ${accent === item.id ? "ring-2 ring-zinc-500" : ""}`} style={{background:item.value}}>{accent === item.id && <Check size={15} className="text-white"/>}</button>)}
          </div>
          <button onClick={resetTheme} className="mt-5 flex w-full items-center justify-center gap-2 border-t border-zinc-200 pt-4 text-xs font-semibold text-zinc-500 transition hover:text-violet-600 dark:border-zinc-700"><RotateCcw size={13}/> Reset to default</button>
        </div>
      </>}
    </div>
  );
}
