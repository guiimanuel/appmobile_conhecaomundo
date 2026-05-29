import * as React from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import screenHeader from "../components/screenHeader";
import useExpoFonts from "../components/expoFonts";
import { useState, useEffect } from "react";
import favoriteService from "../utils/favoriteService";

const detailRows = [
  { key: "capital", label: "Capital", icon: "location-sharp" },
  { key: "population", label: "Populacao", icon: "people" },
  { key: "language", label: "Idioma", icon: "book" },
  { key: "currency", label: "Moeda", icon: "cash" },
  { key: "region", label: "Regiao", icon: "ribbon" },
  { key: "subregion", label: "Sub-regiao", icon: "globe" },
  { key: "continent", label: "Continente", icon: "earth" },
  { key: "timezone", label: "Fuso horario", icon: "time" },
];

function countryScreen({ navigation, route }) {
  const fontsLoaded = useExpoFonts();
  const country = route.params?.country;
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (country) {
      checkIfFavoriteAsync();
    }
  }, [country]);

  async function checkIfFavoriteAsync() {
    const result = await favoriteService.checkIfFavorite(country.id);
    setIsFavorite(result);
  }

  async function handleToggleFavorite() {
    setLoading(true);
    let result;

    if (isFavorite) {
      result = await favoriteService.removeFavorite(country.id);
    } else {
      result = await favoriteService.addFavorite(country);
    }

    setLoading(false);

    if (result.success) {
      setIsFavorite(!isFavorite);
      alert(result.message);
    } else {
      alert(result.message);
    }
  }

  if (!fontsLoaded) {
    return <View style={styles.screen} />;
  }

  if (!country) {
    return (
      <View style={styles.screen}>
        <StatusBar style="light" />
        {screenHeader({
          title: "Detalhes do Pais",
          leftIcon: "arrow-back",
          onLeftPress: () => navigation.goBack()
        })}
        <View style={styles.emptyState}>
          <Ionicons name="alert-circle-outline" size={30} color="#6B7280" />
          <Text selectable style={styles.emptyText}>
            Selecione um pais na lista para ver os detalhes.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {screenHeader({
        title: "Detalhes do Pais",
        leftIcon: "arrow-back",
        rightIcon: "heart-outline",
        onLeftPress: () => navigation.goBack()
      })}

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <View>
          <View style={styles.hero}>
            <Ionicons name="earth" size={74} color="#FFFFFF" />
          </View>
          {country.flag ? (
            <Image
              source={{ uri: country.flag }}
              style={styles.flag}
              resizeMode="cover"
            />
          ) : null}
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{country.name}</Text>
          <Text style={styles.official}>{country.officialName}</Text>

          <View style={styles.rows}>
            {detailRows.map((row) => (
              <View key={row.key} style={styles.row}>
                <Ionicons name={row.icon} size={18} color="#6B7280" />
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text style={styles.rowValue}>{country[row.key]}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.favoriteButton,
              isFavorite && styles.favoriteButtonActive,
            ]}
            onPress={handleToggleFavorite}
            disabled={loading}
          >
            <MaterialCommunityIcons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingBottom: 26,
  },
  hero: {
    width: "100%",
    height: 188,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B67DE",
  },
  flag: {
    position: "absolute",
    left: 22,
    bottom: -28,
    width: 72,
    height: 52,
    borderRadius: 8,
    backgroundColor: "#EEF2F7",
  },
  info: {
    paddingHorizontal: 22,
    paddingTop: 44,
  },
  name: {
    color: "#111827",
    fontFamily: "PoppinsBold",
    fontSize: 28,
  },
  official: {
    color: "#6B7280",
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    marginTop: 2,
  },
  rows: {
    marginTop: 22,
    gap: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowLabel: {
    flex: 1,
    color: "#111827",
    fontFamily: "PoppinsMedium",
    fontSize: 14,
  },
  rowValue: {
    color: "#111827",
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    textAlign: "right",
  },
  favoriteButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#075FDE",
    marginTop: 26,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  favoriteButtonActive: {
    backgroundColor: "#FF2B2B",
  },
  favoriteButtonText: {
    color: "#FFFFFF",
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 10,
  },
  emptyText: {
    color: "#4B5563",
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    textAlign: "center",
  },
});

export default countryScreen;
