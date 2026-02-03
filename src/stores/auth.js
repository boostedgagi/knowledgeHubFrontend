import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem("token") || null,
        user: null
    }),

    getters: {
        isLogged: (state) => !!state.token,

        role: (state) => {
            if (!state.token) return null;

            const payload = JSON.parse(atob(state.token.split(".")[1]));
            return payload.role || null;
        }
    },

    actions: {
        login(token) {
            this.token = token;
            localStorage.setItem("token", token);
        },

        //Made this too, could be useful later
        logout() {
            this.token = null;
            localStorage.removeItem("token");
        }
    }
});
