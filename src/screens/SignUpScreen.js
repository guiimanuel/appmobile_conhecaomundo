import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import useAppFonts from '../components/expoFonts';

function SignUpScreen({navigation}) {
    const fontsLoaded = useAppFonts();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function handleSignUp() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
            const user = userCredential.user;
            console.log('Sign-up successful:', user);
            navigation.navigate('Home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Sign-up failed:', errorCode, errorMessage);
                alert('Erro ao criar conta! Verifique suas informações e tente novamente.');
            });
    }
    const styles=StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 10
        }});
    return (
        <View style={styles.container}>
            <StatusBar style='auto'/>
            <View style={{marginRight: 'auto', marginTop: 30}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={{marginRight: 'auto',  marginTop: 50}}>
                <Text style={{fontSize: 34, fontFamily: 'PoppinsBold'}}>Criar Conta</Text>
                <Text style={{fontSize: 18, color: '#5C6B7A', fontFamily: 'PoppinsRegular', fontWeight: '600', marginTop: 10}}>Preencha os dados para se cadastrar</Text>
            </View>
        </View>
    );
}
export default SignUpScreen;