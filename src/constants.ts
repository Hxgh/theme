import type { Configs } from './type';

export const THEME_DEFAULT_CONFIG: Configs = [
  { name: '--theme-color-primary', dark: '#1677FF', light: '#1677FF' },
  { name: '--theme-color-error', dark: '#ff4d4f', light: '#ff4d4f' },

  // 背景
  { name: '--theme-bg-base', dark: '#070707', light: '#ffffff' },
  { name: '--theme-bg-second', dark: '#161616', light: '#f5f5f5' },
  { name: '--theme-bg-third', dark: '#222222', light: '#f5f5f5' },
  // 文字 icon
  { name: '--theme-color-base', dark: '#ffffff', light: '#000000' },
  // 分割
  { name: '--theme-border-base', dark: '#313131', light: '#f0f0f0' },
  {
    name: '--theme-box-shadow-base',
    dark: '0 1px 2px 0 rgba(255, 255, 255, 0.03),0 1px 6px -1px rgba(2552, 2552, 2552, 0.02),0 2px 4px 0 rgba(255, 255, 255, 0.02)',
    light:
      '0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)',
  },
];
