import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { addDoc, doc, getFirestore, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import moment from 'moment';

import Camara from '../components/camara/Camara';
import IconButton from '../components/ui/IconButton';
import { Colores } from '../constants/estilos';
import refUsuarios from '../util/firestoreUsuarios';
import refFotos from '../util/firestoreFotos';
import Publicacion from '../components/ui/Publicacion';


export default function SeccionScreen({ navigation, route }) {
    const auth = getAuth();
    const email = auth.currentUser.email;
    const uid = auth.currentUser.uid;
    const userRef = doc(getFirestore(), 'usuarios', uid);

    const cosas = route.params?.cosas;
    const sonLindas = cosas == 'Lindas';
    const [usuario, setUsuario] = useState();
    const [fotos, setFotos] = useState([]);
    const [tomarFoto, setTomarFoto] = useState(false);

    useEffect(
        () => navigation.setOptions({ title: cosas }),
    []);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(userRef, doc => {
            setUsuario(doc.data());
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const q = query(refFotos, orderBy("fecha", 'desc'));
    
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
        const storageRef = ref(getStorage(), new Date().toISOString());

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

    async function onVotarHandler(id) {
        const idFotoVotada = sonLindas ? usuario.masLinda : usuario.masFea;
        let objeto;

        if (sonLindas) {
            if (id === idFotoVotada) {
                objeto = {
                    masLinda: ''
                };
            }
            else {
                objeto = {
                    masLinda: id
                };
            }
        }
        else {
            if (id === idFotoVotada) {
                objeto = {
                    masFea: ''
                };
            }
            else {
                objeto = {
                    masFea: id
                };
            }
        }

        await updateDoc(userRef, objeto);
    }

    function formatDate(timestamp) {
        const fecha = timestamp.toDate();
    
        return moment(fecha).format('D/M/YY k:mma')
    }

    function renderizarItem({item}) {
        const fotoVotada = sonLindas ? usuario.masLinda : usuario.masFea;

        return (
            <Publicacion
                id={item.id}
                autor={item.autor}
                fecha={formatDate(item.fecha)}
                url={item.url}
                onVotar={onVotarHandler}
                votada={item.id === fotoVotada}
                votos={item.votos}
            />
        );
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
            margin: 10,
            marginHorizontal: 145,
            alignItems: 'center',
            backgroundColor: Colores.primarioClaro,
            borderRadius: 10
        }}>
            <IconButton
                icon={ tomarFoto ? 'close' : 'camera-outline' }
                color='white'
                size={40}
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
                lista
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
