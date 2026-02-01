import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin';
import { appTools, defineConfig } from '@modern-js/app-tools';
import { polyfillPlugin } from '@modern-js/plugin-polyfill';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';

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
    rspack(config, { appendPlugins }) {
      appendPlugins(new SemiRspackPlugin({}));
      // 仅在 RSDOCTOR 为 true 时注册插件，因为插件会增加构建耗时
      if (process.env.RSDOCTOR) {
        appendPlugins(
          new RsdoctorRspackPlugin({
            // 插件选项
          }),
        );
      }
    },
  },
});
