import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      {/* O Stack empilha as telas: abrir uma põe em cima, voltar tira do
          topo. O botão de voltar e a animação vêm de graça. */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#06060a" },
          headerTintColor: "#FFFFFF",
        }}
      />
    </SafeAreaProvider>
  );
}
