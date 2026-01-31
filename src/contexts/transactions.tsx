import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { api } from "../services/api";
import { useAuth } from "./auth";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "outcome";
  date: string;
  categoryId: string;
  userId: string;
  category?: {
    id: string;
    name: string;
    icon: string;
    color: string;
    type: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface TransactionsContextData {
  transactions: Transaction[];
  addTransaction: (
    transaction: Omit<Transaction, "id" | "userId" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
  loadTransactions: () => Promise<void>;
  balance: number;
  income: number;
  outcome: number;
  loading: boolean;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { signed } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (signed) {
      loadTransactions();
      loadBalance();
    }
  }, [signed]);

  async function loadTransactions() {
    try {
      setLoading(true);
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (error: any) {
      console.error(
        "Erro ao carregar transações:",
        error.response?.data?.error || error.message,
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadBalance() {
    try {
      const response = await api.get("/transactions/balance");
      setBalance(response.data.balance);
      setIncome(response.data.income);
      setOutcome(response.data.outcome);
    } catch (error: any) {
      console.error(
        "Erro ao carregar saldo:",
        error.response?.data?.error || error.message,
      );
    }
  }

  async function addTransaction(
    transaction: Omit<Transaction, "id" | "userId" | "createdAt" | "updatedAt">,
  ) {
    try {
      const response = await api.post("/transactions", {
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        categoryId: transaction.categoryId,
        date: transaction.date,
      });

      // Recarregar transações e saldo após adicionar
      await loadTransactions();
      await loadBalance();
    } catch (error: any) {
      const message =
        error.response?.data?.error || "Erro ao adicionar transação";
      throw new Error(message);
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        loadTransactions,
        balance,
        income,
        outcome,
        loading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions() {
  return useContext(TransactionsContext);
}
