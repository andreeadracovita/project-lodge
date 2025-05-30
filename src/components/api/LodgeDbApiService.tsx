import { apiClient } from "./ApiClient";

// User
export const createAccountApi
	= (payload) => apiClient.post("/auth/signup", payload);

export const getUserConfig
	= () => apiClient.get("/user/config");

// Property