import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 10,
            backgroundColor: '#B7D9EC'
        },
        initialImage: {
            
        },
        initialTitle: {
            alignItems: 'center',
            backgroundColor: 'red',
            width: 300
        },
        inputContainer: {
            width: 380,
            height: 200,
            backgroundColor: 'yellow',
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
                {/* image source */}
            </View>

            {/* view title */}
            <View style={styles.initialTitle}>
                <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'blue' }}>CONHEÇA</Text>
                <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'blue' }}>O MUNDO</Text>
                <Text style={{ fontSize: 26 }}>Explore. Descubra. Viaje.</Text>
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
                            style={{height: 75,borderRadius: 15,backgroundColor: 'white',fontSize: 20,paddingLeft: 60, paddingBottom:8,color: 'gray'}}
                        />
                    </View>
                
                <View style={{ marginTop: 35, position: 'relative' }}>
                    <Fontisto name="locked" size={26} color="gray" style={{position:'absolute', left: 15, top: 21}} />
                    <TextInput
                    placeholder='Senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={{height: 75, borderRadius: 15, backgroundColor: 'white', fontSize: 20, paddingLeft: 60, paddingBottom:4, color: 'gray'}} 
                    />
                </View>
                
                
            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: 'blue', height: 75, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>   
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 30}}><Text style={{fontSize: 18}}>Ainda nao tem uma conta?   <Text style={{color:'blue'}}>Cadastre-se</Text></Text></View>
        </View>
    )
    
}
export default LoginScreen;