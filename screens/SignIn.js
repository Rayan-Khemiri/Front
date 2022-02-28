import React,{useState} from "react";
import {View ,Text,StyleSheet,Image, useWindowDimensions,onPress,ScrollView} from "react-native"
import Logo from "../assets/images/myLogo.png"
import CustomInput from "../components/customInput/CustomInput"; 
import CustomButton from "../components/customButton/CusstomButton";
import axios from "axios"
import * as Google from "expo-google-app-auth"
 const signIn = async () => {
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
          username: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (err) {
      console.log("error", err)
    }
  }

const SignIn = ()=>{
  
   const [Email,setUsername]=useState("");
   const [password,setPassword]=useState("");
   const {height}=useWindowDimensions();
   const onSignInPressed =()=>{
     console.warn("Sign in")
   }
   const onForgetPassword=()=>{
     console.warn("forget")
   }
   const onSignInGooglePressed=()=>{
    console.warn("sign in")
  }
  const onSignUpPressed=()=>{
    console.warn("onSignUpPress");
  }
  const GetSing = ()=>{
    axios.post('http://172.20.10.14:3000/api/user/signIn',{email:Email,password:password}).then((data)=>{
      console.log("Welcom",data)
    }).catch((error)=>{
      console.log("soory",error)
    })
  }
  return (
    <ScrollView>
    <View style={styles.root}>
      <Image
      source={Logo} 
       style={[styles.Logo,{height:height * 0.3}]}
       resizeMode="contain"
       />
    <CustomInput 
    placeholder="Email"
    value={Email}
    setValue ={setUsername}
    />
    <CustomInput
    placeholder="password"
    value={password}
    setValue ={setPassword}
    secureTextEntry={true}
    />
    <CustomButton text="Sign In" onPress={GetSing}/>
    <CustomButton 
    text="Forgot password"
     onPress={onForgetPassword}
     type="TERTIARY"
     />
     <CustomButton text="Sign In with Google" onPress={signIn} bgColor="#FAE9EA"fgColor="#DD4D44"/>
     <CustomButton 
    text="you don t have an acount ? Create one"
     onPress={onSignUpPressed}
     type="TERTIARY"
     />
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
root :{
  alignItems:'center',
  padding:20
},
Logo:{
  width:"70%",
  maxWidth:300,
  maxHeight:200,
}
})
export default SignIn
