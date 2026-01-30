import React, { createContext, useContext, ReactNode } from 'react';

interface AuthContextData {
    signed: boolean;
    user: { name: string; email: string } | null;
    signIn: () => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Bypassing auth: always signed in
    const signed = true;
    const user = { name: 'Usuário Teste', email: 'teste@teste.com' };

    async function signIn() {
        console.log('SignIn bypassed');
    }

    function signOut() {
        console.log('SignOut bypassed');
    }

    return (
        <AuthContext.Provider value={{ signed, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
