import { createContext, useContext, useEffect, useState } from "react";

import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { getUserConfig } from "../api/LodgeDbApiService";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
	const defaultCurrency = "EUR";
	const defaultLanguage = "en-GB";

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState();

	// User details
	const [firstName, setFirstName] = useState();
	const [avatar, setAvatar] = useState();

	// User configs
	const [currency, setCurrency] = useState(defaultCurrency);
	const [language, setLanguage] = useState(defaultLanguage);

	useEffect(() => {
		const tempIsAuthenticated = sessionStorage.getItem("lodgeIsAuthenticated");
		if (tempIsAuthenticated !== null) {
			setIsAuthenticated(tempIsAuthenticated);
			setCurrency(sessionStorage.getItem("lodgeCurrency"));
			setLanguage(sessionStorage.getItem("lodgeLanguage"));
			setAvatar(sessionStorage.getItem("lodgeAvatar"));
			setFirstName(sessionStorage.getItem("lodgeFirstName"));

			setToken(sessionStorage.getItem("lodgeToken"));
			apiClient.interceptors.request.use(
				(config) => {
					config.headers.Authorization = jwtToken;
					return config;
				}
			)
		}
	}, []);

	async function setUserConfig() {
		try {
			const response = await getUserConfig();
			if (response.status === 200) {
				setFirstName(response.data.first_name);
				sessionStorage.setItem("lodgeFirstName", response.data.first_name);

				setAvatar(response.data.img_url);
				sessionStorage.setItem("lodgeAvatar", response.data.img_url);

				setCurrency(response.data.currency);
				sessionStorage.setItem("lodgeCurrency", response.data.currency);

				setLanguage(response.data.language);
				sessionStorage.setItem("lodgeLanguage", response.data.language);
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
				sessionStorage.setItem("lodgeIsAuthenticated", true);

				setToken(jwtToken);
				sessionStorage.setItem("lodgeToken", jwtToken);

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
		setIsAuthenticated(false);
		sessionStorage.removeItem("lodgeIsAuthenticated");

		setToken(null);
		sessionStorage.removeItem("lodgeToken");

		setFirstName(null);
		sessionStorage.removeItem("lodgeFirstName");

		setAvatar(null);
		sessionStorage.removeItem("lodgeAvatar");

		// User config?

	}

	return (
		<AuthContext.Provider value={ { isAuthenticated, login, logout, firstName, token, currency, language, avatar } }>
			{ children }
		</AuthContext.Provider>
	);
}