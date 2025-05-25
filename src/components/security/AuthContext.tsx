import { createContext, useContext, useState } from "react";

import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [username, setUsername] = useState();
	const [token, setToken] = useState();

	async function login(email, password) {
		try {
			const response = await executeJwtAuthenticationService(email, password);

			if (response.status === 200) {
				const jwtToken = "Bearer " + response.data.token;

				setIsAuthenticated(true);
				setUsername(email);
				setToken(jwtToken);

				apiClient.interceptors.request.use(
					(config) => {
						config.headers.Authorization = jwtToken;
						return config;
					}
				)
				return true;
			} else {
				console.log("Login failure");
				return false;
			}
		} catch (error) {
			return false;
		}
	}

	function logout() {
		setAuthenticated(false);
		setUsername(null);
		setToken(null);
	}

	return (
		<AuthContext.Provider value={ { isAuthenticated, login, logout, username, token } }>
			{ children }
		</AuthContext.Provider>
	);
}