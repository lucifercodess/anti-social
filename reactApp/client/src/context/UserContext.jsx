// UserContext.js

import { createContext, useContext, useState, useEffect } from "react"; // Add useEffect import

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app initialization
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));  // Parse and set user from localStorage
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
