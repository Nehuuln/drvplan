export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      const token = process.client ? localStorage.getItem('token') : null;
      
      if (token) {
        const headers = options.headers || {};
        (headers as any)['Authorization'] = `Bearer ${token}`;
        options.headers = headers;
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        if (process.client) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        navigateTo('/login');
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});