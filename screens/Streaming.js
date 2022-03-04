// import { Camera } from 'expo-camera';
// import React from 'react';
// import {  AppRegistry,
//   Dimensions,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View } from "react-native";
// // import { NodeCameraView } from "react-native-nodemediaclient";
// import { CameraRollNodeInfo } from 'react-native';

// const { width, height } = Dimensions.get("window");

// const config = {
//   cameraConfig: {
//     cameraId: 1,
//     cameraFrontMirror: false
//   },
//   videoConfig: {
//     preset: 4,
//     bitrate: 2000000,
//     profile: 2,
//     fps: 30,
//     videoFrontMirror: true,
//   },
//   audioConfig: {
//     bitrate: 128000,
//     profile: 1,
//     samplerate: 44100,
//   }
// };

// const Streamer = () => {
//   const cameraViewRef = React.useRef(null);
//   const streamKey = 'bc8caa3d-4045-45e9-bf9c-bbafd9ed4f04 ';
//   const url = `https://api.mux.com/video/v1/live-streams/${streamKey}`;

//   return (
//     <View style={{flex: 1}}>
//       <Camera
//         style={{width, height}}
//         ref={cameraViewRef}
//         outputUrl={url}
//         camera={config.cameraConfig}
//         audio={config.audioConfig}
//         video={config.videoConfig}
//         autopreview={true}
//       />
//     </View>
//   );
// };

// export default Streamer ;
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';


export default function Streamer() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    marginTop: 0,
    marginBottom:0
  },

  greeting: {
    marginTop:0,
    fontSize:0,
    fontWeight:"400",
    textAlign:"center"
  },

  errorMassage:{
    alignItems:"center"  

  },
  form:{
    marginBottom:0,
    marginHorizontal:100,
    marginLeft: 0,
    marginRight: 0, 
    marginBottom : 0,
   
  },
  input:{
    borderBottomColor:"#8A8F9E",
    borderBottomWidth:StyleSheet.hairlineWidth,
    fontSize:15,
    color:"#161F3D"
  },
  inputTitle: {
    color:"#8A8F9E",
    fontSize:40,
    textTransform:"uppercase"

  },
  button:{
    // marginHorizontal:450,
    // backgroundColor:"#E9446A",
    // borderRadius:4,
    // alignItems: "center",
    // justifyContent: "center",
    marginVertical: 110,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
  }
});


// var styles = StyleSheet.create({
 
//     camera: {
//       flex:1,
//     }
 
//   })