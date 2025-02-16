import { create } from "zustand";
import { fetchUserProfile } from "../api/userApi";

interface UserState {
  user: any;
  fetchUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  fetchUser: async () => {
    const userData = await fetchUserProfile();
    set({ user: userData });
  },
}));
