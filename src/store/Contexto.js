import { createContext, useState } from 'react';

export const Contexto = createContext({
  email: '',
  seccion: '',
  authenticate: email => {},
  logout: () => {},
  elegirSeccion: seccion => {},
});

export function ContextoProvider({ children }) {
  const [email, setEmail] = useState();
  const [seccion, setSeccion] = useState();

  const value = {
    email: email,
    seccion: seccion,
    authenticate: email => setEmail(email),
    logout: () => setEmail(null),
    elegirSeccion: seccion => setSeccion(seccion)
  };

  return <Contexto.Provider value={value}>{children}</Contexto.Provider>;
}
