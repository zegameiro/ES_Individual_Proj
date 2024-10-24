import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create(
    persist((set, _get) => (
        {
            first_name: "",
            last_name: "",
            picture_url: "",
            access_token: "",
            isLoggedIn: false,

            login: (first_name, last_name, picture_url, access_token , setCookie) => {
                set({ first_name, last_name, picture_url, access_token, isLoggedIn: true });
                setCookie("access_token", access_token)
            },

            logout: (removeCookie) => {
                set({ first_name: "", last_name: "", picture_url: "", access_token: "", isLoggedIn: false });
                removeCookie("access_token")
            },
        }
    ),
    {
        name: "user-store",
        storage: createJSONStorage(() => localStorage)
    })
)