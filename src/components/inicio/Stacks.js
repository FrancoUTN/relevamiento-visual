import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colores } from '../../constants/estilos';
import LoginScreen from '../../screens/LoginScreen';
import BotonesScreen from '../../screens/BotonesScreen';
import ModalScreen from "../../screens/ModalScreen";
import { Contexto } from '../../store/Contexto';
import IconButton from '../ui/IconButton';
import SeccionScreen from '../../screens/SeccionScreen';
import { View } from 'react-native';

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
          // presentation: 'modal',
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
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={26}
              onPress={contexto.logout}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Seccion"
        component={SeccionScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <>
              <View style={{
                marginHorizontal: 40
              }} >
                <IconButton
                  icon="camera-outline"
                  color={tintColor}
                  size={28}
                  onPress={contexto.logout}
                />
              </View>
              <View style={{
              }} >
                <IconButton
                  icon="power"
                  color={tintColor}
                  size={24}
                  onPress={contexto.logout}
                />
              </View>
            </>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
