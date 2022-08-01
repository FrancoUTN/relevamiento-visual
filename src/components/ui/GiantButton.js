import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function GiantButton({ children, onPress, color, imagen }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.rootContainer, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={[styles.botonGigante, color]}>
        <Image
          style={styles.imagen}
          source={imagen}
        />
          <Text style={styles.buttonText}>
            {children}
          </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  botonGigante: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagen: {
    width: 100,
    height: 100
  }
});
