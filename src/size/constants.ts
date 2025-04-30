import { type SizeConfigs, SizeType } from './types';

export const DEFAULT_SIZE_CONFIGS: SizeConfigs = [
  { name: '--size-font-max', middle: '16px', small: '14px' },
  { name: '--size-font-base', middle: '14px', small: '12px' },
  { name: '--size-font-second', middle: '12px', small: '10px' },
  { name: '--size-gap-base', middle: '8px', small: '4px' },
  { name: '--size-border-radius-base', middle: '8px', small: '4px' },
  { name: '--size-border-radius-second', middle: '4px', small: '2px' },
];

export const SIZE_KEY = 'size';
export const DEFAULT_SIZE = SizeType.Middle;
