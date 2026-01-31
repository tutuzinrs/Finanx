import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { api } from "../services/api";
import { useAuth } from "./auth";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: "income" | "outcome";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoriesContextData {
  categories: Category[];
  loadCategories: () => Promise<void>;
  getCategoryById: (id: string) => Category | undefined;
  loading: boolean;
}

const CategoriesContext = createContext<CategoriesContextData>(
  {} as CategoriesContextData,
);

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { signed } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (signed) {
      loadCategories();
    }
  }, [signed]);

  async function loadCategories() {
    try {
      setLoading(true);
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error: any) {
      console.error(
        "Erro ao carregar categorias:",
        error.response?.data?.error || error.message,
      );
    } finally {
      setLoading(false);
    }
  }

  function getCategoryById(id: string) {
    return categories.find((category) => category.id === id);
  }

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loadCategories,
        getCategoryById,
        loading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export function useCategories() {
  return useContext(CategoriesContext);
}
