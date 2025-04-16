import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2023',
      dts: true,
    },
  ],
  output: {
    copy: [{ from: './public' }, { from: 'README.md' }],
  },
});
