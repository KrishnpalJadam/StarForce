import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 new

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("login_details"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false); // 👈 very important
  }, []);

  const login = (userData) => {
    localStorage.setItem("login_details", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("login_details");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
