import { ReactNode } from "react"

export interface AuthData {
    username: string;
}

export interface AuthContextType {
    user: AuthData,
    username: string,
    isAuthenticated: boolean;
    login: (authData: AuthData) => void;
    logout: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}