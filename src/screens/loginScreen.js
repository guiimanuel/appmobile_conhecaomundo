import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import useAppFonts from '../components/expoFonts';

function LoginScreen({navigation}) {
    const fontsLoaded = useAppFonts();
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 10,
            backgroundColor: '#EDF5FA'
        },
        initialImage: {
            flex: 1,
            marginRight: 30,
        },
        initialTitle: {
            alignItems: 'center',
            width: 300
        },
        inputContainer: {
            width: 380,
            height: 200,
            marginTop: 20,
            justifyContent: 'center',
        },
        ButtonContainer: {
            width: 380
        }
    });
    return(
        <View style={styles.container}>
            <StatusBar style='auto'/>

            {/* view image */}
            <View style={styles.initialImage}>
                <Image source={require('../assets/images/earth.png')} style={{ width: 400, height: 450 }} />
                {/* image source */}
            </View>

            {/* view title */}
            <View style={styles.initialTitle}>
                <Text style={{ fontSize: 55, fontWeight: 'bold', color: '#0A2A66', fontFamily: 'BebasNeueRegular', letterSpacing: 5 }}>CONHEÇA</Text>
                <Text style={{ fontSize: 55, fontWeight: 'bold', color: '#0A2A66', fontFamily: 'BebasNeueRegular', letterSpacing: 5 }}>O MUNDO</Text>
                <Text style={{ fontSize: 24, color: '#5C6B7A', fontFamily: 'PoppinsMedium' }}>Explore. Descubra. Viaje.</Text>
            </View>
            
            {/* view input */}
            <View style={styles.inputContainer}>

                    <View style={{ position: 'relative' }}>
                        <MaterialIcons
                            name="email"
                            size={28}
                            color="gray"
                            style={{ position: 'absolute', left: 15, top: 21 }}
                        />
                        <TextInput
                            placeholder='E-mail'
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            style={{height: 75,borderRadius: 15,backgroundColor: 'white',fontSize: 20,paddingLeft: 60, paddingBottom:6,color: 'gray', fontFamily: 'PoppinsRegular', borderColor: '#DCE6F2', borderWidth: 1}}
                        />
                    </View>
                
                <View style={{ marginTop: 35, position: 'relative' }}>
                    <Fontisto name="locked" size={26} color="gray" style={{position:'absolute', left: 15, top: 21}} />
                    <TextInput
                    placeholder='Senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={{height: 75, borderRadius: 15, backgroundColor: 'white', fontSize: 20, paddingLeft: 60, paddingBottom:3, color: 'gray', fontFamily: 'PoppinsRegular', borderColor: '#DCE6F2', borderWidth: 1}} 
                    />
                </View>
                
                
            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: '#1A73E8', height: 75, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>   
                    <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PoppinsSemiBold' }}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 24}}><Text style={{fontSize: 20, fontFamily: 'PoppinsRegular'}}>Ainda não tem conta?   <Text style={{color:'#1A73E8', fontFamily: 'PoppinsSemiBold'}}>Cadastre-se</Text></Text></View>
        </View>
    )
    
}
export default LoginScreen;