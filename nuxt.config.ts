// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    typescript: {
        shim: false
      },
    build: {
      //   extractCSS: false,
        transpile: ["vuetify"],
      },
    modules: [
      '@pinia/nuxt',
      'nuxt-gtag',
    ],
    gtag: {
      id: 'G-XXXXXXXXXX',
      config: {
        page_title: 'My Custom Page Title'
      }
    },
    vite: {
      define: {
        "process.env.DEBUG": false,
      },
    },
    nitro: {
      serveStatic: true,
    },
    devServerHandlers: [],
    hooks: {
    },
    runtimeConfig: {
      public: {
        apiBase: process.env.VUE_APP_URL_BACKEND || "http://localhost:3000/api/",
      }
    },
  
  })


  