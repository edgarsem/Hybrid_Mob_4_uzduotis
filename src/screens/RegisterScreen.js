import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Button } from 'react-native';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { PostContext } from '../contexts/PostContext';
import { handleCreateUser } from '../firebase/firebaseOperations';

const RegisterScreen = ({ navigation }) => {
    const { setUserData } = useContext(PostContext);

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUp = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const userData = await handleCreateUser(userCredentials.user.uid, name, lastName);
            setUserData(userData);
            navigation.navigate("Home")
        } catch (error) {
            alert(error.message);
        }

    }


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
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
                />
                <TextInput style={{marginBottom: 40, marginLeft: 30, backgroundColor: 'white', width: 210, height: 40}}
                placeholder="Last Name"
                value={lastName}
                onChangeText={text => setLastName(text)}
                />
                <TextInput style={{marginBottom: 40, marginLeft: 30, backgroundColor: 'white', width: 210, height: 40}}
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
                    title='Proceed'
                    onPress={handleSignUp}
                    />
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={{
                            marginTop: 20,
                        }}
                        onPress={() => 
                            navigation.navigate('Login')
                        }
                        >
                            <Text style={{color: '#00A9FF'}}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
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

export default RegisterScreen;