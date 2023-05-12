import { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
// import Constants from "expo-constants"; // Parece romper en SDK 46
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function AnimatedSplashScreen({ children, icono, texto }) {
  const animation = useMemo(() => new Animated.Value(0), []);
  const [animationComplete, setAnimationComplete] = useState(false);
        
  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
    } catch (e) {
      console.log(e); // Útil
    } finally {
      efecto();
    }
  }, []);

  const efecto = () => {
    SplashScreen.hideAsync();
    
    Animated.timing(animation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => setAnimationComplete(true));  
  };

  return (
    <View style={{ flex: 1 }}>
      {animationComplete && children}
      {!animationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "#2A2E45",
            },
          ]}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              position: 'absolute'
            }}
            source={icono}
          />
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              opacity: animation
            }}
            source={texto}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}