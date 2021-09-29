import React from "react";
import { render } from "react-dom";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import App from "../App";

export default function Home({ navigation }) {
  const [data, setData] = React.useState([]);
  //const [dataSimp, setDataSimp] = React.useState();
  const [state, setState] = React.useState(false);

  const getData = () => {
    setState(true);
    fetch("url/fetch.php", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setState(false);
        setData(res);
      });
  };

  React.useEffect(getData, []);
  var star = <Icon name="star" color="#ffdf00" />;
  var book = <Icon name="book" />;

  const RenderItem = data.map((item) => {
    return (
      <View
        style={{
          margin: 15,
          borderRadius: 2,
          borderWidth: 0.1,
          padding: 12,
          width:
            Dimensions.get("window").width -
            (8 * Dimensions.get("window").width) / 100,
        }}
        key={item.id}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 8 }}>
          {item.title} {item.important == 1 ? star : ""}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
          {item.desc}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "bold",
              color: "gray",
              marginTop: 5,
              flex: 1,
            }}
          >
            {item.date}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableHighlight
            key={item.id}
            onPress={() => {
              setState(true);
              fetch("url/delete.php", {
                mode: "cors",
                method: "POST",
                body: JSON.stringify({ itemID: item.id }),
              })
                .then((response) => {
                  return response.text();
                })
                .then((result) => {
                  if (result == "done") {
                    getData();
                  } else {
                    ToastAndroid.showWithGravity(
                      "Couldn't delete todo!",
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER
                    );
                  }
                  setState(false);
                });
            }}
            style={{
              flex: 1,
              alignItems: "center",
              borderColor: "#C70000",
              borderWidth: 1,
              borderRadius: 3,
              padding: 3,
              margin: 4,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "#C70000",
              }}
            >
              DELETE
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Edit To-Do", {
                itemID: item.id,
                itemTitle: item.title,
                itemDesc: item.desc,
              });
            }}
            style={{
              flex: 1,
              alignItems: "center",
              borderColor: "green",
              borderRadius: 3,
              borderWidth: 1,
              padding: 3,
              margin: 4,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "green",
              }}
            >
              EDIT
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="small"
        color="purple"
        animating={state}
        style={{ marginTop: 5, display: state ? "flex" : "none" }}
      />
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 19 }}>
          Your To-Dos {book}
        </Text>
        <TouchableHighlight onPress={getData} style={{ marginLeft: 10 }}>
          <Icon name="refresh" />
        </TouchableHighlight>
      </View>
      <ScrollView>{RenderItem}</ScrollView>
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
  },
});
