import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colores } from '../constants/estilos';


export default function BotonesScreen() {
  return (
    <View style={styles.container}>
      <Text>Hola!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});
