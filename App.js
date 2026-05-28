import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { Platform } from "react-native";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
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

const firebaseConfig = {
  apiKey: "AIzaSyB3An3l78MG0i3HoXGnukMFiniIlIBBM6g",
  authDomain: "conhecaomundo-d50be.firebaseapp.com",
  projectId: "conhecaomundo-d50be",
  storageBucket: "conhecaomundo-d50be.firebasestorage.app",
  messagingSenderId: "609596898124",
  appId: "1:609596898124:web:8e84412e9c37ed9ca8ede9",
  measurementId: "G-D56503L8T0",
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

try {
  initializeFirestore(firebaseApp, {
    experimentalForceLongPolling: true,
  });
} catch (error) {
  if (error.code !== "failed-precondition") {
    throw error;
  }
  getFirestore(firebaseApp);
}

if (Platform.OS === "web" || !getReactNativePersistence) {
  getAuth(firebaseApp);
} else {
  try {
    initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    if (error.code !== "auth/already-initialized") {
      throw error;
    }
    getAuth(firebaseApp);
  }
}

function App() {
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
