import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, cart, setCart }}>
      {children}
    </UserContext.Provider>
  );
};
