import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import IconButton from '../ui/IconButton';

export default function Camara({ fotoTomada }) {
    const [hasPermission, setHasPermission] = useState(null);
    const camaraRef = useRef();

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    function sacarFoto() {
        if (camaraRef) {
            const promesa = camaraRef.current.takePictureAsync();

            promesa.then(fotoTomada);
        }
    }

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <Camera
            style={styles.camera}
            ref={camara => camaraRef.current = camara}
        >
            <View style={styles.buttonContainer}>
                <IconButton
                    icon='camera-outline'
                    color='white'
                    size={50}
                    onPress={sacarFoto}
                />
            </View>
        </Camera>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        marginBottom: '8%',
        alignSelf: 'center'
    }
});
