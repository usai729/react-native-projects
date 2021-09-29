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
import Edit from "./components/edit";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const stack_1 = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
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
  );
};

export default function App() {
  const [signedin, setSignedin] = React.useState(true);

  React.useEffect(() => {
    fetch("url/state.php", {
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
      <Stack.Navigator>
        <Stack.Screen
          name="tabs1"
          component={stack_1}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Edit To-Do" component={Edit} />
      </Stack.Navigator>
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
