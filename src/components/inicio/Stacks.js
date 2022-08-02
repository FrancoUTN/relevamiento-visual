import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colores } from '../../constants/estilos';
import LoginScreen from '../../screens/LoginScreen';
import BotonesScreen from '../../screens/BotonesScreen';
import ModalScreen from "../../screens/ModalScreen";
import { Contexto } from '../../store/Contexto';
import IconButton from '../ui/IconButton';
import SeccionScreen from '../../screens/SeccionScreen';
// import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colores.primarioOscuro },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colores.primarioMedio },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Inicia sesión' }}
      />
      <Stack.Group screenOptions={{
          presentation: 'modal',
          headerStyle: { backgroundColor: Colores.errorOscuro },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: Colores.errorClaro },
        }}
      >
        <Stack.Screen name="Modal" component={ModalScreen} options={{ title: 'Error' }}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export function AuthenticatedStack() {
  const contexto = useContext(Contexto);
  const logoutIcon = (
    <IconButton
      icon="power"
      color='white'
      size={24}
      onPress={contexto.logout}
    />
  );

  // function funcionHeaderRight () {
  //   return () => (
  //     <>
  //       <View style={{marginHorizontal: 30}} >
  //         <IconButton
  //           icon='camera-outline'
  //           color='white'
  //           size={28}
  //           onPress={() => { console.log('Camera pressed.') }}
  //         />
  //       </View>
  //       { logoutIcon }
  //     </>
  //   );
  // }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colores.primarioOscuro },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colores.primarioMedio },
      }}
    >
      <Stack.Screen
        name="Botones"
        component={BotonesScreen}
        options={{
          title: 'Elegir sección',
          headerRight: () => logoutIcon,
        }}
      />
      <Stack.Screen
        name="Seccion"
        component={SeccionScreen}
        options={{ headerRight: () => logoutIcon }}
      />
    </Stack.Navigator>
  );
}
