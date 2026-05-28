import * as React from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import APICountries from "../api/APICountries";
import BottomTabs from "../components/BottomTabs";
import ScreenHeader from "../components/ScreenHeader";
import useAppFonts from "../components/ExpoFonts";

function HomeScreen({ navigation }) {
  const fontsLoaded = useAppFonts();
  const [countries, setCountries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    async function loadCountries() {
      try {
        const response = await APICountries.get(
          "all?fields=name,capital,flags,population,languages,currencies,region,subregion,continents,timezones",
        );

        if (isMounted) {
          const normalizedCountries = response.data
            .map(normalizeCountry)
            .sort((a, b) => a.name.localeCompare(b.name));
          setCountries(normalizedCountries);
          setError("");
        }
      } catch (requestError) {
        console.error("Erro ao buscar paises:", requestError);
        if (isMounted) {
          setError("Nao foi possivel carregar os paises.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCountries();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (!fontsLoaded) {
    return <View style={styles.screen} />;
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScreenHeader
        title="Paises"
        rightIcon="notifications-outline"
      />

      <View style={styles.searchShell}>
        <Ionicons name="search" size={19} color="#64748B" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Pesquisar pais..."
          placeholderTextColor="#6B7280"
          style={styles.searchInput}
        />
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.list}
      >
        {loading ? (
          <View style={styles.stateBox}>
            <ActivityIndicator size="small" color="#075FDE" />
            <Text selectable style={styles.stateText}>
              Carregando paises...
            </Text>
          </View>
        ) : null}

        {!loading && error ? (
          <View style={styles.stateBox}>
            <Ionicons name="cloud-offline-outline" size={28} color="#6B7280" />
            <Text selectable style={styles.stateText}>
              {error}
            </Text>
          </View>
        ) : null}

        {!loading && !error && filteredCountries.length === 0 ? (
          <View style={styles.stateBox}>
            <Ionicons name="search" size={28} color="#6B7280" />
            <Text selectable style={styles.stateText}>
              Nenhum pais encontrado.
            </Text>
          </View>
        ) : null}

        {!loading && !error
          ? filteredCountries.map((country) => (
              <TouchableOpacity
                key={country.id}
                activeOpacity={0.78}
                onPress={() => navigation.navigate("Country", { country })}
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
          : null}
      </ScrollView>

      <BottomTabs active="Home" navigation={navigation} />
    </View>
  );
}

function normalizeCountry(country) {
  const languageValues = country.languages
    ? Object.values(country.languages)
    : [];
  const currencyValues = country.currencies
    ? Object.values(country.currencies)
    : [];

  return {
    id: country.name?.common || country.name?.official,
    name: country.name?.common || "Pais",
    officialName: country.name?.official || "Nome oficial indisponivel",
    capital: country.capital?.[0] || "Sem capital",
    population: country.population?.toLocaleString("pt-BR") || "Indisponivel",
    language: languageValues.join(", ") || "Indisponivel",
    currency:
      currencyValues.map((currency) => currency.name).join(", ") ||
      "Indisponivel",
    region: country.region || "Indisponivel",
    subregion: country.subregion || "Indisponivel",
    continent: country.continents?.[0] || "Indisponivel",
    timezone: country.timezones?.[0] || "Indisponivel",
    flag: country.flags?.png || country.flags?.svg,
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7FAFF",
    width: "100%",
  },
  searchShell: {
    marginTop: -2,
    marginHorizontal: 18,
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    flex: 1,
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  list: {
    padding: 14,
    paddingBottom: 22,
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

export default HomeScreen;
