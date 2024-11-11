import React, { useState, createContext, ReactNode } from "react";

interface UserInterface {
  id: string;
  name: string;
  email: string;
}

interface ContextInterface {
  user: UserInterface;
  setUser: (value: UserInterface) => void;
}

export const UserContext = createContext<ContextInterface>({
  user: {
    id: "",
    name: "",
    email: "",
  },
  setUser: (value: UserInterface) => console.log(value),
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
