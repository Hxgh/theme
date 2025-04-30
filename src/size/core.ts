import { DEFAULT_SIZE, DEFAULT_SIZE_CONFIGS, SIZE_KEY } from './constants';
import { initializeCSS } from '../tools';
import type { SizeConfigs, SizeType } from './types';
import type { ThemeConfigs } from '../types';

/**
 * 获取当前大小
 */
export const getCurrentSize = (): SizeType => {
  return (
    (document.documentElement.getAttribute(SIZE_KEY) as SizeType) ??
    DEFAULT_SIZE
  );
};

/**
 * 初始化主题
 */
export function initSize({
  configs = DEFAULT_SIZE_CONFIGS,
}: {
  configs?: SizeConfigs;
}) {
  initializeCSS(configs as unknown as ThemeConfigs, SIZE_KEY);
}

/**
 * 切换大小
 */
export const toggleSize = (newSize: SizeType): void => {
  document.documentElement.setAttribute(SIZE_KEY, newSize);
};
