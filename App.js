import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./components/SplashScreen"; 
import LoginScreen from "./components/LoginScreen"; 
import SignUpScreen from "./components/SignUpScreen";
import UploadPhotoScreen from "./components/UploadPhotoScreen"; 
import LoadingScreen from "./components/LoadingScreen"; 
import DetectedItemsScreen from "./components/DetectedItemsScreen"; 
import ShoppingListScreen from "./components/ShoppingListScreen"; 

const Stack = createStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="DetectedItems" component={DetectedItemsScreen} />
        <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
