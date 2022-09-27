import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import GiantButton from '../components/ui/GiantButton';
import { Colores } from '../constants/estilos';
import { Contexto } from '../store/Contexto';


export default function BotonesScreen({ navigation }) {
  const contexto = useContext(Contexto);

  function onLindasPressHandler() {
    contexto.elegirSeccion('Lindas');
    navigation.navigate('Seccion');
  }

  function onFeasPressHandler() {
    contexto.elegirSeccion('Feas');
    navigation.navigate('Seccion');
  }

  return (
    <View style={styles.container}>
      <GiantButton
        color={{backgroundColor: Colores.secundario}}
        imagen={require('../../assets/house.png')}
        onPress={onLindasPressHandler}
      >
        Lindas
      </GiantButton>
      <GiantButton      
        color={{backgroundColor: Colores.terciario}}
        imagen={require('../../assets/damaged.png')}
        onPress={onFeasPressHandler}
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
