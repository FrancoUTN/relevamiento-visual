import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { addDoc, doc, getDoc, getFirestore, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import moment from 'moment';

import Camara from '../components/camara/Camara';
import IconButton from '../components/ui/IconButton';
import { Colores } from '../constants/estilos';
import refUsuarios from '../util/firestoreUsuarios';
import refFotos from '../util/firestoreFotos';
import Publicacion from '../components/ui/Publicacion';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Contexto } from '../store/Contexto';


export default function SeccionScreen({ navigation }) {
    const auth = getAuth();
    const email = auth.currentUser.email;
    const uid = auth.currentUser.uid;
    const userRef = doc(getFirestore(), 'usuarios', uid);
    const contexto = useContext(Contexto);
    
    const sonLindas = contexto.seccion == 'Lindas';
    const [usuario, setUsuario] = useState();
    const [fotos, setFotos] = useState([]);
    const [tomarFoto, setTomarFoto] = useState(false);
    const [cargando, setCargando] = useState(true);

    useEffect(
        () => navigation.setOptions({
            title: contexto.seccion,
            headerStyle: {
                backgroundColor: sonLindas ? Colores.secundario : Colores.terciario
            },
        }),
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
            );
            setCargando(false);
        });
        return unsubscribe;
    }, [])

    async function fotoTomadaHandler(objetoFoto) {
        setCargando(true);
        setTomarFoto(false);
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

        const foto = {
          autor: email,
          esLinda: sonLindas ? true : false,
          fecha: new Date(),
          url: url,
          votos: 0
        }

        addDoc(refFotos, foto);
    }

    async function onVotarLindaHandler(id) {
        let nuevoArray = [];
        if (usuario.masLindas) {
            nuevoArray = usuario.masLindas.slice();
            const indiceDeLaFoto = usuario.masLindas.indexOf(id);
            if (indiceDeLaFoto === -1) {
                nuevoArray.push(id);
            }
            else {
                nuevoArray.splice(indiceDeLaFoto, 1);
            }
        }
        else {
            nuevoArray.push(id);
        }
        const usuarioModificado = {
            masLindas: nuevoArray,
        }
        await updateDoc(userRef, usuarioModificado);

        // const masLindaActual = usuario.masLinda;
        // if (id != masLindaActual) {
        //     const fotoQueGana = doc(getFirestore(), 'fotos', id);
        //     const docSnap = await getDoc(fotoQueGana);
        //     const votosTraidos = docSnap.data().votos;
        //     await updateDoc(fotoQueGana, { votos: votosTraidos + 1});
        // }
        // if (masLindaActual) {
        //     const fotoQuePierde = doc(getFirestore(), 'fotos', masLindaActual);
        //     const docSnap = await getDoc(fotoQuePierde);
        //     const votosTraidos = docSnap.data().votos;
        //     await updateDoc(fotoQuePierde, { votos: votosTraidos - 1});
        // }
        // let objeto;
        // if (id === masLindaActual) {
        //     objeto = {
        //         masLinda: ''
        //     };
        // }
        // else {
        //     objeto = {
        //         masLinda: id
        //     };
        // }
        // await updateDoc(userRef, objeto);
    }

    async function onVotarFeaHandler(id) {
        const masFeaActual = usuario.masFea;

        if (id != masFeaActual) {
            const fotoQueGana = doc(getFirestore(), 'fotos', id);
            const docSnap = await getDoc(fotoQueGana);
            const votosTraidos = docSnap.data().votos;
            await updateDoc(fotoQueGana, { votos: votosTraidos + 1});
        }
        if (masFeaActual) {
            const fotoQuePierde = doc(getFirestore(), 'fotos', masFeaActual);
            const docSnap = await getDoc(fotoQuePierde);
            const votosTraidos = docSnap.data().votos;
            await updateDoc(fotoQuePierde, { votos: votosTraidos - 1});
        }

        let objeto;

        if (id === masFeaActual) {
            objeto = {
                masFea: ''
            };
        }
        else {
            objeto = {
                masFea: id
            };
        }

        await updateDoc(userRef, objeto);
    }

    function formatDate(timestamp) {
        const fecha = timestamp.toDate();
    
        return moment(fecha).format('D/M/YY - k:mm')
    }

    function renderizarItem({item}) {
        let fotoVotada = false;
        if (sonLindas) {
            if (usuario.masLindas?.includes(item.id)) {
                fotoVotada = true;
            }
        }
        else if (usuario.masFeas?.includes(item.id)) {
            fotoVotada = true;
        }
        return (
            <Publicacion
                id={item.id}
                autor={item.autor}
                fecha={formatDate(item.fecha)}
                url={item.url}
                onVotar={sonLindas ? onVotarLindaHandler : onVotarFeaHandler}
                votada={fotoVotada}
                votos={item.votos}
            />
        );
    }

    const lista = cargando ?    
        (
            <LoadingOverlay message={'Cargando...'}/>
        )
        :
        (
            <FlatList
                data={fotos}
                renderItem={renderizarItem}
                keyExtractor={item => item.id}
            />
        );

    const viewTemporal = (
        <View style={{
            margin: 10,
            paddingHorizontal: 10,
            // marginHorizontal: 145,
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: tomarFoto ? Colores.errorOscuro : Colores.otro,
            borderRadius: 10,
            flexDirection: 'row'
        }}>
            {
                tomarFoto ||
                <Text style={{
                    color: 'white',
                    fontSize: 30,
                    marginHorizontal: 5
                }}>
                    +
                </Text>
            }
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
