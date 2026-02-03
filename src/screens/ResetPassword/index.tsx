import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Eye, EyeOff, Lock } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../../services/api";
import CustomStatusBar from "../../components/CustomStatusBar";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

export default function ResetPassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pegar token da rota (se vier de um deep link)
    const params = route.params as any;
    if (params?.token) {
      setToken(params.token);
    }
  }, [route.params]);

  const handleSubmit = async () => {
    if (!token.trim()) {
      Alert.alert("Erro", "Token inválido. Por favor, use o link do email.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/reset-password", {
        token: token.trim(),
        newPassword,
      });

      Alert.alert(
        "Sucesso!",
        "Sua senha foi redefinida com sucesso. Você já pode fazer login com a nova senha.",
        [
          {
            text: "Fazer Login",
            onPress: () => navigation.navigate("Login" as never),
          },
        ],
      );
    } catch (error: any) {
      const message =
        error.response?.data?.error ||
        "Não foi possível redefinir a senha. O link pode ter expirado.";
      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleSection}>
            <MaskedView
              maskElement={<Text style={styles.title}>Redefinir Senha</Text>}
            >
              <LinearGradient
                colors={["#25b05f", "#1a7a42"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientContainer}
              >
                <Text style={[styles.title, { opacity: 0 }]}>
                  Redefinir Senha
                </Text>
              </LinearGradient>
            </MaskedView>
            <Text style={styles.subtitle}>Digite sua nova senha abaixo.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Token Input (opcional, pode vir da URL) */}
            {!(route.params as any)?.token && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Token de Recuperação</Text>
                <View style={styles.inputWrapper}>
                  <Lock color="#666" size={20} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Cole o token do email"
                    placeholderTextColor="#999"
                    value={token}
                    onChangeText={setToken}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />
                </View>
              </View>
            )}

            {/* New Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nova Senha</Text>
              <View style={styles.passwordContainer}>
                <Lock color="#666" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#999"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye color="#666" size={20} />
                  ) : (
                    <EyeOff color="#666" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar Nova Senha</Text>
              <View style={styles.passwordContainer}>
                <Lock color="#666" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye color="#666" size={20} />
                  ) : (
                    <EyeOff color="#666" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Redefinir Senha</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("Login" as never)}
            >
              <Text style={styles.backButtonText}>Voltar para Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  titleSection: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: 12,
  },
  gradientContainer: {
    paddingHorizontal: 1,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#333",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#000",
  },
  eyeIcon: {
    padding: 4,
  },
  button: {
    backgroundColor: "#25b05f",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  backButton: {
    marginTop: 24,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#25b05f",
  },
});
