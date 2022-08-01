import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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

        <View style={styles.botonesContainer}>
            <Text style={styles.ingresarComo}>
                Ingresar como...
            </Text>
            <View style={styles.boton}>
                <Button
                    onPress={accesoAdminHandler}
                    title='Admin'
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
            <View style={styles.boton}>
                <Button
                    onPress={accesoAnonimoHandler}
                    title='Anónimo'
                    color={Colores.primarioOscuro}
                />
            </View>
            <View style={styles.boton}>
                <Button
                    onPress={accesoTesterHandler}
                    title='Tester'
                    color={Colores.primarioOscuro}
                />
            </View>
        </View>

        <View style={styles.formContainer}>
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
                <Text style={[styles.label, credentialsInvalid.password && styles.labelInvalid]}>
                    Contraseña
                </Text>
                <TextInput
                    style={[styles.input, credentialsInvalid.password && styles.inputInvalid]}
                    secureTextEntry={true}
                    onChangeText={setClave}
                    value={clave}
                />
            </View>
            <View style={styles.submit}>
                <Pressable
                    onPress={submitHandler}
                >
                    <Text                        
                        style={styles.acceder}                    
                    >
                        Acceder
                    </Text>
                </Pressable>
            </View>
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
    botonesContainer: {
        flex: 1,
        margin: 20,
        width: '60%',
        alignItems: 'center'
    },
    boton: {
        margin: 6,
        width: '80%',
    },
    ingresarComo: {
        fontSize: 22,
        color: 'white',
        margin: 10
    },
    formContainer: {
        flex: 1,
        width: '60%'
    },
    inputContainer: {
        marginVertical: 8
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
        fontSize: 18,
        color: Colores.primarioOscuro,
    },
    inputInvalid: {
        backgroundColor: Colores.errorClaro,
    },
    submit: {
        margin: 10,
        padding: 10,
        borderRadius: 4,
        backgroundColor: Colores.primarioOscuro
    },
    acceder: {
        color: Colores.primarioClaro,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    }
});
