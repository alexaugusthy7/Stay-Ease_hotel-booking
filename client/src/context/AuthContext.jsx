import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();


// Provider
export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(
      localStorage.getItem("token") || ""
    );


  // Load user from localStorage
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  // Login
  const login = (userData, token) => {
    setUser(userData);

    setToken(token);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      token
    );
  };


  // Logout
  const logout = () => {
    setUser(null);

    setToken("");

    localStorage.removeItem("user");

    localStorage.removeItem("token");
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};