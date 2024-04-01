import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  const initialIsLoggedIn = Cookies.get("isLoggedIn") === "true";

  return {
    isLoggedIn: initialIsLoggedIn,
    setIsLoggedIn: (loggedIn) => {
      set({ isLoggedIn: loggedIn });
      Cookies.set("isLoggedIn", String(loggedIn), { expires: 1 / 24 });
    },
    logout: () => {
      set({ isLoggedIn: false });
      Cookies.remove("isLoggedIn");
    },
  };
});
