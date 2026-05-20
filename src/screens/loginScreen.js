import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
            const user = userCredential.user;
            console.log('Login successful:', user);
            navigation.navigate('Home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Login failed:', errorCode, errorMessage);
                alert('Erro ao fazer login! Verifique suas credenciais e tente novamente.');
            });
}
    return(
        <View style={styles.container}>
            <StatusBar style='auto'/>
        </View>
    )
}
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });