import { DEFAULT_THEME_CONFIGS, THEME_KEY, THEME_MODE_KEY } from './constants';
import { initializeCSS, setThemeAttribute } from './tools';
import { ThemeType, type ThemeConfigs } from './types';

export const media = window.matchMedia('(prefers-color-scheme: dark)');

export default function initTheme(
  config: ThemeConfigs = DEFAULT_THEME_CONFIGS
) {
  setThemeAttribute(THEME_KEY, THEME_MODE_KEY, ThemeType.Dark, true);
  initializeCSS(config, THEME_KEY, THEME_MODE_KEY);
}

export const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute(THEME_KEY);
  const newTheme =
    currentTheme === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark;
  setThemeAttribute(THEME_KEY, THEME_MODE_KEY, newTheme, true);
};
