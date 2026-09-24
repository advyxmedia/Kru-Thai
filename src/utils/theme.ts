import { ThemeMode } from '../types';

const THEME_STORAGE_KEY = 'kruthai_theme_mode_v1';

export function getInitialThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (saved && (saved === 'auto' || saved === 'light' || saved === 'dark')) {
      return saved;
    }
  } catch (e) {}
  // Default to day (light) mode so users are not trapped in dark mode at night
  return 'light';
}

export function isNightTimeNow(): boolean {
  const hour = new Date().getHours();
  // Night between 18:00 (6 PM) and 06:00 (6 AM)
  return hour >= 18 || hour < 6;
}

export function resolveEffectiveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'light') return 'light';
  if (mode === 'dark') return 'dark';

  // Auto mode: check local time (6 PM - 6 AM is night)
  if (typeof window !== 'undefined') {
    if (isNightTimeNow()) return 'dark';
    return 'light';
  }
  return 'light';
}

export function applyThemeMode(mode: ThemeMode): void {
  if (typeof window === 'undefined') return;

  const effective = resolveEffectiveTheme(mode);
  const root = document.documentElement;

  if (effective === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Set explicit color-scheme so browser controls and scrollbars match
  root.style.colorScheme = effective;
  root.setAttribute('data-theme', effective);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (e) {}
}
