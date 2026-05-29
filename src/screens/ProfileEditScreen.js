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
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useExpoFonts from "../components/expoFonts";
import ScreenHeader from "../components/screenHeader";

function profileEditScreen({ navigation }) {
  const fontsLoaded = useExpoFonts();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || "");
        setEmail(user.email || "");
      }
    });
    return unsubscribe;
  }, []);

  if (!fontsLoaded) {
    return <View style={styles.screen} />;
  }

  function handleSave() {
    if (!name.trim()) {
      alert("Por favor, digite um nome.");
      return;
    }

    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      updateProfile(user, { displayName: name.trim() })
        .then(() => {
          console.log("Perfil atualizado com sucesso");
          alert("Perfil atualizado com sucesso!");
          navigation.navigate("profile");
        })
        .catch((error) => {
          console.error("Erro ao atualizar perfil:", error);
          alert("Erro ao atualizar perfil. Tente novamente.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
        <Text style={styles.title}>Editar Perfil</Text>
        <Text style={styles.subtitle}>Atualize suas informações pessoais</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <View style={styles.inputWrap}>
            <Ionicons
              name="person"
              size={20}
              color="#697386"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#6B7280"
              style={styles.input}
              editable={!loading}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputWrap}>
            <MaterialIcons
              name="email"
              size={20}
              color="#697386"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Seu e-mail"
              value={email}
              placeholderTextColor="#6B7280"
              style={[styles.input, styles.disabledInput]}
              editable={false}
            />
          </View>
          <Text style={styles.helperText}>E-mail não pode ser alterado</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSave}
        style={[styles.saveButton, loading && styles.saveButtonDisabled]}
        activeOpacity={0.85}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.cancelButton}
        activeOpacity={0.85}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
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
    gap: 20,
    marginBottom: 28,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    color: "#111827",
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
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
  input: {
    height: 58,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE6F2",
    backgroundColor: "#FFFFFF",
    paddingLeft: 48,
    paddingRight: 16,
    color: "#111827",
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  disabledInput: {
    backgroundColor: "#F3F4F6",
    color: "#9CA3AF",
  },
  helperText: {
    color: "#9CA3AF",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    marginTop: 4,
  },
  saveButton: {
    width: "100%",
    height: 58,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#075FDE",
    marginBottom: 12,
  },
  saveButtonDisabled: {
    backgroundColor: "#9CA3AF",
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
  },
  cancelButton: {
    width: "100%",
    height: 58,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE6F2",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  cancelButtonText: {
    color: "#111827",
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
  },
});

export default profileEditScreen;
