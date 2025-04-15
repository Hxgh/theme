import { THEME_DEFAULT_CONFIG } from './constants';
import { initializeCSS, setThemeAttribute } from './tools';
import type { Configs } from './type';

export const squared = (n: number): number => n * n;


const name = 'theme';
const MODE_KEY = 'theme-follow-OS';
export const media = window.matchMedia('(prefers-color-scheme: dark)');

// 主题类型枚举
export enum ThemeType {
  dark = 'dark',
  light = 'light',
}

export default function initTheme(config: Configs = THEME_DEFAULT_CONFIG) {
  setThemeAttribute(name, MODE_KEY, ThemeType.dark, true);
  initializeCSS(config, name, MODE_KEY);
}

export const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute(name);
  const newTheme =
    currentTheme === ThemeType.dark ? ThemeType.light : ThemeType.dark;
  setThemeAttribute(name, MODE_KEY, newTheme, true);
};
