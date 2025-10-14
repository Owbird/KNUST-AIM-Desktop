import { IsAuthed, RemoveUser } from "@go/auth/AuthFunctions";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean ;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    IsAuthed().then(setIsAuthenticated);

    setIsLoading(false);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
      RemoveUser(token);
    }

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
