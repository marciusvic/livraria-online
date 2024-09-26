import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:8000";

const axiosInstance = axios.create({
	baseURL: baseURL,
});

axiosInstance.interceptors.request.use((config) => {
	const token = Cookies.get("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosInstance;