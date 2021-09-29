import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";

import { Icon } from "react-native-elements";

import App from "../App";

export default function Edit({ navigation, route }) {
  const [title, setTitle] = React.useState(route.params.itemTitle);
  const [desc, setDesc] = React.useState(route.params.itemDesc);

  const itemID = route.params.itemID;

  const [activity, setActivity] = React.useState(false);

  const edit = () => {
    setActivity(true);
    fetch("url/edit.php", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        title: title,
        desc: desc,
        id: itemID,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        setActivity(false);

        if (result == "yes") {
          ToastAndroid.showWithGravity(
            "To-Do Updated!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        } else {
          ToastAndroid.showWithGravity(
            "Couldn't update to-do",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
      });
  };

  const ActivityOrIcon = () => {
    return activity ? (
      <View
        style={{
          margin: 10,
          alignItems: "center",
          paddingTop:
            StatusBar.currentHeight + (250 * StatusBar.currentHeight) / 100,
        }}
      >
        <ActivityIndicator color="purple" size="large" />
      </View>
    ) : (
      <View
        style={{
          margin: 10,
          alignItems: "center",
          paddingTop:
            StatusBar.currentHeight + (250 * StatusBar.currentHeight) / 100,
        }}
      >
        <Icon name="edit" size={40} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input1}
        placeholder="Edit title"
        value={title}
        onChangeText={(value) => setTitle(value)}
      />
      <TextInput
        style={[styles.input1, { marginTop: 7, textAlignVertical: "top" }]}
        placeholder="Edit Description"
        multiline={true}
        numberOfLines={7}
        value={desc}
        onChangeText={(value) => setDesc(value)}
      />
      <TouchableHighlight
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={edit}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Edit To-Do</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[
          styles.button,
          {
            backgroundColor: "#fff",
            borderColor: "red",
            borderWidth: 1,
            alignItems: "center",
          },
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "red", fontWeight: "bold" }}>Cancel</Text>
      </TouchableHighlight>
      <ActivityOrIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    //marginTop: StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight + (5 * StatusBar.currentHeight) / 100,
  },
  input1: {
    backgroundColor: "#F0F0F0",
    padding: 7,
    width:
      Dimensions.get("window").width -
      (8 * Dimensions.get("window").width) / 100,
    borderRadius: 4,
  },
  button: {
    width:
      Dimensions.get("window").width -
      (8 * Dimensions.get("window").width) / 100,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "purple",
    alignItems: "center",
    marginTop: 5,
  },
});
