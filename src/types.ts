export interface ThemeConfig {
  name: string;
  dark: string;
  light: string;
  [key: string]: string; // 支持自定义主题类型
}

export type ThemeConfigs = Array<ThemeConfig>;

export enum ThemeType {
  Dark = 'dark',
  Light = 'light',
}

export interface ThemeOptions {
  name?: string;
  modeKey?: string;
  defaultTheme?: ThemeType;
  followSystem?: boolean;
}
