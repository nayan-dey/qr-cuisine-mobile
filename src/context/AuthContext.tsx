import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  user: null,
  login: (arg) => {},
  logout: () => {},
  isAuthenticated: false,
  isLoading: false,
  userData: [],
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially true to account for initial check
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true); // Start loading
      const storedUser = await AsyncStorage.getItem("@auth");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      // Stop loading after check
    };
    checkAuthStatus();
  }, []);

  const login = async (obj) => {
    setIsLoading(true); // Start loading
    const { user_id } = obj;
    if (user_id) {
      setUserData(obj);
      setUser(JSON.stringify(obj));
      await AsyncStorage.setItem("@auth", JSON.stringify(obj));
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Stop loading after login
  };

  const logout = async () => {
    setIsLoading(true); // Start loading
    setUser(null);
    await AsyncStorage.removeItem("@auth");
    setIsAuthenticated(false);
    setIsLoading(false); // Stop loading after logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isLoading,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
