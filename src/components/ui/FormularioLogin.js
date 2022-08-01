import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Colores } from '../../constants/estilos';
import { useNavigation } from '@react-navigation/native';


export default function FormularioLogin({ isLogin, onAuthenticate }) {
//   const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false
  });

  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

//   function submitHandler(credentials) {
//     let { email, password } = credentials;

//     email = email.trim();
//     password = password.trim();

//     const emailIsValid = email.includes('@');
//     const passwordIsValid = password.length >= 6;

//     if ( !emailIsValid || !passwordIsValid ) {      
//       navigation.navigate({
//         name: 'MiModal',
//         params: { mensajeError: 'Datos inválidos.'}
//       });

//       setCredentialsInvalid({
//         email: !emailIsValid,
//         password: !passwordIsValid
//       });

//       return;
//     }

//     onAuthenticate({ email, password });
//   }

//   function onPressItemHandler(name) {
//     switch (name) {
//       case 'admin':
//         setCorreo('admin@admin.com');
//         setClave('111111');
//         break;
//       case 'invitado':
//         setCorreo('invitado@invitado.com');
//         setClave('222222');
//         break;
//       case 'usuario':
//         setCorreo('usuario@usuario.com');
//         setClave('333333');
//         break;
//       case 'anonimo':
//         setCorreo('anonimo@anonimo.com');
//         setClave('444444');
//         break;
//       case 'tester':
//         setCorreo('tester@tester.com');
//         setClave('555555');
//         break;
//     }
//   }

  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
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
    backgroundColor: Colores.primarioClaro,
    borderRadius: 4,
    fontSize: 20,
  },
  inputInvalid: {
    backgroundColor: Colores.errorClaro,
  },
});
