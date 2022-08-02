import { useEffect, useMemo, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function AnimatedSplashScreen({ children, image }) {
    const animation = useMemo(() => new Animated.Value(0), []);
    const [animationComplete, setAnimationComplete] = useState(false);
    
    useEffect(() => {
      setTimeout(() => SplashScreen.hideAsync(), 300);
      
      Animated.timing(animation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));      
    }, []);
  
    return (
      <View style={{ flex: 1 }}>
        {animationComplete && children}
        {!animationComplete && (
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: Constants.manifest.splash.backgroundColor,
              },
            ]}
          >
            <Animated.Text            
              style={{
                // opacity: animation,
                fontSize: 50,
                color: 'white',
              }}
            >
              4ºA
            </Animated.Text>
            <Image
              style={{
                width: "100%",
                height: "100%",
                position: 'absolute'
              }}
              source={image}
            />
            {/* <Animated.Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: Constants.manifest.splash.resizeMode || "contain",
                transform: [
                  {
                    translateY: animation,
                  },
                ],
              }}
              source={image}
              onLoadEnd={onImageLoaded}
              fadeDuration={0}
            /> */}
            <Animated.Text
              style={{
                opacity: animation,
                fontSize: 50,
                color: 'white',
              }}
            >
              Catania Franco
            </Animated.Text>
          </Animated.View>
        )}
      </View>
    );
  }