import React,{useState} from "react";
import {View ,Text,StyleSheet,Image, useWindowDimensions,onPress,ScrollView} from "react-native"
import Logo from "../assets/images/myLogo.png"
import CustomInput from "../components/customInput/CustomInput"; 
import CustomButton from "../components/customButton/CusstomButton";
const SignIn = ()=>{
  
   const [username,setUsername]=useState("");
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
  return (
    <ScrollView>
    <View style={styles.root}>
      <Image
      source={Logo} 
       style={[styles.Logo,{height:height * 0.3}]}
       resizeMode="contain"
       />
    <CustomInput 
    placeholder="username"
    value={username}
    setValue ={setUsername}
    />
    <CustomInput
    placeholder="password"
    value={password}
    setValue ={setPassword}
    secureTextEntry={true}
    />
    <CustomButton text="Sign In" onPress={onSignInPressed}/>
    <CustomButton 
    text="Forgot password"
     onPress={onForgetPassword}
     type="TERTIARY"
     />
     <CustomButton text="Sign In with Google" onPress={onSignInGooglePressed} bgColor="#FAE9EA"fgColor="#DD4D44"/>
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
