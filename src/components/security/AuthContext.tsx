import { createContext, useContext, useEffect, useState } from "react";

import { apiClient } from "/src/api/ApiClient";
import { executeJwtAuthenticationService } from "/src/api/AuthenticationApiService";
import { getUserConfig, getExchangeRateForTarget } from "/src/api/BackendApiService";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
	const defaultCurrency = "CHF";
	const defaultLanguage = "en-GB";

	const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("lodgeIsAuthenticated"));
	const [token, setToken] = useState(sessionStorage.getItem("lodgeToken"));

	// User details
	const [firstName, setFirstName] = useState(sessionStorage.getItem("lodgeFirstName"));
	const [avatar, setAvatar] = useState(sessionStorage.getItem("lodgeAvatar"));

	// User configs
	const [currency, setCurrency] = useState(sessionStorage.getItem("lodgeCurrency") ?? defaultCurrency);
	const [language, setLanguage] = useState(sessionStorage.getItem("lodgeLanguage") ?? defaultLanguage);

	// Exchange rate
	const [exchangeRate, setExchangeRate] = useState(0.5);
	const [exchangeDay, setExchangeDay] = useState((new Date()).toDateString());

	if (isAuthenticated !== null) {
		apiClient.interceptors.request.use(
			(config) => {
				config.headers.Authorization = token;
				return config;
			}
		)
	}

	useEffect(() => {
		console.log("Refresh exchange rate because the day has changed...");
		getExchangeRateForTarget(currency)
			.then(response => {
				if (response.data) {
					setExchangeRate(response.data.rate);
					setExchangeDay((new Date()).toDateString());
					console.log("Day exchange rate:", response.data.rate);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, [(new Date().toDateString() !== exchangeDay)]);

	async function setUserConfig() {
		try {
			const response = await getUserConfig();
			if (response.status === 200) {
				const { first_name, img_url, currency, language } = response.data;

				setFirstName(first_name);
				sessionStorage.setItem("lodgeFirstName", first_name);

				if (img_url !== null) {
					setAvatar(img_url);
					sessionStorage.setItem("lodgeAvatar", img_url);
				}

				if (currency !== null) {
					setCurrency(currency);
					sessionStorage.setItem("lodgeCurrency", currency);
				}

				if (language !== null) {
					setLanguage();
					sessionStorage.setItem("lodgeLanguage", language);
				}
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

		navigate("/");
		// window.location.reload(true);
	}

	return (
		<AuthContext.Provider value={ { isAuthenticated, login, logout, firstName, token, currency, language, avatar, exchangeRate } }>
			{ children }
		</AuthContext.Provider>
	);
}