import {
  DEFAULT_THEME,
  DEFAULT_THEME_CONFIGS,
  THEME_KEY,
  THEME_MODE_KEY,
} from './constants';
import { initializeCSS, setThemeAttribute } from './tools';
import { ThemeType, type ThemeConfigs } from './types';

export const media = window.matchMedia('(prefers-color-scheme: dark)');

// 获取操作系统的主题
export const useMediaTheme = () =>
  media?.matches ? ThemeType.Dark : ThemeType.Light;

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
  subscribeThemeChange,
  config = DEFAULT_THEME_CONFIGS,
  theme = getCurrentTheme(),
  mode = getCurrentThemeMode(),
}: {
  config?: ThemeConfigs; // 仅主应用使用
  theme?: ThemeType; // 仅主应用使用
  mode?: boolean; // 仅主应用使用
  subscribeThemeChange?: (e: { theme: ThemeType; mode: boolean }) => void; // 仅主应用使用
}): ThemeType {
  const newTheme = mode ? useMediaTheme() : theme;

  setThemeAttribute(newTheme, mode);
  initializeCSS(config, THEME_KEY, THEME_MODE_KEY);
  subscribeThemeChange && initMediaThemeChange(subscribeThemeChange);
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
export const toggleThemeMode = (mode?: boolean): boolean => {
  const newThemeMode = mode ?? !getCurrentThemeMode();

  const newTheme = getCurrentTheme(newThemeMode);

  setThemeAttribute(newTheme, newThemeMode);
  return newThemeMode;
};

/**
 * 订阅操作系统主题变化
 */
let mediaChangeListener: ((e: MediaQueryListEvent) => void) | null = null;
export const initMediaThemeChange = (
  subscribeThemeChange: (e: { theme: ThemeType; mode: boolean }) => void
) => {
  // 清理之前的监听器（如果存在）
  if (mediaChangeListener) {
    media.removeEventListener('change', mediaChangeListener);
  }

  // 创建并保存监听器引用
  mediaChangeListener = () => {
    const mode = getCurrentThemeMode();
    const newTheme = getCurrentTheme();
    setThemeAttribute(newTheme, mode);
    subscribeThemeChange({
      theme: newTheme,
      mode,
    });
  };

  // 添加监听器
  media.addEventListener('change', mediaChangeListener);
};
