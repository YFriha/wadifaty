import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

// Helper: decode access token into a user object
const decodeToken = (tokens) => {
    try {
        const decoded = jwtDecode(tokens.access);
        // The token payload contains: username, role (added as custom claims)
        // Plus the response body contains a full `user` object — we store that too
        return {
            id: decoded.user_id,
            username: decoded.username,
            role: decoded.role,
            ...(tokens.user || {}), // merge full user data if present
        };
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        const stored = localStorage.getItem('authTokens');
        return stored ? JSON.parse(stored) : null;
    });

    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('authTokens');
        if (!stored) return null;
        const tokens = JSON.parse(stored);
        return decodeToken(tokens);
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('auth/login/', {
                username: e.target.username.value,
                password: e.target.password.value,
            });

            if (response.status === 200) {
                const tokens = response.data;
                setAuthTokens(tokens);
                setUser(decodeToken(tokens));
                localStorage.setItem('authTokens', JSON.stringify(tokens));
                navigate('/dashboard');
            }
        } catch (error) {
            const msg = error.response?.data?.detail || 'Invalid credentials. Please try again.';
            alert(msg);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    };

    const registerUser = async (formData) => {
        // 1. Register
        const response = await axiosInstance.post('auth/register/', formData);
        if (response.status !== 201) throw new Error('Registration failed');

        // 2. Auto-login after register
        const loginResponse = await axiosInstance.post('auth/login/', {
            username: formData.username,
            password: formData.password,
        });

        const tokens = loginResponse.data;
        setAuthTokens(tokens);
        setUser(decodeToken(tokens));
        localStorage.setItem('authTokens', JSON.stringify(tokens));

        navigate('/dashboard');
    };

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
        registerUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
