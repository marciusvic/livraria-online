import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { login as apiLogin } from "../services/api";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  logout: (navigate: (path: string) => void) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const id = Cookies.get("id");
    const token = Cookies.get("token");
    const name = Cookies.get("name");
    const email = Cookies.get("email");

    if (token) {
      setUser({ id, token, name, email });
    }
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => {
    try {
      const data = await apiLogin({ email, password });
      console.log("Data:", data);
      console.log("Email And Password:", email, password);
      const { token, user } = data;
      const { id, first_name, last_name } = user;
      const name = `${first_name} ${last_name}`;

      Cookies.set("id", id, { expires: 1 });
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("name", name, { expires: 1 });
      Cookies.set("email", email, { expires: 1 });

      setUser({ token, name, email });
      navigate("/");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Credenciais incorretas. Por favor, tente novamente.");
    }
  };

  const logout = (navigate: (path: string) => void) => {
    Cookies.remove("id");
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("email");

    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
