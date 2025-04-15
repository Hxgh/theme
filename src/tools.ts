import { THEME_KEY, THEME_MODE_KEY } from './constants';
import { ThemeType, type ThemeConfigs, type ThemeOptions } from './types';

// 初始化主题样式
export const initializeCSS = (
  configs: ThemeConfigs,
  key: string,
  modeKey?: string
) => {
  const target = `${key}-style-element-target`;
  if (document.querySelector(`style[${target}]`)) return;
  const css = generateCSS(configs, key, modeKey);
  const styleElement = document.createElement('style');
  styleElement.textContent = css;
  styleElement.setAttribute(target, target);
  document.head.appendChild(styleElement);
};

// 生成主题 CSS 字符串
const generateCSS = (
  configs: ThemeConfigs,
  key: string,
  modeKey?: string
): string => {
  const cssBlocks: string[] = [':root,'];

  const [firstConfig] = configs;
  const themeTypes = Object.keys(firstConfig).filter((f) => f !== 'name');

  for (const themeType of themeTypes) {
    const cssVariables = configs
      .map((config) => `  ${config.name}: ${config[themeType]};`)
      .join('\n');
    const base = `:root[${key}='${themeType}'] {\n${cssVariables}\n}`;
    const media = `@media (prefers-color-scheme: ${themeType}) {\n  :root[${modeKey}='true'] {\n${cssVariables}\n  }\n}`;
    cssBlocks.push(`${base}\n${modeKey ? media : ''}`);
  }

  return cssBlocks.join('\n');
};

// 设置主题属性
export const setThemeAttribute = (
  name: string,
  modeKey: string,
  theme: string,
  mode: boolean
) => {
  document.documentElement.setAttribute(name, mode ? '' : theme);
  document.documentElement.setAttribute(modeKey, JSON.stringify(mode));
};

// 获取主题媒体查询
export const getThemeMedia = (): MediaQueryList | undefined => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }
  return undefined;
};

// 创建默认的主题选项
export const createDefaultThemeOptions = (
  customOptions?: Partial<ThemeOptions>
): ThemeOptions => {
  return {
    name: THEME_KEY,
    modeKey: THEME_MODE_KEY,
    defaultTheme: ThemeType.Light,
    followSystem: true,
    ...(customOptions || {}),
  };
};
