import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-native-datepicker";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  onPress
} from "react-native";
import CustomInput from "../components/customInput/CustomInput";
import CustomButton from "../components/customButton/CusstomButton";
// import ImagePicker from "react-native-image-picker"
import * as ImagePicker from 'expo-image-picker';
const SignUp = () => {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [phone_number, setPhone_number] = useState(null);
  const [categorie, setCategorie] = useState("");
  const [birthday, setBirthday] = useState("");
  const [picture,setPicture]=useState(0)
  const navigation = useNavigation();

  const onRegisterPressed = () => {
    axios
      .post("http://192.168.11.37:3000/api/user/register", {
        username,
        password,
        email,
        phone_number,
        categorie,
        birthday,
        picture
        
      })
      .then(() => navigation.navigate("Profile"))
      .catch((err) => console.log(err));
  };
  const onForgetPassword = () => {
    console.warn("forget");
  };
  const onSignInGooglePressed = () => {
    console.warn("sign in");
  };
  const choosePhoto = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setPicture(result.uri);
      }
    };
  const onTermpress = () => {
    console.warn("on T press");
  };
  const onPrivacypress = () => {
    console.warn("on P press");
  };


  
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Create an acount</Text>
        <CustomInput
          placeholder="username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput placeholder="email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Repeat password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="phone Number"
          value={phone_number}
          setValue={setPhone_number}
        />

        <CustomInput
          placeholder="categorie"
          value={categorie}
          setValue={setCategorie}
        />
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Select Date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          date={birthday}
          onDateChange={(d)=> setBirthday(d)}
        />
        <CustomButton text="Choose Photo" onPress={choosePhoto} />
        <CustomButton text="Register" onPress={onRegisterPressed} />
        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermpress}>
            {" "}
            Terms of Use{" "}
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacypress}>
            {" "}
            Privacy Policy{" "}
          </Text>{" "}
        </Text>
       
        <CustomButton
          text="Sign In with Google"
          onPress={onSignInGooglePressed}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />
        
        
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default SignUp;
