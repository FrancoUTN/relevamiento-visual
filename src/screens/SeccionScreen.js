import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Camara from '../components/camara/Camara';
import IconButton from '../components/ui/IconButton';

import { Colores } from '../constants/estilos';


export default function SeccionScreen({ navigation, route }) {
    const cosas = route.params?.cosas;
    const [tomarFoto, setTomarFoto] = useState(false);

    useEffect(
        () => navigation.setOptions({ title: cosas }),
    []);

    // useEffect(
    //     () => navigation.setParams({ funcion: () => subirFoto() }),
    // []);

    // function subirFoto() {
    //     console.log('Hola, ' + cosas)
    // }

    const viewTemporal = (
        <View style={{
            margin: 20,
            marginHorizontal: 145,
            alignItems: 'center',
            backgroundColor: Colores.primarioClaro,
            borderRadius: 10
        }}>
          <IconButton
            icon='camera-outline'
            color='white'
            size={50}
            onPress={() => setTomarFoto(!tomarFoto) }
          />
        </View>
    )

    return (
        <View style={styles.container}>

            { viewTemporal }

            {
                tomarFoto ?
                <Camara/>
                :
                <Text>
                    {cosas}
                </Text>
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
