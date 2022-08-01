import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colores } from '../constants/estilos';


export default function SeccionScreen({ navigation, route }) {
    const cosas = route.params?.cosas;

    useEffect(
        () => navigation.setOptions({ title: cosas }),
    []);

    useEffect(
        () => navigation.setParams({ funcion: () => subirFoto() }),
    []);

    function subirFoto() {
        console.log('Hola, ' + cosas)
    }

    return (
        <View style={styles.container}>
            <Text>
                {cosas}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
