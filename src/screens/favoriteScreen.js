import * as React from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BottomTabs from "../components/BottomTabs";
import ScreenHeader from "../components/ScreenHeader";
import useAppFonts from "../components/ExpoFonts";

function FavoriteScreen({ navigation }) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <View style={styles.screen} />;
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScreenHeader title="Meus Favoritos" />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.list}
      >
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={38} color="#6B7280" />
          <Text selectable style={styles.emptyTitle}>
            Nenhum favorito ainda
          </Text>
          <Text selectable style={styles.emptyText}>
            Os paises favoritados pela sua API ou persistencia aparecerao aqui.
          </Text>
        </View>
      </ScrollView>

      <BottomTabs active="Favorite" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 22,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    minHeight: 420,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emptyTitle: {
    color: "#111827",
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  emptyText: {
    color: "#4B5563",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    textAlign: "center",
    maxWidth: 260,
  },
});

export default FavoriteScreen;
