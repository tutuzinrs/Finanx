import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CircleArrowUp, CircleArrowDown, User } from "lucide-react-native";
import { useAuth } from "../contexts/auth";
import { useNavigation } from "@react-navigation/native";

interface BalanceCardProps {
  balance: number;
  income: number;
  expense: number;
}

export default function BalanceCard({
  balance,
  income,
  expense,
}: BalanceCardProps) {
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, bem-vindo!</Text>
          <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
        </View>
        <TouchableOpacity
          style={styles.userIconButton}
          onPress={() => navigation.navigate("Profile" as never)}
        >
          <User color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.label}>Saldo Total</Text>
        <Text style={styles.balance}>
          R${" "}
          {balance.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <View style={[styles.iconCircle, { backgroundColor: "#a2dbba" }]}>
            <CircleArrowUp color="#25b05f" size={28} />
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryLabel}>Receitas</Text>
            <Text style={styles.summaryValuePositive}>
              R$ {income.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={[styles.iconCircle, { backgroundColor: "#FFEBEE" }]}>
            <CircleArrowDown color="#EF5350" size={28} />
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryLabel}>Despesas</Text>
            <Text style={styles.summaryValueNegative}>
              R$ {expense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25b15f",
    borderRadius: 20,
    padding: 24,
    bottom: 20,
    height: "40%",
    marginBottom: 10,
    width: "100%",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    opacity: 0.9,
    marginBottom: 10,
    marginLeft: 20,
    top: 16,
  },
  balance: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
    marginBottom: 22,
    marginLeft: 20,
    top: 6,
  },
  summaryContainer: {
    flexDirection: "row",
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    top: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  iconText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: "#666",
    marginBottom: 2,
  },
  summaryValueNegative: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#f22428",
  },
  summaryValuePositive: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#25b05f",
  },
  greeting: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#ffffffff",
    top: 6,
  },
  userName: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#ffffffff",
    marginTop: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    top: 16,
    marginLeft: 4,
  },
  userIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  balanceContainer: {
    backgroundColor: "#57bd81",
    alignItems: "flex-start",
    marginBottom: 8,
    top: 12,
    borderRadius: 12,
    height: "45%",
  },
});
