import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiClient } from "api/ApiClient";
import { executeJwtAuthenticationService } from "api/AuthenticationApiService";
import { getUserConfig, getExchangeRateForTarget, updateUser } from "api/BackendApiService";
import { defaultLanguage, siteCurrency } from "utils/constants";

type AuthProviderProps = {
	children: any
};

type AuthContextType = {
	isAuthenticated: boolean,
	login: any,
	setUserConfig: any,
	setSessionCurrency: any,
	logout: any,
	email: any,
	firstName: any,
	token: any,
	currency: any,
	language: any,
	avatar: any,
	exchangeRate: any
};

export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: AuthProviderProps) {
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(sessionStorage.getItem("lodgeIsAuthenticated") === "true");
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

	async function setUserConfig(): Promise<void> {
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
					setLanguage(language);
					sessionStorage.setItem("lodgeLanguage", language);
				}
			}
		} catch (error) { 
			console.error(error);
		}
	}

	async function login(email: string, password: string): Promise<boolean> {
		try {
			const response = await executeJwtAuthenticationService(email, password);

			if (response.status === 200) {
				const jwtToken = "Bearer " + response.data.token;

				apiClient.interceptors.request.use(
					config => {
						config.headers.authorization = jwtToken;
						return config;
					},
					error => {
						return Promise.reject(error);
					}
				);

				setIsAuthenticated(true);
				sessionStorage.setItem("lodgeIsAuthenticated", "true");

				setEmail(email);
				sessionStorage.setItem("lodgeEmail", email);

				setToken(jwtToken);
				sessionStorage.setItem("lodgeToken", jwtToken);

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

	function setSessionCurrency(value: string, forceRefresh: boolean) {
		if (isAuthenticated) {
			updateUser({ currency: value })
				.then(async () => {
					await setUserConfig();
					if (forceRefresh) {
						window.location.reload();
					}
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