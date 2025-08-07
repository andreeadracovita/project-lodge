import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiClient } from "/src/api/ApiClient";
import { executeJwtAuthenticationService } from "/src/api/AuthenticationApiService";
import { getUserConfig, getExchangeRateForTarget, updateUser } from "/src/api/BackendApiService";
import { defaultLanguage, siteCurrency } from "/src/utils/constants";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("lodgeIsAuthenticated"));
	const [token, setToken] = useState(sessionStorage.getItem("lodgeToken"));

	// User details
	const [firstName, setFirstName] = useState(sessionStorage.getItem("lodgeFirstName"));
	const [avatar, setAvatar] = useState(sessionStorage.getItem("lodgeAvatar"));
	const [email, setEmail] = useState(sessionStorage.getItem("lodgeEmail"));

	// User configs
	const [currency, setCurrency] = useState(sessionStorage.getItem("lodgeCurrency") ?? siteCurrency);
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
		getExchangeRateForTarget(currency)
			.then(response => {
				if (response.data) {
					setExchangeRate(response.data.rate);
					setExchangeDay((new Date()).toDateString());
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
			console.error(error);
		}
	}

	async function login(email, password) {
		try {
			const response = await executeJwtAuthenticationService(email, password);

			if (response.status === 200) {
				const jwtToken = "Bearer " + response.data.token;

				setIsAuthenticated(true);
				sessionStorage.setItem("lodgeIsAuthenticated", true);

				setEmail(email);
				sessionStorage.setItem("lodgeEmail", email);

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
		navigate("/");
		
		setIsAuthenticated(false);
		sessionStorage.removeItem("lodgeIsAuthenticated");

		setEmail(null);
		sessionStorage.removeItem("lodgeEmail");

		setToken(null);
		sessionStorage.removeItem("lodgeToken");

		setFirstName(null);
		sessionStorage.removeItem("lodgeFirstName");

		setAvatar(null);
		sessionStorage.removeItem("lodgeAvatar");

		setCurrency(siteCurrency);
		sessionStorage.removeItem("lodgeCurrency");

		setLanguage(defaultLanguage);
		sessionStorage.removeItem("lodgeLanguage");
	}

	function setSessionCurrency(value) {
		if (isAuthenticated) {
			updateUser({ currency: value })
				.then(() => {
					setUserConfig();
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			setCurrency(value);
			sessionStorage.setItem("lodgeCurrency", value);
		}
	}

	return (
		<AuthContext.Provider value={{
			isAuthenticated,
			login,
			setUserConfig,
			setSessionCurrency,
			logout,
			email,
			firstName,
			token,
			currency,
			language,
			avatar,
			exchangeRate
		}}>
			{ children }
		</AuthContext.Provider>
	);
}