import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import useAppFonts from "../components/expoFonts";

function loginScreen({ navigation }) {
  const fontsLoaded = useAppFonts();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Login successful:", userCredential.user);
        navigation.navigate("home");
      })
      .catch((error) => {
        console.error("Login failed:", error.code, error.message);
        alert(
          "Erro ao fazer login! Verifique suas credenciais e tente novamente.",
        );
      });
  }

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}
    >
      <StatusBar style="dark" />

      <Image
        source={require("../assets/images/earth.png")}
        style={styles.heroImage}
        resizeMode="contain"
      />

      <View style={styles.titleBlock}>
        <Text style={styles.title}>CONHECA</Text>
        <Text style={styles.title}>O MUNDO</Text>
        <Text style={styles.subtitle}>Explore. Descubra. Viaje.</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputWrap}>
          <MaterialIcons
            name="email"
            size={20}
            color="#697386"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#6B7280"
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrap}>
          <Fontisto
            name="locked"
            size={18}
            color="#697386"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#6B7280"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#697386"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.primaryButton}
        activeOpacity={0.85}
      >
        <Text style={styles.primaryButtonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Ainda nao tem conta?{" "}
        <Text
          onPress={() => navigation.navigate("signUp")}
          style={styles.footerLink}
        >
          Cadastre-se
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 38,
    backgroundColor: "#EDF8FF",
  },
  heroImage: {
    width: "100%",
    maxWidth: 360,
    height: 250,
    marginBottom: 8,
  },
  titleBlock: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    color: "#09275B",
    fontFamily: "BebasNeueRegular",
    fontSize: 43,
    lineHeight: 43,
  },
  subtitle: {
    color: "#1F2937",
    fontFamily: "PoppinsMedium",
    fontSize: 15,
    marginTop: 6,
  },
  form: {
    width: "100%",
    gap: 14,
  },
  inputWrap: {
    position: "relative",
    width: "100%",
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    top: 18,
    zIndex: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 18,
  },
  input: {
    height: 58,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE6F2",
    backgroundColor: "#FFFFFF",
    paddingLeft: 48,
    paddingRight: 44,
    color: "#111827",
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  primaryButton: {
    width: "100%",
    height: 58,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#075FDE",
    marginTop: 20,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
  },
  footerText: {
    color: "#111827",
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    marginTop: 24,
  },
  footerLink: {
    color: "#075FDE",
    fontFamily: "PoppinsSemiBold",
  },
});

export default loginScreen;
