import type { Configs } from './type';

// 初始化主题样式
export const initializeCSS = (
  configs: Configs,
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
  configs: Configs,
  key: string,
  modeKey?: string
): string => {
  const cssBlocks: string[] = [':root,'];
  Object.keys(configs[0])
    .filter((f) => f !== 'name')
    .forEach((t) => {
      const cssVariables = configs
        .map((c: GenericObject) => `  ${c.name}: ${c[t]};`)
        .join('\n');
      const base = `:root[${key}='${t}'] {\n${cssVariables}\n}`;
      const media = `@media (prefers-color-scheme: ${t}) {\n  :root[${modeKey}='true'] {\n${cssVariables}\n  }\n}`;
      cssBlocks.push(`${base}\n${modeKey ? media : ''}`);
    });
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
