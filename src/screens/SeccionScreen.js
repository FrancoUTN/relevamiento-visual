import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import Camara from '../components/camara/Camara';
import IconButton from '../components/ui/IconButton';
import { Colores } from '../constants/estilos';
import refUsuarios from '../util/firestoreUsuarios';
import refFotos from '../util/firestoreFotos';


export default function SeccionScreen({ navigation, route }) {
    const auth = getAuth();
    const email = auth.currentUser.email;

    const cosas = route.params?.cosas;
    const sonLindas = cosas == 'Lindas';
    const [foto, setFoto] = useState();
    const [fotos, setFotos] = useState([]);
    const [tomarFoto, setTomarFoto] = useState(false);

    useEffect(
        () => navigation.setOptions({ title: cosas }),
    []);

    useEffect(() => {
        const q = query(refFotos, orderBy("fecha"));
    
        const unsubscribe = onSnapshot(q, qs => {
            setFotos(
                qs.docs.reduce(
                    (result, doc) => {
                        if (doc.data().esLinda === sonLindas) {
                            result.push({
                                id: doc.id,
                                autor: doc.data().autor,
                                esLinda: doc.data().esLinda,
                                fecha: doc.data().fecha,
                                url: doc.data().url,
                                votos: doc.data().votos
                            });
                        }
                        return result;
                    }, []
                )
            )
        });
        return unsubscribe;
    }, [])

    async function fotoTomadaHandler(objetoFoto) {
        const storageRef = ref(getStorage(), 'some-child');

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", objetoFoto.uri, true);
            xhr.send(null);
        });

        await uploadBytes(storageRef, blob);

        const url = await getDownloadURL(storageRef);

        setTomarFoto(false);

        const foto = {
          autor: email,
          esLinda: sonLindas ? true : false,
          fecha: new Date(),
          url: url,
          votos: 0
        }

        addDoc(refFotos, foto);
    }

    function renderizarItem({item}) {
    }

    const lista = (
        <FlatList
            data={fotos}
            renderItem={renderizarItem}
            keyExtractor={item => item.id}
        />
    )

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
                fotos.length > 0 &&
                <Image
                    style={{
                        // width: foto.width,
                        // height: foto.height,
                        width: '100%',
                        height: 300,
                        resizeMode: 'contain'
                    }}
                    source={{uri: fotos[0].url}}
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
