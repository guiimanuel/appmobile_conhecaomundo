import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getApps, initializeApp } from "firebase/app";
import ChangePhotoScreen from "./src/screens/ChangePhotoScreen";
import CountryScreen from "./src/screens/CountryScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ProfileEditScreen from "./src/screens/ProfileEditScreen";
import PasswordEditScreen from "./src/screens/PasswordEditScreen";

const Stack = createNativeStackNavigator();

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyB3An3l78MG0i3HoXGnukMFiniIlIBBM6g",
    authDomain: "conhecaomundo-d50be.firebaseapp.com",
    projectId: "conhecaomundo-d50be",
    storageBucket: "conhecaomundo-d50be.firebasestorage.app",
    messagingSenderId: "609596898124",
    appId: "1:609596898124:web:8e84412e9c37ed9ca8ede9",
    measurementId: "G-D56503L8T0",
  };

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Country"
          component={CountryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePhoto"
          component={ChangePhotoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PasswordEdit"
          component={PasswordEditScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
