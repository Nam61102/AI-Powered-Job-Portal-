import { useAuthStore } from "@/store/auth.store";
import { loginUser, registerUser, getMe } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAuth() {
  const router = useRouter();
  const {
    user,
    token,
    loading,
    error,
    setUser,
    setToken,
    setLoading,
    setError,
    logout,
  } = useAuthStore();

  const handleRegister = useCallback(async (data: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registerUser(data);
      setLoading(false);
      return res;
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = errorObj.response?.data?.message || errorObj.message || "Registration failed";
      setError(msg);
      setLoading(false);
      throw err;
    }
  }, [setError, setLoading]);

  const handleLogin = useCallback(async (data: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser(data);
      setToken(res.token);
      setUser(res.user);
      setLoading(false);
      return res;
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = errorObj.response?.data?.message || errorObj.message || "Login failed";
      setError(msg);
      setLoading(false);
      throw err;
    }
  }, [setToken, setUser, setLoading, setError]);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  const initAuth = useCallback(async () => {
    if (typeof window === "undefined") return;
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setToken(storedToken);
    try {
      const userData = await getMe();
      setUser(userData.user || userData);
    } catch {
      // Token invalid or expired
      logout();
    } finally {
      setLoading(false);
    }
  }, [setToken, setUser, setLoading, logout]);

  return {
    user,
    token,
    loading,
    error,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
    initAuth,
  };
}