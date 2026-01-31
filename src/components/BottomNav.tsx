import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CirclePlus } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  House,
  ChartPie,
  ChartColumnStacked,
  Landmark,
} from "lucide-react-native";

export default function BottomNav() {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName: string) => route.name === routeName;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem}>
        <House color={isActive("Home") ? "#00A86B" : "#999"} size={24} />
        <Text style={isActive("Home") ? styles.labelActive : styles.label}>
          Início
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Landmark
          color={isActive("Transactions") ? "#00A86B" : "#999"}
          size={24}
        />
        <Text
          style={isActive("Transactions") ? styles.labelActive : styles.label}
        >
          Transações
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fabContainer}
        onPress={() => navigation.navigate("AddTransaction" as never)}
      >
        <View style={styles.fab}>
          <CirclePlus color="#FFFFFF" size={38} />
        </View>
        <Text
          style={{
            top: 8,
            color: "#999",
            fontFamily: "Poppins_400Regular",
            fontSize: 11,
          }}
        >
          Adicionar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <ChartColumnStacked
          color={isActive("Categories") ? "#00A86B" : "#999"}
          size={24}
        />
        <Text
          style={isActive("Categories") ? styles.labelActive : styles.label}
        >
          Categoria
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <ChartPie color={isActive("Reports") ? "#00A86B" : "#999"} size={24} />
        <Text style={isActive("Reports") ? styles.labelActive : styles.label}>
          Relatórios
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    bottom: 1,
    marginRight: 6,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  iconActive: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: "#999",
    top: 4,
  },
  labelActive: {
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
    color: "#00A86B",
    top: 4,
  },
  fabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -70,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 28,
    backgroundColor: "#00A86B",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 32,
    fontFamily: "Poppins_300Light",
    color: "#FFFFFF",
  },
});
