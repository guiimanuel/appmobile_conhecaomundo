import * as React from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomTabs from "../components/BottomTabs";
import ScreenHeader from "../components/ScreenHeader";
import useAppFonts from "../components/ExpoFonts";

const profileImage =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80";

function ProfileScreen({ navigation }) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <View style={styles.screen} />;
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScreenHeader title="Meu Perfil" rightIcon="create-outline" />

      <View style={styles.content}>
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: profileImage }}
            style={styles.avatar}
            resizeMode="cover"
          />
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate("ChangePhoto")}
            style={styles.cameraBadge}
          >
            <Ionicons name="camera" size={19} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>Joao da Silva</Text>
        <Text style={styles.email}>joao@email.com</Text>

        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Favoritos</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Paises visitados</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Resenhas</Text>
            <Text style={styles.statValue}>8</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <MenuRow icon="edit" label="Editar Perfil" />
          <MenuRow
            icon="photo-camera"
            label="Alterar Foto"
            onPress={() => navigation.navigate("ChangePhoto")}
          />
          <MenuRow icon="lock" label="Alterar Senha" />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.logout}
          onPress={() => navigation.navigate("Login")}
        >
          <MaterialIcons name="logout" size={21} color="#FF2B2B" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <BottomTabs active="Profile" navigation={navigation} />
    </View>
  );
}

function MenuRow({ icon, label, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.menuRow}
    >
      <MaterialIcons name={icon} size={21} color="#6B7280" />
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    alignItems: "center",
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#EEF2F7",
  },
  cameraBadge: {
    position: "absolute",
    right: -3,
    bottom: 6,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#075FDE",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: "#111827",
    fontFamily: "PoppinsBold",
    fontSize: 19,
    marginTop: 12,
  },
  email: {
    color: "#4B5563",
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    marginTop: 1,
  },
  stats: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
    marginTop: 20,
  },
  statBox: {
    flex: 1,
    minHeight: 72,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5ECF5",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  statLabel: {
    color: "#111827",
    fontFamily: "PoppinsRegular",
    fontSize: 11,
    textAlign: "center",
  },
  statValue: {
    color: "#111827",
    fontFamily: "PoppinsBold",
    fontSize: 18,
    fontVariant: ["tabular-nums"],
  },
  menu: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5ECF5",
    marginTop: 18,
    overflow: "hidden",
  },
  menuRow: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    borderBottomColor: "#E5ECF5",
    borderBottomWidth: 1,
  },
  menuLabel: {
    color: "#111827",
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  logout: {
    width: "100%",
    height: 58,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5ECF5",
    marginTop: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  logoutText: {
    color: "#FF2B2B",
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
  },
});

export default ProfileScreen;
