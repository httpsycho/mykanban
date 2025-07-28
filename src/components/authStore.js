import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,

  login: (username, password) => {
    if (username === 'admin' && password === '1234') {
      const userData = { username: 'admin' };
      localStorage.setItem('user', JSON.stringify(userData));
      set({ user: userData });
      return true;
    } else return false;
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },

  checkAuth: () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      set({ user: JSON.parse(savedUser) });
    }
  },
}));
