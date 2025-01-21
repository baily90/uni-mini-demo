import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { fileURLToPath } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import UniKuRoot from '@uni-ku/root'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const UnoCss = await import('unocss/vite').then((i) => i.default)

  return {
    envDir: './env',
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or "modern"
          silenceDeprecations: ['legacy-js-api']
        }
      }
    },
    plugins: [
      UniKuRoot({
        rootFileName: 'Root'
      }),
      uni(),
      UnoCss(),
      AutoImport({
        imports: ['vue', 'pinia', 'uni-app'],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json'
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
