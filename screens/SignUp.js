import React from "react"
import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native"

import * as Google from "expo-google-app-auth"


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
      password: '',
      email: ''
    }
  }
  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        issuer: 'https://accounts.google.com',
        scopes: ['profile'],
        clientId: '295876176566-mc96ntau86p40omucvf52nu314u29upn.apps.googleusercontent.com',
        iosId:"295876176566-m1a1tdb4kr26k54qs81p2d6hjtorlhqc.apps.googleusercontent.com"
      });

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (err) {
      console.log("error", err)
    }
  }
  signUp = async () => {
    const { user, pass } = this.state
    try {
      // here place your signup logic
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
     
        
        <View style={styles.container}>
          {this.state.signedIn ? (
            <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
          ) : (
            <LoginPage signIn={this.signIn} />
          )}
          <TextInput
          style={styles.input}
          placeholder='user'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('user', val)}
        />
        <TextInput
        style={styles.input}
        placeholder='Pass'
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => this.onChangeText('pass', val)}
      />
         
          <Button
            title='Sign in'
            onPress={this.signUp}
          />
        </View>

      </View>






    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Continue with google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
})
