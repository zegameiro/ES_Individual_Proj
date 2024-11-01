import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create(
	persist((set, _get) => (
		{
			user_name: "",
			picture_url: "",
			isLoggedIn: false,

			login: (user_name, picture_url) => {
				set({ user_name: user_name, picture_url: picture_url, isLoggedIn: true });
			},

			logout: () => {
				set({ first_name: "", last_name: "", picture_url: "", isLoggedIn: false });
			},
		}
	),
	{
		name: "user-store",
		storage: createJSONStorage(() => localStorage)
	})
)