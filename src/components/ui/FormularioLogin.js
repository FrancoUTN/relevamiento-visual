import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colores } from '../../constants/estilos';
import { useNavigation } from '@react-navigation/native';


export default function FormularioLogin({ onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false
  });

  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

  function submitHandler() {
    email = correo.trim();
    password = clave.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length >= 6;

    if ( !emailIsValid || !passwordIsValid ) {      
      navigation.navigate({
        name: 'Modal',
        params: { mensajeError: 'Datos inválidos.'}
      });

      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid
      });

      return;
    }

    onAuthenticate({ email, password });
  }

  function accesoAdminHandler() {
    setCorreo('admin@admin.com');
    setClave('111111');
  }

  function accesoInvitadoHandler() {
    setCorreo('invitado@invitado.com');
    setClave('222222');
  }

  function accesoUsuarioHandler() {
    setCorreo('usuario@usuario.com');
    setClave('333333');
  }

  function accesoAnonimoHandler() {
    setCorreo('anonimo@anonimo.com');
    setClave('444444');
  }

  function accesoTesterHandler() {
    setCorreo('tester@tester.com');
    setClave('555555');
  }

  return (
    <View style={styles.container}>

        <Text style={styles.ingresarComo}>
            Ingresar como:
        </Text>
        <View style={styles.boton}>
            <Button
                onPress={accesoAdminHandler}
                title='Administrador'
                color={Colores.primarioOscuro}
            />
        </View>
        <View style={styles.boton}>
            <Button
                onPress={accesoInvitadoHandler}
                title='Invitado'
                color={Colores.primarioOscuro}
            />
        </View>
        <View style={styles.boton}>
            <Button
                onPress={accesoUsuarioHandler}
                title='Usuario'
                color={Colores.primarioOscuro}
            />
        </View>

        <View style={styles.inputContainer}>
            <Text style={[styles.label, credentialsInvalid.email && styles.labelInvalid]}>
                Correo electrónico
            </Text>
            <TextInput
                style={[styles.input, credentialsInvalid.email && styles.inputInvalid]}
                keyboardType="email-address"
                onChangeText={setCorreo}
                value={correo}
            />
        </View>
        <View style={styles.inputContainer}>
            <Text style={[styles.label, credentialsInvalid.clave && styles.labelInvalid]}>
                Clave
            </Text>
            <TextInput
                style={[styles.input, credentialsInvalid.clave && styles.inputInvalid]}
                secureTextEntry={true}
                onChangeText={setClave}
                value={clave}
            />
        </View>
        <View>
            <Button
                onPress={submitHandler}
                title='Acceder'
            >
            </Button>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boton: {
        margin: 6
    },
    ingresarComo: {
        fontSize: 28,
        color: 'white',
        margin: 10
    },
    inputContainer: {
        marginVertical: 8,
        width: '60%'
    },
    label: {
        color: 'white',
        marginBottom: 4,
        fontSize: 18
    },
    labelInvalid: {
        color: Colores.errorOscuro,
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        backgroundColor: 'white',
        borderRadius: 4,
        fontSize: 20,
    },
    inputInvalid: {
        backgroundColor: Colores.errorClaro,
    },
});
