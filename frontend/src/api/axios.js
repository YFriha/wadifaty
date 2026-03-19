import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(async (req) => {
    const stored = localStorage.getItem('authTokens');
    if (!stored) return req;

    let tokens = JSON.parse(stored);
    req.headers.Authorization = `Bearer ${tokens.access}`;

    // Check if access token is expired
    const decoded = jwtDecode(tokens.access);
    const isExpired = decoded.exp < Date.now() / 1000;

    if (isExpired) {
        try {
            const response = await axios.post(`${baseURL}auth/token/refresh/`, {
                refresh: tokens.refresh,
            });
            tokens.access = response.data.access;
            localStorage.setItem('authTokens', JSON.stringify(tokens));
            req.headers.Authorization = `Bearer ${response.data.access}`;
        } catch {
            localStorage.removeItem('authTokens');
            window.location.href = '/login';
        }
    }

    return req;
});

export default axiosInstance;
