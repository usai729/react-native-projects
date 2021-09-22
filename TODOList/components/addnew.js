import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";

export default function AddNew() {
  const [fact, setFact] = React.useState("");
  const [imgURL, setImgURL] = React.useState("");
  const [factTitle, setFactTitle] = React.useState("");

  const [isImp, setIsImp] = React.useState(false);
  const [todoTitle, setTodoTitle] = React.useState("");
  const [todoDesc, setTodoDesc] = React.useState("");

  const [activity, setActivity] = React.useState(false);

  const url = "";

  const randomFact = () => {
    fetch(
      "",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setFact(result.explanation);
        setImgURL(result.url);
        setFactTitle(result.title);
      });
  };

  React.useEffect(randomFact);

  const addTodo = () => {
    setActivity(true);
    if (todoTitle.trim() && todoDesc.trim()) {
      fetch(url + "/insert.php", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          isImp: isImp ? isImp : 0,
          title: todoTitle,
          desc: todoDesc,
        }),
      })
        .then((response) => {
          return response.text();
        })
        .then((res) => {
          if (res == "added") {
            setTodoDesc("");
            setTodoTitle("");
            setIsImp(false);
          } else {
            console.log(res);
          }
          setActivity(false);
        });
    } else {
      setActivity(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={todoTitle}
        style={styles.input1}
        placeholder="To-Do Title"
        onChangeText={(val) => setTodoTitle(val)}
      />
      <TextInput
        value={todoDesc}
        style={[styles.input1, { marginTop: 7, textAlignVertical: "top" }]}
        placeholder="To-Do Description"
        onChangeText={(val) => setTodoDesc(val)}
        multiline={true}
        numberOfLines={7}
      />
      <View
        style={{
          marginTop: 13,
        }}
      >
        <Icon
          name={isImp ? "star" : "star-outline"}
          onPress={() => setIsImp((prevBool) => !prevBool)}
          style={{
            fontSize: 15,
          }}
          color="#ffdf00"
        />
        <TouchableHighlight
          style={[
            styles.button,
            { backgroundColor: activity ? "gray" : "purple" },
          ]}
          onPress={addTodo}
          disabled={activity}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Add To-Do</Text>
        </TouchableHighlight>
      </View>
      <ActivityIndicator
        animating={activity}
        size="large"
        color="purple"
        style={{ display: activity ? "flex" : "none" }}
      />
      <ScrollView style={{ margin: 15 }}>
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {factTitle}
        </Text>
        <Text style={{ lineHeight: 25 }}>{fact}</Text>
        <Image
          source={{ uri: imgURL == "" ? "none.jpg" : imgURL }}
          style={{
            width:
              Dimensions.get("window").width -
              (8 * Dimensions.get("window").width) / 100,
            height:
              Dimensions.get("window").width -
              (8 * Dimensions.get("window").width) / 100,
          }}
        />
        <Text
          style={{
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          By NASA
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight + (10 * StatusBar.currentHeight) / 100,
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
