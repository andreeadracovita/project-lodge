import axios from "axios";

export const server = "https://project-lodge-backend.onrender.com/";
export const apiClient = axios.create(
	{
		baseURL: server	
	}
);