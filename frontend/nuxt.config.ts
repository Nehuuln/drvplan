export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3001/api'
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
  