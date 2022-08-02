import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from "firebase/storage";

import Camara from '../components/camara/Camara';
import IconButton from '../components/ui/IconButton';
import { Colores } from '../constants/estilos';
import refUsuarios from '../util/firestoreUsuarios';
import refFotos from '../util/firestoreFotos';


export default function SeccionScreen({ navigation, route }) {
    // Create a root reference
    const storage = getStorage();

    const auth = getAuth();
    const email = auth.currentUser.email;  
    const cosas = route.params?.cosas;
    const [foto, setFoto] = useState();
    const [fotos, setFotos] = useState([]);
    const [tomarFoto, setTomarFoto] = useState(false);

    useEffect(
        () => navigation.setOptions({ title: cosas }),
    []);

    function fotoTomadaHandler(objetoFoto) {
        setFoto(objetoFoto);
        setTomarFoto(false);
            
        const foto = {
          autor: email,
          esLinda: cosas == 'Linda' ? true : false,
          fecha: new Date(),
          // url: '',
          votos: 0
        }
    
        addDoc(refFotos, foto);
    }

    const viewTemporal = (
        <View style={{
            margin: 20,
            marginHorizontal: 145,
            alignItems: 'center',
            backgroundColor: Colores.primarioClaro,
            borderRadius: 10
        }}>
          <IconButton
            icon={ tomarFoto ? 'close' : 'camera-outline' }
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
                <Camara
                    fotoTomada={fotoTomadaHandler}
                />
                :
                foto &&
                <Image
                    style={{
                        // width: foto.width,
                        // height: foto.height,
                        width: '100%',
                        height: 300,
                        resizeMode: 'contain'
                    }}
                    source={{ uri: foto.uri }}
                />
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
