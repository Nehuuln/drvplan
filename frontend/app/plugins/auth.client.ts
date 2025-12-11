export default defineNuxtPlugin(() => {
  const { initAuth } = useAuth();
  
  if (process.client) {
    initAuth();
  }
});