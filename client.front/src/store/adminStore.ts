// stores/adminStore.ts
import axios from "axios";
import { create } from "zustand";

interface AdminState {
  authenticated: boolean;
  loading: boolean;
  isLoggedIn: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  authenticated: false,
  loading: true,

  isLoggedIn: async () => {
    try {
      const res = await axios.get("/api/auth/check", {
       withCredentials: true
      });

      if (res.status !== 200) {
        return set({ authenticated: false, loading: false });
      }

      set({
        authenticated: res.data.authenticated,
        loading: false,
      });
    } catch (err) {
      set({ authenticated: false, loading: false });
    }
  },
}));
