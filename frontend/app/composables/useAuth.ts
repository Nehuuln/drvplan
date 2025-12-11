export const useAuth = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  
  const token = useState<string | null>('auth-token', () => null);
  const user = useState<any>('auth-user', () => null);
  const isAuthenticated = computed(() => !!token.value);

  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        body: { email, password },
      });

      token.value = response.access_token;
      user.value = response.user;

      if (process.client) {
        localStorage.setItem('token', response.access_token);
      }

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
      const response = await $fetch(`${apiBase}/auth/register`, {
        method: 'POST',
        body: { firstName, lastName, email, password, phone },
      });

      token.value = response.access_token;
      user.value = response.user;

      if (process.client) {
        localStorage.setItem('token', response.access_token);
      }

      return { success: true };
    } catch (error: any) {
      console.error('Register error:', error);
      return { 
        success: false, 
        error: error.data?.message || error.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    
    if (process.client) {
      localStorage.removeItem('token');
    }
    
    navigateTo('/login');
  };

  const fetchUser = async () => {
    if (!token.value) return null;

    try {
      const response = await $fetch(`${apiBase}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      user.value = response;
      return response;
    } catch (error) {
      console.error('Fetch user error:', error);
      logout();
      return null;
    }
  };

  const initAuth = async () => {
    if (process.client) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        token.value = storedToken;
        await fetchUser();
      }
    }
  };

  return {
    token: readonly(token),
    user: readonly(user),
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    initAuth,
  };
};