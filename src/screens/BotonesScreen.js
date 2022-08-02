import { StyleSheet, View } from 'react-native';

import GiantButton from '../components/ui/GiantButton';
import { Colores } from '../constants/estilos';


export default function BotonesScreen({ navigation }) {

  function onLindasPressHandler() {
    navigation.navigate('Seccion', {'cosas': 'Lindas'});
  }

  function onFeasPressHandler() {
    navigation.navigate('Seccion', {'cosas': 'Feas'});
    
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
