import { Button, StyleSheet, Text, View } from 'react-native';
import { Colores } from '../constants/estilos';

export default function ModalScreen({ route, navigation }) {
  const mensajeError = route.params?.mensajeError;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.texto}>
        { mensajeError }
      </Text>
      <Button onPress={() => navigation.goBack()} title="Regresar" color={Colores.primarioMedio}/>
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
    color: 'white',
    margin: 20
  }
});