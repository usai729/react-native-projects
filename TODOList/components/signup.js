import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Text,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { Icon } from "react-native-elements";

import App from "../App";

export default function SignUp({ navigation, route }) {
  const [key, setKey] = React.useState();
  const [activity, setActivity] = React.useState(false);

  const submit = () => {
    setActivity(true);
    fetch("https://185e-49-205-120-158.ngrok.io/signup.php", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({ key: key }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        if (result != "Choose a diffrent key. This key is invalid") {
          route.params.setSignedin(true);
        } else {
          setKey("");
          ToastAndroid.showWithGravity(
            result,
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
      <Icon name="arrow-forward" style={{ margin: 10 }} size={50} />
      <TextInput
        style={styles.input}
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
          navigation.replace("login");
        }}
      >
        log in
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
