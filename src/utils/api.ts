import axios from "axios";

const baseUrl =
	process.env.NODE_ENV === "development" ? "https://jsonplaceholder.typicode.com" : "";

export const api = axios.create({baseURL: baseUrl, headers: {"Content-Type": "application/json"}});
