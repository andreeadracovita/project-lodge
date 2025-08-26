import { apiClient } from "./ApiClient";

export const checkUserExists
	= (payload) => apiClient.post("/auth/exists", payload);

export const executeJwtAuthenticationService
	= (email, password) => apiClient.post("/auth/login", { email, password });

export const createAccount
	= (payload) => apiClient.post("/auth/signup", payload);