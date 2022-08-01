import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colores } from '../../constants/estilos';
import LoginScreen from '../../screens/LoginScreen';
import BotonesScreen from '../../screens/BotonesScreen';
import ModalScreen from "../../screens/ModalScreen";
import { Contexto } from '../../store/Contexto';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: Colores.primary500 },
        // headerTintColor: 'white',
        // contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Inicio de sesión' }}
      />
      <Stack.Group screenOptions={{
          presentation: 'modal',
          // headerStyle: { backgroundColor: Colors.error500 },
          // headerTintColor: 'white',
          // contentStyle: { backgroundColor: Colors.error100 },
        }}
      >
        <Stack.Screen name="Modal" component={ModalScreen} options={{ title: 'Error' }}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export function AuthenticatedStack() {
  const contexto = useContext(Contexto);
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: Colors.primary500 },
        // headerTintColor: 'white',
        // contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Botones"
        component={BotonesScreen}
        options={{
          title: 'Elegir sección',
          // headerRight: ({ tintColor }) => (
          //   <IconButton
          //     icon="exit"
          //     color={tintColor}
          //     size={26}
          //     onPress={contexto.logout}
          //   />
          // ),
        }}
      />
    </Stack.Navigator>
  );
}
