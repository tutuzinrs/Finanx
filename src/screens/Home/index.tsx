import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../contexts/auth";
import { useTransactions } from "../../contexts/transactions";
import BalanceCard from "../../components/BalanceCard";
import WeeklyChart from "../../components/WeeklyChart";
import TransactionItem from "../../components/TransactionItem";
import BottomNav from "../../components/BottomNav";
import CustomStatusBar from "../../components/CustomStatusBar";

export default function Home() {
  const { user, signOut } = useAuth();
  const { transactions, balance, income, outcome, loading } = useTransactions();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("✅ Logout realizado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao fazer logout:", error);
    }
  };

  // Sample data for demonstration
  const weeklyData = [
    { day: "Dom", amount: -120 },
    { day: "Seg", amount: -250 },
    { day: "Ter", amount: -180 },
    { day: "Qua", amount: -300 },
    { day: "Qui", amount: -90 },
    { day: "Sex", amount: -200 },
    { day: "Sáb", amount: 150 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomStatusBar />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Balance Card */}
          <BalanceCard balance={balance} income={income} expense={outcome} />

          {/* Weekly Chart */}
          <WeeklyChart data={weeklyData} />

          {/* Recent Transactions */}
          <View style={styles.transactionsSection}>
            <View style={styles.transactionsHeader}>
              <Text style={styles.sectionTitle}>Transações Recentes</Text>
              <Text style={styles.seeAll}>Ver todas</Text>
            </View>

            {transactions.slice(0, 5).map((transaction) => (
              <TransactionItem
                key={transaction.id}
                name={transaction.description}
                date={new Date(transaction.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                amount={
                  transaction.type === "income"
                    ? transaction.amount
                    : -transaction.amount
                }
                icon={
                  transaction.category?.icon ||
                  (transaction.type === "income" ? "💰" : "💸")
                }
                iconBgColor={
                  transaction.category?.color ||
                  (transaction.type === "income" ? "#E8F5E9" : "#FFEBEE")
                }
              />
            ))}
          </View>

          {/* Bottom spacing for navigation */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  userName: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#000",
    marginTop: 2,
  },
  notificationBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  notificationIcon: {
    fontSize: 20,
  },
  transactionsSection: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 20,
    paddingVertical: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
  },
  seeAll: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    color: "#000",
  },
  bottomSpacing: {
    height: 20,
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
});
