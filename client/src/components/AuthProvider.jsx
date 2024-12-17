import React, { createContext, useEffect, useState } from 'react';

// Create a Context
export const AuthContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');

    if (storedUser) {
      console.log(JSON.parse(storedUser))
      setUser(JSON.parse(storedUser)); // Parse and set the user info
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
