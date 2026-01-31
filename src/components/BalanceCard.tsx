import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CircleArrowUp, CircleArrowDown } from "lucide-react-native";
import { useAuth } from "../contexts/auth";

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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, bem-vindo!</Text>
        <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
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
    height: "23%",
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
    top: 10,
  },
  balance: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
    marginBottom: 22,
    marginLeft: 20,
    bottom: 2,
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
  },
  userName: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#ffffffff",
    marginTop: 2,
  },
  header: {
    alignItems: "flex-start",
    marginBottom: 10,
    top: 8,
  },
  balanceContainer: {
    backgroundColor: "#57bd81",
    alignItems: "flex-start",
    marginBottom: 8,
    top: 10,
    borderRadius: 12,
    height: "45%",
  },
});
