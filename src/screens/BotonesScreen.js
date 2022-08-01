import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import GiantButton from '../components/ui/GiantButton';

import { Colores } from '../constants/estilos';


export default function BotonesScreen() {
  return (
    <View style={styles.container}>
      <GiantButton
        color={{backgroundColor: Colores.secundario}}
        imagen={require('../../assets/house.png')}
      >
        Lindas
      </GiantButton>
      <GiantButton      
        color={{backgroundColor: Colores.terciario}}
        imagen={require('../../assets/damaged.png')}
      >
        Feas
      </GiantButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
