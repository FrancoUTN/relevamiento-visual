import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import IconButton from '../ui/IconButton';

export default function Camara() {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <Camera style={styles.camera}>
            <View style={styles.buttonContainer}>
                <IconButton
                    icon='camera-outline'
                    color='white'
                    size={50}
                    onPress={() => { console.log('Camera pressed.') }}
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
