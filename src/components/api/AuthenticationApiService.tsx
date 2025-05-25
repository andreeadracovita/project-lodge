import { apiClient } from "./ApiClient";

export const executeJwtAuthenticationService
	= (email, password) => apiClient.post("/user/login", { email, password });