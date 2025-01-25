import {create} from "zustand";

const useAuthStore = create((set) => ({
    isAuthenticated: !!localStorage.getItem("authToken"), // Initialize state based on localStorage
    login: (token) => {
        localStorage.setItem("authToken", token); // Store token in localStorage
        set({ isAuthenticated: true }); // Update state
    },
    logout: () => {
        localStorage.removeItem("authToken"); // Remove token from localStorage
        set({ isAuthenticated: false }); // Update state
    },
    checkAuth: () => {
        const token = localStorage.getItem("authToken");
        set({ isAuthenticated: !!token }); // Update state based on token presence
    },
}));

export default useAuthStore;
