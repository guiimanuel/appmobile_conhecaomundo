import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { countryScreen } from "./src/screens";
import { favoriteScreen } from "./src/screens";
import { homeScreen } from "./src/screens";
import { loginScreen } from "./src/screens";
import { profileScreen } from "./src/screens";
import { registerScreen } from "./src/screens";

const Stack = createNativeStackNavigator();

function App(){

  const firebaseConfig = {
  apiKey: "AIzaSyB3An3l78MG0i3HoXGnukMFiniIlIBBM6g",
  authDomain: "conhecaomundo-d50be.firebaseapp.com",
  projectId: "conhecaomundo-d50be",
  storageBucket: "conhecaomundo-d50be.firebasestorage.app",
  messagingSenderId: "609596898124",
  appId: "1:609596898124:web:8e84412e9c37ed9ca8ede9",
  measurementId: "G-D56503L8T0"
};

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Register" component={registerScreen} />
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="Country" component={countryScreen} />
        <Stack.Screen name="Favorite" component={favoriteScreen} />
        <Stack.Screen name="Profile" component={profileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}