import { createContext, useState } from 'react';

export const Contexto = createContext({
  email: '',
  authenticate: email => {},
  logout: () => {},
});

export function ContextoProvider({ children }) {
  const [email, setEmail] = useState();

  const value = {
    email: email,
    authenticate: email => setEmail(email),
    logout: () => setEmail(null)
  };

  return <Contexto.Provider value={value}>{children}</Contexto.Provider>;
}
