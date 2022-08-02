import { Image, StyleSheet, Text, View } from 'react-native';
import IconButton from './IconButton';

export default function Publicacion({ autor, fecha, url, id, onVotar, votada }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.imagen}
                source={{ uri: url }}
            />
            <View style={styles.pieContainer}>
                <View style={styles.votoContainer}>
                {
                    votada ?
                    <IconButton
                        icon='star'
                        color='yellow'
                        size={40}
                        onPress={() => onVotar(id)}
                    />
                    :
                    <IconButton
                        icon='star-outline'
                        color='black'
                        size={40}
                        onPress={() => onVotar(id)}
                    />
                }
                </View>
                <View style={styles.datosContainer}>
                    <Text style={styles.autor}>
                        { autor }
                    </Text>
                    <Text style={styles.fecha}>
                        { fecha }
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'deeppink',
        marginBottom: 20
    },
    pieContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        // height: 45
    },
    votoContainer: {
        margin: 5
    },
    datosContainer: {
        margin: 5
    },
    imagen: {
        width: '100%',
        height: 480,
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
