import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { UserDecodedToken } from "../interfaces/UserDecodedToken";

interface UserContextType {
  user: UserDecodedToken | null;
  setUser: (user: UserDecodedToken | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDecodedToken | null>(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return {
        id: decodedToken.id,
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      };
    }
    return null;
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
