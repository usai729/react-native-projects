import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Text,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";

import App from "../App";

export default function LogIn({ navigation, route }) {
  const [key, setKey] = React.useState("");
  const [activity, setActivity] = React.useState(false);

  const submit = () => {
    setActivity(true);
    fetch("https://185e-49-205-120-158.ngrok.io/login.php", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({ key: key }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        if (result == "ok") {
          route.params.setSignedin(true);
        } else {
          setKey("");
          ToastAndroid.showWithGravity(
            "Wrong key!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        setActivity(false);
      });
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={activity}
        size="large"
        color="blue"
        style={{ display: activity ? "flex" : "none" }}
      />
      <Icon name="login" style={{ margin: 10 }} size={50} />
      <Text style={{ margin: 7, fontWeight: "bold" }}>Log In</Text>
      <TextInput
        style={styles.input}
        value={key}
        placeholder="Key"
        keyboardType="decimal-pad"
        onChangeText={(val) => setKey(val)}
        maxLength={5}
        onSubmitEditing={submit}
      />
      <Text
        style={{
          fontWeight: "bold",
          textTransform: "uppercase",
          margin: 10,
          color: "gray",
        }}
        onPress={() => {
          navigation.replace("signup");
        }}
      >
        sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight + (300 * StatusBar.currentHeight) / 100,
  },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 7,
    width:
      Dimensions.get("window").width -
      (8 * Dimensions.get("window").width) / 100,
    borderRadius: 4,
    textAlign: "center",
  },
});
