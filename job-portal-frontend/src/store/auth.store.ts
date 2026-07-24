import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  role: "candidate" | "recruiter" | "admin";
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  
  setToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }
    set({ token });
  },

  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set({ user: null, token: null, error: null });
  },
}));