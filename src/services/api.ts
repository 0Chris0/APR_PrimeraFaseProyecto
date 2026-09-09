import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_PREFIX = import.meta.env.VITE_API_PREFIX || '';
const LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT || '/api/auth/login';
const REGISTER_ENDPOINT = import.meta.env.VITE_REGISTER_ENDPOINT || '/api/auth/register';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const REMEMBER_SESSION_KEY = 'remember_session';
const REMEMBERED_EMAIL_KEY = 'remembered_email';
const REMEMBERED_PASSWORD_KEY = 'remembered_password';

export const api = axios.create({
  baseURL: `${API_BASE_URL}${API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  nombre: string;
  apellido?: string;
  carnet?: string;
  email: string;
  password: string;
  telefono?: string;
}

const extractToken = (authResponse: any) => {
  return authResponse?.token || authResponse?.accessToken || '';
};

const extractUser = (authResponse: any) => {
  if (!authResponse) {
    return null;
  }

  if (authResponse.user && typeof authResponse.user === 'object') {
    return authResponse.user;
  }

  return authResponse;
};

export const rememberCredentials = (email: string, password: string) => {
  localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
  localStorage.setItem(REMEMBERED_PASSWORD_KEY, password);
};

export const clearRememberedCredentials = () => {
  localStorage.removeItem(REMEMBERED_EMAIL_KEY);
  localStorage.removeItem(REMEMBERED_PASSWORD_KEY);
};

export const loadRememberedCredentials = () => {
  return {
    email: localStorage.getItem(REMEMBERED_EMAIL_KEY) || '',
    password: localStorage.getItem(REMEMBERED_PASSWORD_KEY) || '',
  };
};

export const storeAuthSession = (authResponse: any, rememberSession = true) => {
  const token = extractToken(authResponse);
  const user = extractUser(authResponse);

  if (rememberSession) {
    localStorage.setItem(REMEMBER_SESSION_KEY, 'true');
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }

    if (user && typeof user === 'object') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  } else {
    localStorage.removeItem(REMEMBER_SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
    }

    if (user && typeof user === 'object') {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }
};

export const getStoredSessionUser = () => {
  const localUser = localStorage.getItem(USER_KEY);
  const sessionUser = sessionStorage.getItem(USER_KEY);

  try {
    if (localUser) {
      return JSON.parse(localUser);
    }

    if (sessionUser) {
      return JSON.parse(sessionUser);
    }
  } catch {
    return null;
  }

  return null;
};

export const getStoredSessionToken = () => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

export const loginService = async (credentials: LoginCredentials, rememberSession = true) => {
  try {
    const response = await api.post(LOGIN_ENDPOINT, credentials);
    storeAuthSession(response.data, rememberSession);

    if (rememberSession) {
      rememberCredentials(credentials.email, credentials.password);
    } else {
      clearRememberedCredentials();
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerService = async (credentials: RegisterCredentials) => {
  try {
    const response = await api.post(REGISTER_ENDPOINT, credentials);
    storeAuthSession(response.data, false);
    clearRememberedCredentials();

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOffersService = async () => {
  try {
    const response = await api.get('/ofertas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutService = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
};