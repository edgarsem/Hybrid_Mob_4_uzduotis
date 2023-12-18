import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Button } from 'react-native';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebaseConfig';
import { handleGetUserData } from '../firebase/firebaseOperations';
import { PostContext } from '../contexts/PostContext';

const LoginScreen = ({ navigation }) => {
    const { setUserData } = useContext(PostContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const userData = await handleGetUserData(userCredentials.user.uid);
            setUserData(userData);
            navigation.navigate("Home")
        } catch (error) {
            (error == '[FirebaseError: Firebase: Error (auth/invalid-credential).]') ? alert('Invalid login credentials'.message) : alert(error.message);
            console.log("Login error:", error);
        }
    };


    return(
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                padding: 8,
              }}
            behavior='padding'
        >
            <View style={{
                marginLeft: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                marginLeft: 50,
                marginRight: 50,
                borderColor: '#00A9FF',
                borderWidth: 5,
                padding: 8,
            }}>
                <TextInput style={{marginBottom: 40, marginTop: 40, marginLeft: 30, backgroundColor: 'white', width: 210, height: 40}}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                />
                <TextInput style={{marginBottom: 40, marginLeft: 30, marginLeft: 30, backgroundColor: 'white', width: 210, height: 40}}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
                />
            </View>
            
            <View style={{
                marginTop: 30,
                marginLeft: 130, marginRight: 130, 
                justifyContent: 'space-around'}}>
                    <Button style={{
                    }}
                    title='Login'
                    onPress={handleLogin}
                    />

                    
                    <TouchableOpacity style={{
                        marginTop: 20,
                    }}
                    onPress={() => 
                        navigation.navigate('Register')
                    }
                    >
                        <Text style={{color: '#00A9FF'}}>Not registered yet?</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    carsContainer: {
      borderTopWidth: 3,
      borderTopColor: '#ddd',
      flex: 1,
    },
    cars: {
      padding: 20,
      backgroundColor: '#ededed',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 5,
    },
    make: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    model: {
      fontSize: 14,
      color: '#999',
    },
    title: {
      paddingTop: 30,
      paddingBottom: 20,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

export default LoginScreen;