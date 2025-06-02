import { apiClient } from "/src/api/ApiClient";

export const checkUserExists
	= (email) => apiClient.get(`/auth/exists/${ email }`);

export const executeJwtAuthenticationService
	= (email, password) => apiClient.post("/auth/login", { email, password });

export const createAccount
	= (payload) => apiClient.post("/auth/signup", payload);