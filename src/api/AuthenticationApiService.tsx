import { apiClient } from "./ApiClient";

export const checkUserExists
	= (payload: any) => apiClient.post("/auth/exists", payload);

export const executeJwtAuthenticationService
	= (email: string, password: string) => apiClient.post("/auth/login", { email, password });

export const createAccount
	= (payload: any) => apiClient.post("/auth/signup", payload);