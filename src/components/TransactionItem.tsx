import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TransactionItemProps {
  name: string;
  date: string;
  amount: number;
  icon: string;
  iconBgColor: string;
}

export default function TransactionItem({
  name,
  date,
  amount,
  icon,
  iconBgColor,
}: TransactionItemProps) {
  const isPositive = amount >= 0;

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Text
        style={[styles.amount, { color: isPositive ? "#00A86B" : "#EF5350" }]}
      >
        {isPositive ? "+" : "-"} R${" "}
        {Math.abs(amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
    marginBottom: 2,
  },
  date: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#999",
  },
  amount: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
});
