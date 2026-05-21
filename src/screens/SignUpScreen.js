import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import useAppFonts from "../components/ExpoFonts";

function SignUpScreen({ navigation }) {
  const fontsLoaded = useAppFonts();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignUp() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: name });
        console.log("Sign-up successful:", user.uid, user.displayName);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("Sign-up failed:", error.code, error.message);
        console.log(error.code, error.message);
        alert(
          "Erro ao criar conta! Verifique suas informacoes e tente novamente.",
        );
      });

    if (password !== confirmPassword) {
      alert("As senhas precisam ser iguais.");
      return;
    }
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <FontAwesome5 name="arrow-left" size={20} color="#111827" />
      </TouchableOpacity>

      <View style={styles.heading}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputWrap}>
          <Ionicons
            name="person"
            size={20}
            color="#697386"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#6B7280"
            style={styles.input}
          />
        </View>

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
            secureTextEntry
            placeholderTextColor="#6B7280"
            style={styles.input}
          />
          <Ionicons
            name="eye"
            size={20}
            color="#697386"
            style={styles.eyeIcon}
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
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#6B7280"
            style={styles.input}
          />
          <Ionicons
            name="eye"
            size={20}
            color="#697386"
            style={styles.eyeIcon}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSignUp}
        style={styles.primaryButton}
        activeOpacity={0.85}
      >
        <Text style={styles.primaryButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Ja tem conta?{" "}
        <Text
          onPress={() => navigation.navigate("Login")}
          style={styles.footerLink}
        >
          Faca login
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 56,
    paddingBottom: 28,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingRight: 12,
  },
  heading: {
    marginTop: 36,
    marginBottom: 28,
    gap: 6,
  },
  title: {
    color: "#111827",
    fontFamily: "PoppinsBold",
    fontSize: 28,
  },
  subtitle: {
    color: "#4B5563",
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  form: {
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
    height: 58,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#075FDE",
    marginTop: 38,
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
    marginTop: 34,
    textAlign: "center",
  },
  footerLink: {
    color: "#075FDE",
    fontFamily: "PoppinsSemiBold",
  },
});

export default SignUpScreen;
