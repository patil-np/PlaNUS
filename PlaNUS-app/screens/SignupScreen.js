import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';

const logo = require('../assets/logo.png'); 

const SignupScreen = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); 

  const navigation = useNavigation();

    //Navigate to LoginScreen once signed in 
    //(but its going straight to homescreen)
    useEffect(() => {
        const unsubscribe = 
        onAuthStateChanged(
            auth, 
            user => {
                if(user) {
                    navigation.navigate("Login");
                }
            })
            return unsubscribe; 
    }, []);

    //this is NOT working. 
    const isValidEmail = email => {
        //ensures nus student email format used.
        const regex = /^e\d{7}@u\.nus\.edu$/;
        return regex.test(email); 
    }; 

    // const isStrongPassword = (password) => {
    //     const minLength = 8;
    //     const hasUpperCase = /[A-Z]/.test(password);
    //     const hasLowerCase = /[a-z]/.test(password);
    //     const hasDigit = /[0-9]/.test(password);
    //     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
    //     return password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
    //   };

    const handleSignup = () => {
    //handle the case where a non NUS email is used to sign up 
    if (!isValidEmail) {
        alert('Invalid email. Not an NUS Student email.'); 
        return;
    // } else if (!isStrongPassword) {
    //     alert('Password is too weak. Please choose a stronger password.');
    } else {

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user; 
            console.log(username);
        })
        .catch(error => {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('An account with this email already exists.');
                    break;
                case 'auth/invalid-email':
                    alert('Invalid email. Not an NUS Student email.');
                    break;
                case 'auth/weak-password':
                    alert('Password is too weak. Please choose a stronger password.');
                default:
                    alert(error.message);
            }
        }
        );}
    };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior='padding'
>
    <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
    >
        <Ionicons name='chevron-back' size={24} color='white' />
    </TouchableOpacity>
    
    <Image 
        source={logo}
        style={styles.image}
    />

    <Text style={styles.headerText}>Welcome!</Text>  

    <View style={styles.inputContainer}>
        <TextInput
            placeholder='Username'
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.input}
            autoCapitalize='none'
        />
        <TextInput
            placeholder='Email'
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            autoCapitalize='none'
        />
        <TextInput
            placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            autoCapitalize='none'
            secureTextEntry
        />
    </View>

    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleSignup}
            style={styles.button}
        >
            <Text style={styles.buttonInput}>Sign Up</Text>
        </TouchableOpacity>
    </View>
</KeyboardAvoidingView>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems:'center',
      padding: 40,
      backgroundColor:'#003882',
  },
  image: {
      width:150, 
      height:100,
      marginBottom: 30,
      marginLeft:20,
  },
  headerText: {
      color:'white', 
      fontSize: 40,
      fontFamily:'Ubuntu-Regular',
      textAlign:'center',
      marginBottom: 20,
  },
  inputContainer: {
      width:'80%',
  },
  input: {
      backgroundColor:'white',
      paddingVertical:10,
      paddingHorizontal:15,
      borderRadius:25,
      marginBottom:15,
      alignItems:'center',
      fontFamily:'Ubuntu-Regular',
  }, 
  buttonContainer:{
      width:'60%',
      justifyContent:'center',
      alignItems:'center',
      marginTop: 30,
  },
  button: {
      backgroundColor:'white',
      width:'100%',
      padding:12,
      alignItems:'center',
      borderRadius:25,
      borderWidth:2,
      borderColor:'#e7e7e7',
  },
  buttonInput: {
      color:'#003882',
      fontSize:16,
      fontFamily:'Ubuntu-Bold',
  },
  backButton: {
    position:'absolute', 
    top: 50,
    left:20,
  },
  });