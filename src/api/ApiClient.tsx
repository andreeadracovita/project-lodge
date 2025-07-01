import axios from "axios";

export const server = "http://localhost:3000";
export const apiClient = axios.create(
	{
		baseURL: server	
	}
);