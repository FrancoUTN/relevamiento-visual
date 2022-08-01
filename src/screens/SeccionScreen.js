import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colores } from '../constants/estilos';


export default function SeccionScreen({ route }) {
    const cosas = route.params?.cosas;

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
