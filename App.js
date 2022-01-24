import { StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import PendingTask from "./src/screen/PendingTask";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Tab.Navigator>
        <Tab.Screen name="Task List" component={PendingTask} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
