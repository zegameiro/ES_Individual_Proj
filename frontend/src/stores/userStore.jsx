import { create } from "zustand";

export const useUserStore = create((set) => ({
    first_name: "",
    last_name: "",
    picture_url: "",
    access_token: "",
    isLoggedIn: false,

    login: (first_name, last_name, picture_url, access_token) => {
        set({ first_name, last_name, picture_url, access_token, isLoggedIn: true });
    },

    logout: () => {
        set({ first_name: "", last_name: "", picture_url: "", access_token: "", isLoggedIn: false });
    },

    setFirstName: (first_name) => {
        set({ first_name })
    },

    setLastName: (last_name) => {
        set({ last_name })
    },

    setPictureUrl: (picture_url) => {
        set({ picture_url })
    },

    setAccessToken: (access_token) => {
        set({ access_token })
    },

    setIsLoggedIn: (isLoggedIn) => {
        set({ isLoggedIn })
    }
}))