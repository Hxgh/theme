import { DEFAULT_THEME_CONFIGS, THEME_KEY, THEME_MODE_KEY } from './constants';
import { initializeCSS, setThemeAttribute } from './tools';
import { ThemeType, type ThemeConfigs } from './types';

export const media = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * 获取当前主题
 */
export const getCurrentTheme = (): ThemeType => {
  const theme = document.documentElement.getAttribute(THEME_KEY) as ThemeType;
  const isFollowingSystem = JSON.parse(
    document.documentElement.getAttribute(THEME_MODE_KEY) || 'false'
  );

  if (isFollowingSystem) {
    return media.matches ? ThemeType.Dark : ThemeType.Light;
  }

  return theme || ThemeType.Light;
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
  let initialTheme = theme;
  if (mode) {
    const prefersDark = media.matches;
    initialTheme = prefersDark ? ThemeType.Dark : ThemeType.Light;
  }

  setThemeAttribute(initialTheme, true);
  initializeCSS(config, THEME_KEY, THEME_MODE_KEY);

  return initialTheme;
}

/**
 * 切换主题（深色/浅色）
 */
export const toggleTheme = (): ThemeType => {
  const currentTheme = getCurrentTheme();
  const newTheme =
    currentTheme === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark;
  setThemeAttribute(newTheme, false);
  return newTheme;
};

/**
 * 切换主题模式（跟随系统/手动设置）
 */
export const toggleThemeMode = (): boolean => {
  const currentThemeMode =
    document.documentElement.getAttribute(THEME_MODE_KEY);
  const isFollowingSystem = JSON.parse(currentThemeMode || 'false');
  const newThemeMode = !isFollowingSystem;

  let newTheme = document.documentElement.getAttribute(THEME_KEY) as ThemeType;
  if (newThemeMode) {
    newTheme = media.matches ? ThemeType.Dark : ThemeType.Light;
  }

  setThemeAttribute(newTheme, newThemeMode);
  return newThemeMode;
};

/**
 * 直接设置特定主题
 */
export const setTheme = (theme: ThemeType, followSystem = false): void => {
  setThemeAttribute(theme, followSystem);
};
