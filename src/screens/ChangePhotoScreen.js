import * as React from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import useAppFonts from "../components/ExpoFonts";

const profileImage =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80";

function ChangePhotoScreen({ navigation }) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <View style={styles.screen} />;
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScreenHeader
        title="Alterar Foto"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: profileImage }}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={23} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.title}>Escolha uma imagem</Text>
        <Text style={styles.subtitle}>
          Sua foto sera enviada para o Cloudinary
        </Text>

        <TouchableOpacity activeOpacity={0.8} style={styles.secondaryButton}>
          <Ionicons name="image" size={22} color="#075FDE" />
          <Text style={styles.secondaryButtonText}>Escolher da Galeria</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} style={styles.primaryButton}>
          <Ionicons name="camera" size={22} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Tirar Foto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 72,
  },
  avatarWrap: {
    position: "relative",
    marginBottom: 54,
  },
  avatar: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: "#EEF2F7",
  },
  cameraBadge: {
    position: "absolute",
    right: -2,
    bottom: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#075FDE",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#111827",
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  subtitle: {
    color: "#6B7280",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 34,
  },
  secondaryButton: {
    width: "100%",
    height: 58,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE6F2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
  },
  secondaryButtonText: {
    color: "#075FDE",
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
  },
  primaryButton: {
    width: "100%",
    height: 58,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#075FDE",
    marginTop: 24,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
  },
});

export default ChangePhotoScreen;
