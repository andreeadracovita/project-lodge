import { apiClient } from "./ApiClient";

export const executeJwtAuthenticationService
	= (email, password) => apiClient.post("/user/login", { email, password });

export const checkUserExists
	= (email) => apiClient.get(`http://localhost:3000/user/exists/${ email }`);