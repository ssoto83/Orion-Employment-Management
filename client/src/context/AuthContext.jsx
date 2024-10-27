import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Check authentication status when component mounts
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const login = (token, isAdmin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", isAdmin ? "admin" : "employee");
    setIsAuthenticated(true);
    setUserRole(isAdmin ? "admin" : "employee");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole("");
  };

  return (
    <AuthContext.Provider
      value={{
        
        isAuthenticated,
        userRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
