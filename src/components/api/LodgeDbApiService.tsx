import { apiClient } from "./ApiClient";

// User
export const getUserConfig
	= () => apiClient.get(`/user/config`);

// Property