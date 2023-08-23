import { createContext, useContext } from "react"

import { AuthData, AuthContextType, AuthProviderProps } from "../interfaces/authInterfaces";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initalValue: AuthData = {
    username: '',
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children
}) => {
    const [user, setUser] = useLocalStorage<AuthData>('user', initalValue);

    const login = (authData: AuthData) => setUser(authData);

    const logout = () => setUser(initalValue);

    const isAuthenticated = !!user.username;

    const contextValue: AuthContextType = {
        user,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = (): AuthContextType => {
    const authState = useContext(AuthContext);

    if (!authState) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }

    return authState;
}