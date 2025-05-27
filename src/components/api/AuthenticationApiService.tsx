import { apiClient } from "./ApiClient";

export const executeJwtAuthenticationService
	= (email, password) => apiClient.post("/auth/login", { email, password });

export const checkUserExists
	= (email) => apiClient.get(`/auth/exists/${ email }`);