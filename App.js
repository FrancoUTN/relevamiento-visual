// Inicializar App y Auth
import './src/util/auth'

import { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import AnimatedSplashScreen from "./src/components/inicio/AnimatedSplashScreen";
import { Contexto, ContextoProvider } from './src/store/Contexto';
import { AuthenticatedStack, AuthStack } from "./src/components/inicio/Stacks";


function Navigation() {
  const ctx = useContext(Contexto);

  return (
    <NavigationContainer>
      {!ctx.email && <AuthStack />}
      {!!ctx.email && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/* <AnimatedSplashScreen image={require('./assets/splash.png')}> */}
      <AnimatedSplashScreen image={require('./assets/icon-splash.png')}>
        <MainScreen />
      </AnimatedSplashScreen>
    </>
  );
}

function MainScreen() {
  return (
    <ContextoProvider>
      <Navigation />
    </ContextoProvider>
  );
}
