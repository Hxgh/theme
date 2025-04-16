import { DEFAULT_THEME, DEFAULT_THEME_CONFIGS, THEME_KEY, THEME_MODE_KEY } from './constants';
import { initializeCSS, setThemeAttribute } from './tools';
import { ThemeType, type ThemeConfigs } from './types';

// 获取操作系统的主题
export const useMediaTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)')?.matches
    ? ThemeType.Dark
    : ThemeType.Light;

// 获取主题模式状态
export const getCurrentThemeMode = () =>
  JSON.parse(
    document.documentElement.getAttribute(THEME_MODE_KEY) !== 'false'
      ? 'true'
      : 'false'
  );

/**
 * 获取当前主题
 */
export const getCurrentTheme = (mode?: boolean): ThemeType => {
  return mode ?? getCurrentThemeMode()
    ? useMediaTheme()
    : (document.documentElement.getAttribute(THEME_KEY) as ThemeType) ??
        DEFAULT_THEME;
};

/**
 * 初始化主题
 */
export function initTheme({
  config = DEFAULT_THEME_CONFIGS,
  theme = getCurrentTheme(),
  mode = true,
}: {
  config?: ThemeConfigs;
  theme?: ThemeType;
  mode?: boolean;
}): ThemeType {
  const newTheme = mode ? useMediaTheme() : theme;

  setThemeAttribute(newTheme, mode);
  initializeCSS(config, THEME_KEY, THEME_MODE_KEY);
  return newTheme;
}

/**
 * 切换主题（深色/浅色）
 */
export const toggleTheme = (): ThemeType => {
  const currentTheme = getCurrentTheme();
  const newTheme =
    currentTheme !== ThemeType.Light ? ThemeType.Light : ThemeType.Dark;
  setThemeAttribute(newTheme, false);
  return newTheme;
};

/**
 * 切换主题模式（跟随系统/手动设置）
 */
export const toggleThemeMode = (mode = false): boolean => {
  const newThemeMode = mode ?? !getCurrentThemeMode();

  const newTheme = getCurrentTheme(newThemeMode);

  setThemeAttribute(newTheme, newThemeMode);
  return newThemeMode;
};
