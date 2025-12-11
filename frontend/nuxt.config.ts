export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000/api'
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
  