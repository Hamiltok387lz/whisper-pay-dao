import { create } from 'zustand';

type UserRole = 'admin' | 'user' | null;

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    // Mock login logic
    const isAdmin = email.includes('admin');
    set({
      user: {
        id: '1',
        name: isAdmin ? 'Admin User' : 'Regular User',
        email,
        role: isAdmin ? 'admin' : 'user'
      }
    });
  },
  logout: () => set({ user: null }),
  setRole: (role: UserRole) => set((state) => ({
    user: state.user ? { ...state.user, role } : null
  }))
}));