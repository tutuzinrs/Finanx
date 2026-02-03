import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const [storedUser, storedToken] = await AsyncStorage.multiGet([
          "@finax:user",
          "@finax:token",
        ]);

        if (storedUser[1] && storedToken[1]) {
          api.defaults.headers.common["Authorization"] =
            `Bearer ${storedToken[1]}`;
          setUser(JSON.parse(storedUser[1]));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do storage:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", { email, password });

      const { user: userData, token } = response.data;

      await AsyncStorage.multiSet([
        ["@finax:user", JSON.stringify(userData)],
        ["@finax:token", token],
      ]);

      setUser(userData);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error: any) {
      const message = error.response?.data?.error || "Erro ao fazer login";
      throw new Error(message);
    }
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Após registrar, fazer login automaticamente
      await signIn(email, password);
    } catch (error: any) {
      const message = error.response?.data?.error || "Erro ao criar conta";
      throw new Error(message);
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.multiRemove(["@finax:user", "@finax:token"]);
      api.defaults.headers.common["Authorization"] = "";
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  function updateUser(userData: User) {
    setUser(userData);
    AsyncStorage.setItem("@finax:user", JSON.stringify(userData));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
