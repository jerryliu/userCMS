import React from 'react';

export type User = {
  data: any;
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  picture: string;
} | null;

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;
