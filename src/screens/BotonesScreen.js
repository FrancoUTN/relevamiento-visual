import { Image, Pressable, StyleSheet, View } from 'react-native';

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
