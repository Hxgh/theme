import { THEME_KEY, THEME_MODE_KEY } from './constants';
import type { ThemeType, ThemeConfigs } from './types';

// 初始化主题样式
export const initializeCSS = (
  configs: ThemeConfigs,
  key: string,
  modeKey?: string
) => {
  const target = `${key}-style-element-target`;
  if (document.querySelector(`style[${target}]`)) return; // 避免重复插入
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
  const types = Object.keys(firstConfig).filter((f) => f !== 'name');

  for (const type of types) {
    const cssVariables = configs
      .map((config) => `  ${config.name}: ${config[type]};`)
      .join('\n');
    const base = `:root[${key}='${type}'] {\n${cssVariables}\n}`;
    const media = `@media (prefers-color-scheme: ${type}) {\n  :root[${modeKey}='true'] {\n${cssVariables}\n  }\n}`;
    cssBlocks.push(`${base}\n${modeKey ? media : ''}`);
  }

  return cssBlocks.join('\n');
};

// 设置主题属性
export const setThemeAttribute = (theme: ThemeType, mode: boolean) => {
  document.documentElement.setAttribute(THEME_KEY, theme);
  document.documentElement.setAttribute(THEME_MODE_KEY, JSON.stringify(mode));
};

// 获取主题媒体查询
export const getThemeMedia = (): MediaQueryList | undefined => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }
  return undefined;
};
