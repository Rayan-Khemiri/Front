import React,{useState} from "react";
import {View ,Text,StyleSheet,Image, useWindowDimensions,onPress,ScrollView,Picker} from "react-native"
import Logo from "../assets/images/myLogo.png"
import CustomInput from "../components/customInput/CustomInput"; 
import CustomButton from "../components/customButton/CusstomButton";
import * as Google from "expo-google-app-auth"

import axios from "axios"
 const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        issuer: 'https://accounts.google.com',
        scopes: ['profile'],
        clientId: '295876176566-mc96ntau86p40omucvf52nu314u29upn.apps.googleusercontent.com',
        iosId:"295876176566-m1a1tdb4kr26k54qs81p2d6hjtorlhqc.apps.googleusercontent.com"
      });

      if (result.type === "success") {
        
          signedIn: true,
          Username= result.user.name
          // photoUrl: result.user.photoUrl
      } else {
        console.log("cancelled")
      }
    } catch (err) {
      console.log("error", err)
    }
    axios.post('http://172.20.10.14:3000/api/user/signUp',{firstName:Username}).then((data)=>{
      console.log("success", data)
    }).catch((error)=>{
      console.error("error", error)
    })
  }

const SignIn = ()=>{
  
   const [FirstName, setFirstName]=useState("");
   const [Username]=useState("");
   const [LastName, setLastName]=useState("");
   const [Email, setEmail]=useState("");
   const [PhoneNumber, setPhoneNumber]=useState("");
   const [password,setPassword]=useState("");
   const {height}=useWindowDimensions();
   const onSignInPressed =()=>{
     console.log("Sign in")
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
  const SendUser = () =>{
    axios.post('http://172.20.10.14:3000/api/user/signUp',{firstName:FirstName,lastName:LastName,email:Email,password:password,phone_number:PhoneNumber}).then((data)=>{
      console.log("success", data)
    }).catch((error)=>{
      console.error("error", error)
    })
  
  }
  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <ScrollView>
    <View style={styles.root}>
      <Image
      source={Logo} 
       style={[styles.Logo,{height:height * 0.3}]}
       resizeMode="contain"
       />
    <CustomInput 
    placeholder="FirstName"
    value={FirstName}
    setValue ={setFirstName}
    />
    <CustomInput 
    placeholder="LastName"
    value={LastName}
    setValue ={setLastName}
    />
    <CustomInput 
    placeholder="Email"
    value={Email}
    setValue ={setEmail}
    />
    <CustomInput 
    placeholder="PhoneNumber"
    value={PhoneNumber}
    setValue ={setPhoneNumber}
    keyboardType="numeric"
    />
  
    <CustomInput
    placeholder="password"
    value={password}
    setValue ={setPassword}
    secureTextEntry={true}
    />
    

    <CustomButton text="Sign In" onPress={SendUser}/>
   
     <CustomButton text="Sign In with Google" onPress={signIn} bgColor="#FAE9EA"fgColor="#DD4D44"/>
    
    </View>
    <View style={{flex: 1,
      alignItems: "center",
    paddingBottom:49
    }}>
    <Picker
      selectedValue={selectedValue}
      style={{ height: 50, width: 150 }}
      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
    >
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
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
