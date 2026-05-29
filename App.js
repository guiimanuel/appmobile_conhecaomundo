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
import changePhotoScreen from "./src/screens/changePhotoScreen";
import countryScreen from "./src/screens/countryScreen";
import favoriteScreen from "./src/screens/favoriteScreen";
import homeScreen from "./src/screens/homeScreen";
import loginScreen from "./src/screens/loginScreen";
import profileScreen from "./src/screens/profileScreen";
import signUpScreen from "./src/screens/signUpScreen";
import profileEditScreen from "./src/screens/profileEditScreen";
import passwordEditScreen from "./src/screens/passwordEditScreen";

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
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={loginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signUp"
          component={signUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={homeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="country"
          component={countryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="favorite"
          component={favoriteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          component={profileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="changePhoto"
          component={changePhotoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profileEdit"
          component={profileEditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="passwordEdit"
          component={passwordEditScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;