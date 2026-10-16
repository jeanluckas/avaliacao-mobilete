import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      {/* Cada tela pode mexer no próprio cabeçalho */}
      <Stack.Screen options={{ title: "Painel" }} />

      <View style={styles.cabecalho}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.saudacao}>Olá, Companheiro!</Text>
        </View>
      </View>

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Meus Jogos</Text>
        <Link href="/jogos" style={styles.link}>
          Abrir →
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#2c2f35",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#D9DDE3",
  },

  saudacao: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitulo: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 2,
  },

  cartao: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 6,
  },

  cartaoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  detalhe: {
    fontSize: 14,
    color: "#374151",
  },

  link: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2354D6",
    marginTop: 4,
  },
});
