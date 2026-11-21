import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
export const palettes = [
  { id: "white", name: "Minimal White", light: ["#fbfcfd", "#e8f2f0", "#f8fafc"], dark: ["#111827", "#1c2030", "#171923"], swatch: "linear-gradient(135deg,#fbfcff,#dbeafe)" },
  { id: "cream", name: "Soft Cream", light: ["#fffaf0", "#f4ead8", "#faf5eb"], dark: ["#211d19", "#30271f", "#211f1c"], swatch: "linear-gradient(135deg,#fffaf0,#e9d8bd)" },
  { id: "sage", name: "Sage Green", light: ["#f5f8f1", "#e1ebdc", "#f0f4ec"], dark: ["#17211c", "#26352b", "#1b241f"], swatch: "linear-gradient(135deg,#f5f8f1,#b8cbb5)" },
  { id: "blue", name: "Misty Blue", light: ["#f3f8fc", "#dceaf4", "#edf4f8"], dark: ["#151e29", "#203347", "#19232e"], swatch: "linear-gradient(135deg,#f3f8fc,#b7d2e5)" },
  { id: "lavender", name: "Soft Lavender", light: ["#faf7ff", "#e9e0f5", "#f3eff9"], dark: ["#1d1928", "#30263f", "#211d2d"], swatch: "linear-gradient(135deg,#faf7ff,#d4c3eb)" },
  { id: "midnight", name: "Midnight", light: ["#f1f3f8", "#dce2ee", "#e9edf5"], dark: ["#0c101a", "#1b2335", "#111827"], swatch: "linear-gradient(135deg,#64748b,#20283b)" },
  { id: "charcoal", name: "Charcoal", light: ["#f5f6f4", "#e3e7e2", "#edf0ed"], dark: ["#171b19", "#29312c", "#1d2420"], swatch: "linear-gradient(135deg,#9ca3a0,#353d38)" },
];
export const accents = [
  { id: "clay", name: "Warm Clay", value: "#B87962" },
  { id: "blue", name: "Blue", value: "#3b82f6" },
  { id: "green", name: "Green", value: "#16a34a" },
  { id: "rose", name: "Rose", value: "#f43f5e" },
  { id: "orange", name: "Orange", value: "#f08a3c" },
  { id: "teal", name: "Teal", value: "#0d9488" },
  { id: "slate", name: "Soft Slate", value: "#718895" },
];
const read = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => read("theme-mode", "auto"));
  const [palette, setPalette] = useState(() => read("theme-palette", "white"));
  const [accent, setAccent] = useState(() => read("theme-accent-v2", "clay"));
  const [systemDark, setSystemDark] = useState(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false);
  const isDark = mode === "auto" ? systemDark : mode === "dark";
  useEffect(() => {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!media) return;
    const update = e => setSystemDark(e.matches);
    setSystemDark(media.matches);
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);
  useLayoutEffect(() => {
    const root = document.documentElement;
    const selected = palettes.find(x => x.id === palette) || palettes[0];
    const color = accents.find(x => x.id === accent)?.value || accents[0].value;
    const stops = selected[isDark ? "dark" : "light"];
    // Update the document canvas and all visible layers atomically before paint.
    root.classList.toggle("dark", isDark);
    root.dataset.theme = isDark ? "dark" : "light";
    root.style.colorScheme = isDark ? "dark" : "light";
    root.style.backgroundColor = stops[0];
    root.style.setProperty("--page-bg", stops[0]);
    root.style.setProperty("--gradient-mid", stops[1]);
    root.style.setProperty("--gradient-end", stops[2]);
    root.style.setProperty("--accent", color);
    root.style.setProperty("--accent-soft", `color-mix(in srgb, ${color} 13%, transparent)`);
    document.body?.style.setProperty("background-color", stops[0]);
    const appRoot = document.getElementById("root");
    appRoot?.style.setProperty("background-color", stops[0]);
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", stops[0]);
    try { localStorage.setItem("theme-mode", mode); localStorage.setItem("theme-palette", palette); localStorage.setItem("theme-accent-v2", accent); } catch {}
  }, [mode, palette, accent, isDark]);
  const resetTheme = () => { setMode("auto"); setPalette("white"); setAccent("clay"); };
  const value = useMemo(() => ({ mode, setMode, theme: isDark ? "dark" : "light", palette, setPalette, accent, setAccent, palettes, accents, resetTheme }), [mode, isDark, palette, accent]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme() { const value = useContext(ThemeContext); if (!value) throw new Error("useTheme must be used inside ThemeProvider"); return value; }
