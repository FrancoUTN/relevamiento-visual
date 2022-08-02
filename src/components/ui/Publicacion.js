import { Image, StyleSheet, Text, View } from 'react-native';

export default function Publicacion({ autor, fecha, url }) {
  return (
    <View>
        <Image
            style={styles.imagen}
            source={{ uri: url }}
        />
        <View>
            <Text>
                { autor }
            </Text>
            <Text>
                { fecha }
            </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
    pieContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imagen: {
        width: '100%',
        height: 300,
        resizeMode: 'contain'
    },
    autor: {
        color: '#111111',
        fontWeight: 'bold'
    },    
    fecha: {
        color: '#555555',
        alignSelf: 'flex-end'
    }
});
