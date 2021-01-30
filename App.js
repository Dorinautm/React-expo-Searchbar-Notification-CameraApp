import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Linking,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("shawn");

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 45 }}>
        <Text style={{ marginRight: 5 }}>Notificare in 10 sec</Text>
        <Button
          title="apasa-ma"
          onPress={() => {
            Notifications.scheduleNotificationAsync({
              content: {
                title: "Time's up!",
                body: "Ai primit notificarea!",
              },
              trigger: {
                seconds: 10,
              },
            });
          }}
        />
      </View>

      <View style={{ flex: 1, flexDirection: "column", marginTop: 40 }}>
        <Text style={{ marginLeft: 80 }}>Search smth</Text>
        <TextInput
          multiline
          style={styles.input}
          placeholder="e.g.Jon"
          name
          onChangeText={(val) => setSearch(val)}
        />
        <Button
          title="search"
          onPress={() => {
            Linking.openURL("https://google.com/search?q=" + search);
          }}
        />

        <Text style={{ marginTop: 80, marginLeft: 85 }}>Take a pic</Text>
        <Button
          title="Go to Camera"
          onPress={() => navigation.navigate("Camera")}
        />
      </View>
    </View>
  );
}

function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [pickedImage, setPickedImage] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      setPickedImage(photo.uri);
    }
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
        ratio="16:4"
      >
        <View
          style={{
            flex: 1,

            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
            onPress={() => pickImage()}
          >
            <Ionicons
              name="ios-photos"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
            onPress={() => takePicture()}
          >
            <FontAwesome
              name="camera"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <MaterialCommunityIcons
              name="camera-switch"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imgcontainer}>
          {/* <ImageBackground source={require({ uri: pickedImage })} style={styles.image}>
          <Text style={styles.text}>Inside</Text>
        </ImageBackground> */}
          {!pickedImage ? (
            <Text style={{ color: "white", fontSize: 20 }}>No image taken</Text>
          ) : (
            <ImageBackground
              style={styles.image}
              source={{ uri: pickedImage }}
            ></ImageBackground>
          )}
        </View>
      </Camera>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#539489",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Laboratorul1" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
  image: {
    // flex: 1,

    width: 500,
    height: 800,
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
  imgcontainer: {
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    width: "100%",
    backgroundColor: "#539489",
  },
});
