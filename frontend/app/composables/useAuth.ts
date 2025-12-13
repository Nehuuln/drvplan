export const useAuth = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  
  const user = useState<any>('auth-user', () => null);
  const isAuthenticated = computed(() => !!user.value);

  const login = async (email: string, password: string) => {
    try {
      const response: any = await $fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        body: { email, password },
        credentials: 'include',
      });

      user.value = response.user;

      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.data?.message || error.message || 'Login failed' 
      };
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string, phone?: string) => {
    try {
      const response: any = await $fetch(`${apiBase}/auth/register`, {
        method: 'POST',
        body: { firstName, lastName, email, password, phone },
        credentials: 'include',
      });

      user.value = response.user;

      return { success: true };
    } catch (error: any) {
      console.error('Register error:', error);
      return { 
        success: false, 
        error: error.data?.message || error.message || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await $fetch(`${apiBase}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      user.value = null;
      navigateTo('/login');
    } catch (error) {
      console.error('Logout error:', error);
      user.value = null;
      navigateTo('/login');
    }
  };

  const fetchUser = async () => {
    try {
      const response: any = await $fetch(`${apiBase}/auth/me`, {
        credentials: 'include',
      });

      user.value = response;
      return response;
    } catch (error) {
      console.error('Fetch user error:', error);
      user.value = null;
      return null;
    }
  };

  const initAuth = async () => {
    if (process.client) {
      await fetchUser();
    }
  };

  return {
    user: readonly(user),
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    initAuth,
  };
};