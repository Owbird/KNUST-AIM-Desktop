import { IsAuthed, RemoveUser } from "@go/auth/AuthFunctions";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  pinInput: string | null;
  getToken: () => string | null;
  verifyPin: (pin: string) => boolean;
  login: (token: string) => void;
  logout: () => void;
  getPin: () => string | null;
  setPin: (pin: string) => void;
  setPinInput: (pin: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pinInput, setPinInput] = useState<string | null>(null);

  useEffect(() => {
    IsAuthed().then(setIsAuthenticated);

    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);

    setIsAuthenticated(true);
  };

  const logout = () => {
    RemoveUser();
    localStorage.removeItem("token");
    localStorage.removeItem("pin");
    setIsAuthenticated(false);
  };

  const setPin = (pin: string) => {
    //TODO: Encrypt pin
    localStorage.setItem("pin", pin);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading,
        setPin,
        pinInput,
        setPinInput,
        verifyPin: (pin: string) => localStorage.getItem("pin") === pin,
        getPin: () => localStorage.getItem("pin"),
        getToken: () => localStorage.getItem("token"),
      }}
    >
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
