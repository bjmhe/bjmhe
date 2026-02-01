import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin';
import { appTools, defineConfig } from '@modern-js/app-tools';
import { polyfillPlugin } from '@modern-js/plugin-polyfill';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  plugins: [
    appTools({
      bundler: 'rspack',
    }),
    tailwindcssPlugin(),
    polyfillPlugin(),
  ],
  builderPlugins: [pluginImageCompress()],
  tools: {
    rspack: {
      plugins: [new SemiRspackPlugin({})],
    },
  },
});
