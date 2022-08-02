import { Image, StyleSheet, Text, View } from 'react-native';

import { Colores } from '../../constants/estilos';
import IconButton from './IconButton';


export default function Publicacion({ autor, fecha, url, id, onVotar, votada, votos }) {
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
                        color={Colores.voto}
                        size={30}
                        onPress={() => onVotar(id, votos)}
                    />
                    :
                    <IconButton
                        icon='star-outline'
                        color={Colores.primarioOscuro}
                        size={30}
                        onPress={() => onVotar(id, votos)}
                    />
                }
                <Text style={styles.votos}>
                    { votos }
                </Text>
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
        marginBottom: 60
    },
    pieContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        // height: 45
    },
    votoContainer: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center'
    },
    votos : {
        marginHorizontal: 10,
        fontSize: 24,
        color: Colores.primarioOscuro
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
        fontWeight: 'bold',
        color: Colores.primarioOscuro
    },    
    fecha: {
        color: '#555555',
        alignSelf: 'flex-end',
        color: Colores.primarioOscuro
    }
});
