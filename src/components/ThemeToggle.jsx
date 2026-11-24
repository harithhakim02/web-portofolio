import { useEffect, useRef, useState } from "react";
import { Check, Palette, RotateCcw, Sun, Moon, Monitor, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function ThemeToggle() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const { t, language } = useLanguage();
  const { mode, setMode, palette, setPalette, accent, setAccent, palettes, accents, resetTheme } = useTheme();

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      const target = event.target;
      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) return;
      setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const modes = [
    { id: "light", label: t.theme.light, Icon: Sun },
    { id: "dark", label: t.theme.dark, Icon: Moon },
    { id: "auto", label: t.theme.auto, Icon: Monitor },
  ];

  return (
    <div className="relative" ref={panelRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={t.theme.appearance}
        aria-expanded={open}
        aria-controls="appearance-panel"
        title={t.theme.appearance}
        className="rounded-full border border-zinc-200 p-2.5 transition hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-zinc-700"
      >
        {open ? <X size={18} /> : <Palette size={18} />}
      </button>

      {open && (
        <div
          id="appearance-panel"
          role="dialog"
          aria-label={t.theme.appearance}
          className="surface fixed inset-x-3 top-[max(4.5rem,env(safe-area-inset-top))] z-[100] mx-auto max-h-[calc(100dvh-6rem-env(safe-area-inset-bottom))] w-auto max-w-[420px] overflow-x-hidden overflow-y-auto overscroll-contain rounded-2xl p-4 shadow-2xl [scrollbar-gutter:stable] sm:inset-x-4 sm:top-20 sm:max-h-[calc(100dvh-7rem)] sm:p-5 md:absolute md:inset-x-auto md:right-0 md:top-14 md:mx-0 md:max-h-[min(78dvh,680px)] md:w-[340px] md:max-w-[calc(100vw-2rem)]"
        >
          <div className="mb-4">
            <h3 className="font-bold">{t.theme.appearance}</h3>
            <p className="muted mt-1 text-xs">{t.theme.description}</p>
          </div>

          <p className="mb-2 text-[10px] font-bold tracking-[.16em] text-zinc-500">{t.theme.mode}</p>
          <div className="grid grid-cols-3 gap-2">
            {modes.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={mode === id}
                onClick={() => setMode(id)}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${mode === id ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]" : "border-zinc-200 hover:border-[var(--accent)] dark:border-zinc-700"}`}
              >
                <Icon size={14} />{label}
              </button>
            ))}
          </div>

          <p className="mb-3 mt-5 text-[10px] font-bold tracking-[.16em] text-zinc-500">{t.theme.background}</p>
          <div className="grid grid-cols-2 gap-2">
            {palettes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={palette === item.id}
                onClick={() => setPalette(item.id)}
                className={`flex min-w-0 items-center gap-2 rounded-xl border p-2 text-left text-xs transition ${palette === item.id ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-zinc-200 hover:border-[var(--accent)] dark:border-zinc-700"}`}
              >
                <span className="h-6 w-6 shrink-0 rounded-full border border-black/10" style={{ background: item.swatch }} />
                <span className="min-w-0 flex-1 truncate">{language === "id" ? ({ "Minimal White": "Putih Minimalis", "Soft Cream": "Krem Lembut", "Sage Green": "Hijau Sage", "Misty Blue": "Biru Lembut", "Soft Lavender": "Lavender Lembut", Midnight: "Midnight", Charcoal: "Arang" }[item.name] || item.name) : item.name}</span>
                {palette === item.id && <Check size={14} className="shrink-0 text-[var(--accent)]" />}
              </button>
            ))}
          </div>

          <p className="mb-3 mt-5 text-[10px] font-bold tracking-[.16em] text-zinc-500">{t.theme.accent}</p>
          <div className="flex flex-wrap items-center gap-3">
            {accents.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAccent(item.id)}
                title={item.name}
                aria-label={`${item.name} accent`}
                aria-pressed={accent === item.id}
                className={`flex h-8 w-8 items-center justify-center rounded-full ring-offset-2 ring-offset-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] dark:ring-offset-zinc-900 ${accent === item.id ? "ring-2 ring-zinc-500" : "hover:scale-110"}`}
                style={{ background: item.value }}
              >
                {accent === item.id && <Check size={15} className="text-white" />}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={resetTheme}
            className="mt-5 flex w-full items-center justify-center gap-2 border-t border-zinc-200 pt-4 text-xs font-semibold text-zinc-500 transition hover:text-[var(--accent)] dark:border-zinc-700"
          >
            <RotateCcw size={13} /> {t.theme.reset}
          </button>
        </div>
      )}
    </div>
  );
}
