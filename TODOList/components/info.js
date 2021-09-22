import React from "react";
import { View, Text, StyleSheet, StatusBar, Linking } from "react-native";

import { SocialIcon } from "react-native-elements";

export default function Info() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textTransform: "uppercase",
        }}
      >
        About
      </Text>
      <View
        style={{
          alignItems: "center",
          margin: 8,
        }}
      >
        <Text
          style={{
            lineHeight: 25,
          }}
        >
          As its name implies, the To-do list on an article's talk page shows
          the list of improvements suggested for the article. It is created and
          formatted using the "To Do" template. The list is maintained by
          editors, writers, reviewers or readers like you as a way to focus your
          collaborative efforts. As such, they represent a tentative consensus
          that helps improve the efficiency of the editing process.
        </Text>
        <Text
          style={{
            lineHeight: 25,
          }}
        >
          This helps you to remember and do all the tasks, that you want to
        </Text>
        <Text
          style={{
            lineHeight: 25,
            fontWeight: "900",
            margin: 20,
          }}
        >
          THIS APP DOES NOT USE ANY OF YOUR DEVICE'S INFORMATION. THIS APP IS
          LINKED TO THE SEVER
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <SocialIcon
          type="instagram"
          light
          onPress={() => {
            Linking.openURL("https://www.instagram.com/u_sai00_");
          }}
          style={{
            flex: 1,
          }}
        />
        <SocialIcon
          type="facebook"
          light
          onPress={() => {
            Linking.openURL("https://www.facebook.com/sainath.raou");
          }}
          style={{
            flex: 1,
          }}
        />
        <SocialIcon
          type="github"
          light
          onPress={() => {
            Linking.openURL("https://www.github.com/usai729");
          }}
          style={{
            flex: 1,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight + (10 * StatusBar.currentHeight) / 100,
  },
});
