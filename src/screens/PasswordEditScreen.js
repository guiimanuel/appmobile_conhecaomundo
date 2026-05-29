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
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import useAppFonts from "../components/expoFonts";

async function EditPassword(currentPassword, newPassword) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuário não autenticado");
    }
    if (!user.email) {
      throw new Error("Email do usuário não encontrado");
    }
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    return {
      success: true,
      message: "Senha alterada com sucesso!",
    };
  } catch (error) {
    console.log("Erro ao alterar senha:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}

function PasswordEditScreen({ navigation }) {
  const fontsLoaded = useAppFonts();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!fontsLoaded) {
    return <View style={styles.screen} />;
  }

  async function handleSave() {
    if (!currentPassword.trim()) {
      alert("Por favor, digite sua senha atual.");
      return;
    }
    if (!newPassword.trim()) {
      alert("Por favor, digite uma nova senha.");
      return;
    }
    if (newPassword.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    if (currentPassword === newPassword) {
      alert("A nova senha deve ser diferente da senha atual.");
      return;
    }
    setLoading(true);
    const resultado = await EditPassword(currentPassword, newPassword);
    setLoading(false);

    if (resultado.success) {
      alert(resultado.message);
      navigation.goBack();
    } else {
      alert(resultado.message);
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
        <Text style={styles.title}>Alterar Senha</Text>
        <Text style={styles.subtitle}>Defina uma nova senha segura</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Senha Atual</Text>
          <View style={styles.inputWrap}>
            <Fontisto
              name="locked"
              size={18}
              color="#697386"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Digite sua senha atual"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              placeholderTextColor="#6B7280"
              style={styles.input}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showCurrentPassword ? "eye" : "eye-off"}
                size={20}
                color="#697386"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nova Senha</Text>
          <View style={styles.inputWrap}>
            <Fontisto
              name="locked"
              size={18}
              color="#697386"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Digite sua nova senha"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              placeholderTextColor="#6B7280"
              style={styles.input}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showNewPassword ? "eye" : "eye-off"}
                size={20}
                color="#697386"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirmar Nova Senha</Text>
          <View style={styles.inputWrap}>
            <Fontisto
              name="locked"
              size={18}
              color="#697386"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#6B7280"
              style={styles.input}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={20}
                color="#697386"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.requirements}>
          <Text style={styles.requirementsTitle}>Requisitos da senha:</Text>
          <Text style={styles.requirement}>• Mínimo de 6 caracteres</Text>
          <Text style={styles.requirement}>• Diferente da senha atual</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSave}
        style={[styles.saveButton, loading && styles.saveButtonDisabled]}
        activeOpacity={0.85}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? "Alterando..." : "Alterar Senha"}
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
  requirements: {
    backgroundColor: "#F0F9FF",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#075FDE",
    gap: 8,
  },
  requirementsTitle: {
    color: "#111827",
    fontFamily: "PoppinsSemiBold",
    fontSize: 13,
  },
  requirement: {
    color: "#4B5563",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    lineHeight: 18,
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

export default PasswordEditScreen;
