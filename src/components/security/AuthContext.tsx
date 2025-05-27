import { createContext, useContext, useState } from "react";

import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { getUserConfig } from "../api/LodgeDbApiService";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currency, setCurrency] = useState("EUR");
	const [language, setLanguage] = useState("en-GB");
	const [username, setUsername] = useState();
	const [token, setToken] = useState();
	const [avatar, setAvatar] = useState();

	async function setUserConfig() {
		try {
			const response = await getUserConfig();
			if (response.status === 200) {
				setCurrency(response.data.currency);
				setAvatar(response.data.img_url);
				setLanguage(response.data.language);
			}
		} catch (error) { 
			console.log(error)
		}
	}

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
				await setUserConfig();
				return true;
			} else {
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
		<AuthContext.Provider value={ { isAuthenticated, login, logout, username, token, currency, language, avatar } }>
			{ children }
		</AuthContext.Provider>
	);
}