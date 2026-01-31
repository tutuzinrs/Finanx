import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/contexts/auth";
import { TransactionsProvider } from "./src/contexts/transactions";
import { CategoriesProvider } from "./src/contexts/categories";
import Routes from "./src/routes";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { ActivityIndicator, View } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#25b15f" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <CategoriesProvider>
        <TransactionsProvider>
          <Routes />
          <StatusBar style="dark" translucent backgroundColor="transparent" />
        </TransactionsProvider>
      </CategoriesProvider>
    </AuthProvider>
  );
}
