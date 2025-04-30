import { ThemeType, type ThemeConfigs } from './types';

export const DEFAULT_THEME_CONFIGS: ThemeConfigs = [
  //基本
  { name: '--theme-color-primary', dark: '#4371F8', light: '#2A51F7' },
  { name: '--theme-color-warn', dark: '#FF9626', light: '#FF7D00' },
  { name: '--theme-color-error', dark: '#F76965', light: '#F53F3F' },
  // 背景
  { name: '--theme-bg-base', dark: '#202020', light: '#FFFFFF' },
  { name: '--theme-bg-second', dark: '#29292B', light: '#F0F1F3' },
  { name: '--theme-bg-third', dark: '#2F2F2F', light: '#E1E2E8' },
  // 文字
  { name: '--theme-color-base', dark: '#FFFFFF', light: '#1D2129' },
  // 分割
  { name: '--theme-border-base', dark: '#313131', light: '#F0F0F0' },
  {
    name: '--theme-box-shadow-base',
    dark: '0 1px 2px 0 rgba(255, 255, 255, 0.03),0 1px 6px -1px rgba(2552, 2552, 2552, 0.02),0 2px 4px 0 rgba(255, 255, 255, 0.02)',
    light:
      '0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)',
  },
];

export const THEME_KEY = 'theme';
export const THEME_MODE_KEY = 'theme-follow-OS';
export const DEFAULT_THEME = ThemeType.Light;
