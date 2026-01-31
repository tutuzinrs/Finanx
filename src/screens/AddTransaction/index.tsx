import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TrendingUp, TrendingDown, ArrowLeft } from "lucide-react-native";
import { useTransactions } from "../../contexts/transactions";
import { useCategories } from "../../contexts/categories";

export default function AddTransaction() {
  const navigation = useNavigation();
  const { addTransaction, balance, income, outcome } = useTransactions();
  const { categories, loading: loadingCategories } = useCategories();

  const [type, setType] = useState<"income" | "outcome">("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Filtrar categorias pelo tipo selecionado
  const filteredCategories = categories.filter((cat) => cat.type === type);

  // Selecionar primeira categoria automaticamente quando mudar o tipo
  useEffect(() => {
    if (filteredCategories.length > 0) {
      setSelectedCategoryId(filteredCategories[0].id);
    }
  }, [type, categories]);

  const handleAddTransaction = async () => {
    if (!description.trim()) {
      Alert.alert("Erro", "Por favor, insira uma descrição");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Erro", "Por favor, insira um valor válido");
      return;
    }

    if (!selectedCategoryId) {
      Alert.alert("Erro", "Por favor, selecione uma categoria");
      return;
    }

    try {
      await addTransaction({
        description,
        amount: parseFloat(amount),
        type,
        categoryId: selectedCategoryId,
        date: new Date().toISOString(),
      });

      Alert.alert(
        "Sucesso",
        `${type === "income" ? "Receita" : "Despesa"} adicionada com sucesso!`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao adicionar transação");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="#000" size={24} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo atual</Text>
          <Text style={styles.balanceValue}>
            R$ {balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <TrendingUp color="#25b05f" size={20} />
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Receitas</Text>
                <Text style={styles.summaryValuePositive}>
                  R${" "}
                  {income.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <TrendingDown color="#f22428" size={20} />
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Despesas</Text>
                <Text style={styles.summaryValueNegative}>
                  R${" "}
                  {outcome.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* New Transaction Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Nova transação</Text>

          {/* Transaction Type */}
          <Text style={styles.fieldLabel}>Tipo de transação</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "income" && styles.typeButtonActive,
              ]}
              onPress={() => setType("income")}
            >
              <TrendingUp
                color={type === "income" ? "#FFFFFF" : "#25b05f"}
                size={20}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  type === "income" && styles.typeButtonTextActive,
                ]}
              >
                Receita
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "outcome" && styles.typeButtonActiveExpense,
              ]}
              onPress={() => setType("outcome")}
            >
              <TrendingDown
                color={type === "outcome" ? "#FFFFFF" : "#999"}
                size={20}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  type === "outcome" && styles.typeButtonTextActive,
                ]}
              >
                Despesa
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.fieldLabel}>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Conta de luz, Salário..."
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
          />

          {/* Amount */}
          <Text style={styles.fieldLabel}>Valor (R$)</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0,00"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          {/* Add Button */}
          <TouchableOpacity
            style={[
              styles.addButton,
              type === "outcome" && styles.addButtonExpense,
            ]}
            onPress={handleAddTransaction}
          >
            <Text style={styles.addButtonText}>
              + Adicionar {type === "income" ? "Receita" : "Despesa"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  balanceCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    color: "#25b05f",
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 16,
  },
  summaryItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  summaryValuePositive: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color: "#25b05f",
  },
  summaryValueNegative: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color: "#f22428",
  },
  formSection: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#333",
    marginBottom: 8,
    marginTop: 12,
  },
  typeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  typeButtonActive: {
    backgroundColor: "#25b05f",
    borderColor: "#25b05f",
  },
  typeButtonActiveExpense: {
    backgroundColor: "#f22428",
    borderColor: "#f22428",
  },
  typeButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#666",
  },
  typeButtonTextActive: {
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#000",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  currencySymbol: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    color: "#666",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#000",
  },
  addButton: {
    backgroundColor: "#25b05f",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButtonExpense: {
    backgroundColor: "#f22428",
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
});
