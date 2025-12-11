export default defineNuxtPlugin(() => {
  const { token } = useAuth();
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`,
        };
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        const { logout } = useAuth();
        logout();
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});