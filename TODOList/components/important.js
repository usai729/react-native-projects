import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Touchable,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

const url = "";

export default function Imp() {
  const [data, setData] = React.useState([]);
  //const [dataSimp, setDataSimp] = React.useState();
  const [state, setState] = React.useState(false);

  const getData = () => {
    setState(true);
    fetch(url + "/fimp.php", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.length > 0) {
          setData(res);
        }
        setState(false);
      });
  };

  React.useEffect(getData, []);

  const RenderItem = data.map((item) => {
    const star = <Icon name="star" color="#ffdf00" />;

    return (
      <View
        style={{
          margin: 15,
          borderRadius: 2,
          borderWidth: 0.1,
          borderColor: "F8F8F8",
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
        <Text
          style={{
            fontSize: 10,
            fontWeight: "bold",
            color: "gray",
            marginTop: 5,
          }}
        >
          {item.date}
        </Text>
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
          Your Important To-Dos
        </Text>
        <Icon name="star" color="#ffdf00" />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: StatusBar.currentHeight + 5,
  },
});
