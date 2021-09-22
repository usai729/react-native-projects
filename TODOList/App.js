import React from "react";
import { Dimensions } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements/dist/icons/Icon";

import Home from "./components/home";
import AddNew from "./components/addnew";
import Info from "./components/info";
import Imp from "./components/important";
import LogIn from "./components/login";
import SignUp from "./components/signup";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [signedin, setSignedin] = React.useState();

  React.useEffect(() => {
    fetch("https://185e-49-205-120-158.ngrok.io/state.php", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.state == "set") {
          setSignedin(true);
        } else {
          setSignedin(false);
        }
      });
  }, []);

  return signedin ? (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FFF",
          tabBarStyle: {
            borderWidth: 0,
            margin:
              Dimensions.get("window").width -
              (97.5 * Dimensions.get("window").width) / 100,
            borderRadius: 20,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => {
              return <Icon name="home" />;
            },
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="New"
          component={AddNew}
          options={{
            tabBarIcon: () => {
              return <Icon name="create" />;
            },
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Imp"
          component={Imp}
          options={{
            tabBarIcon: () => {
              return <Icon name="star" />;
            },
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Info"
          component={Info}
          options={{
            tabBarIcon: () => {
              return <Icon name="info" />;
            },
            tabBarShowLabel: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="login"
          component={LogIn}
          initialParams={{ setSignedin }}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          initialParams={{ setSignedin }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
