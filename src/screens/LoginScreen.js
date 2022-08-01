import { useContext, useState } from 'react';

import FormularioLogin from '../components/ui/FormularioLogin';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Contexto } from '../store/Contexto';
import login from '../util/authentication';


export default function LoginScreen({ navigation }) {
  const contexto = useContext(Contexto);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const usuario = await login(email, password);

      contexto.authenticate(usuario.email);
    }
    catch (error) {
      console.log(error);
      navigation.navigate({
        name: 'Modal',
        params: {
          mensajeError: 'Error de autenticación. Intenta nuevamente'
        }
      });

      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Ingresando..." />;
  }

  return <FormularioLogin></FormularioLogin>;
}


