import { resolve } from 'node:path';
import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';

// Docs: https://rsbuild.rs/config/

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift('babel-plugin-react-compiler');
      },
    }),
    pluginSvgr(),
  ],
  source: {
    define: {
      ...publicVars,
    },
    include: isDev ? [] : [/node_modules/], // 兼容android 6.x
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  output: {
    overrideBrowserslist: [
      'iOS >= 10',
      'Android >= 4.4',
      'not IE 11',
      'chrome 48',
    ],
    cssModules: {
      localIdentName: '[local]-[hash:base64:8]',
    },
    dataUriLimit: {
      image: 5 * 1024,
      svg: 10 * 1024, // 10K 以上不内联svg资源：
    },
    // polyfill: 'usage',
    legalComments: 'none',
    sourceMap: {
      js: isDev ? 'cheap-module-source-map' : false,
      css: isDev,
    },
    filename: isDev
      ? {}
      : {
          js: '[name]_script.[contenthash:8].js',
        },
  },
  html: {
    template: './index.html',
  },
  performance: {
    removeConsole:
      process.env.REACT_APP_MODE === 'production' ? ['log', 'warn'] : [],
    chunkSplit: {
      strategy: 'split-by-experience',
      forceSplitting: {
        baseui: /node_modules[\\/]@base-ui[\\/]react/,
      },
    },
  },
  tools: {
    rspack: (config: any, { env }) => {
      if (env === 'development') {
        config.optimization.providedExports = false;
      }
      config.optimization.usedExports = false;
      if (process.env.RSDOCTOR) {
        config.plugins.push(new RsdoctorRspackPlugin({}));
      }
      return config;
    },
  },
  server: {
    port: 9876,
  },
});
