export interface ThemeConfig {
  name: string;
  dark: string;
  light: string;
  [key: string]: string;
}

export type ThemeConfigs = Array<ThemeConfig>;

export enum ThemeType {
  Dark = 'dark',
  Light = 'light',
}
