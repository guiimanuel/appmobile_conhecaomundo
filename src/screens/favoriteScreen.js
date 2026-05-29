import * as React from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import bottomTabs from "../components/bottomTabs";
import screenHeader from "../components/screenHeader";
import useAppFonts from "../components/expoFonts";
import favoriteService from "../utils/favoriteService";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function favoriteScreen({ navigation, useFocusEffect }) {
  const fontsLoaded = useAppFonts();
  const [favorite, setFavorite] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setFavorite([]);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadFavorite();
    });

    return unsubscribe;
  }, [navigation]);

  async function loadFavorite() {
    setLoading(true);
    const resultado = await favoriteService.getFavorite();
    if (resultado.success) {
      const favoriteSorted = resultado.data.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      setFavorite(favoriteSorted);
    }
    setLoading(false);
  }

  if (!fontsLoaded) {
    return <View style={styles.screen} />;
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {screenHeader({
        title: "Meus Favoritos",
        leftIcon: "arrow-back",
        onLeftPress: () => navigation.goBack()
      })}

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.list}
      >
        {loading ? (
          <View style={styles.stateBox}>
            <ActivityIndicator size="small" color="#075FDE" />
            <Text selectable style={styles.stateText}>
              Carregando favoritos...
            </Text>
          </View>
        ) : favorite.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={38} color="#6B7280" />
            <Text selectable style={styles.emptyTitle}>
              Nenhum favorito ainda
            </Text>
            <Text selectable style={styles.emptyText}>
              Adicione países aos favoritos para vê-los aqui.
            </Text>
          </View>
        ) : (
          favorite.map((country) => (
            <TouchableOpacity
              key={country.id}
              activeOpacity={0.78}
              onPress={() => navigation.navigate("country", { country })}
              style={styles.countryCard}
            >
              <Image
                source={{ uri: country.flag }}
                style={styles.flag}
                resizeMode="cover"
              />
              <View style={styles.countryText}>
                <Text style={styles.countryName}>{country.name}</Text>
                <Text style={styles.countryCapital}>
                  Capital: {country.capital}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={21} color="#1F2937" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {bottomTabs({
        active: "favorite",
        navigation: navigation
      })}
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
    gap: 10,
  },
  stateBox: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  stateText: {
    color: "#4B5563",
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    textAlign: "center",
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
  countryCard: {
    minHeight: 72,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5ECF5",
    backgroundColor: "#FFFFFF",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flag: {
    width: 58,
    height: 46,
    borderRadius: 6,
    backgroundColor: "#EEF2F7",
  },
  countryText: {
    flex: 1,
    gap: 2,
  },
  countryName: {
    color: "#111827",
    fontFamily: "PoppinsBold",
    fontSize: 15,
  },
  countryCapital: {
    color: "#4B5563",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
});

export default favoriteScreen;
