export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth();

  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.includes(to.path);

  if (!isAuthenticated.value && !isPublicRoute) {
    return navigateTo('/login');
  }

  if (isAuthenticated.value && isPublicRoute) {
    return navigateTo('/dashboard');
  }

  if (isAuthenticated.value && to.path === '/') {
    return navigateTo('/dashboard');
  }
});