import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Edit2,
  LogOut,
  Camera,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";
import CustomStatusBar from "../../components/CustomStatusBar";
import * as ImagePicker from "expo-image-picker";
import { api } from "../../services/api";
import {
  EditNameModal,
  EditEmailModal,
  EditPasswordModal,
} from "../../components/EditModals";

export default function Profile() {
  const navigation = useNavigation();
  const { user, signOut, updateUser } = useAuth();
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [editNameVisible, setEditNameVisible] = useState(false);
  const [editEmailVisible, setEditEmailVisible] = useState(false);
  const [editPasswordVisible, setEditPasswordVisible] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja encerrar sua sessão?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
              console.log("✅ Logout realizado com sucesso!");
            } catch (error) {
              console.error("❌ Erro ao fazer logout:", error);
            }
          },
        },
      ],
    );
  };

  const handlePickImage = async () => {
    try {
      // Pedir permissão para acessar a galeria
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de permissão para acessar suas fotos.",
        );
        return;
      }

      // Abrir galeria
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem");
    }
  };

  const uploadAvatar = async (imageUri: string) => {
    try {
      setUploadingAvatar(true);

      // Criar FormData para upload
      const formData = new FormData();
      const filename = imageUri.split("/").pop() || "avatar.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";

      formData.append("avatar", {
        uri: imageUri,
        name: filename,
        type,
      } as any);

      // 1. Upload da imagem
      const uploadResponse = await api.post("/upload/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { url } = uploadResponse.data;

      // 2. Atualizar avatar no perfil do usuário
      const updateResponse = await api.patch("/auth/avatar", {
        avatarUrl: url,
      });

      // 3. Atualizar contexto local
      updateUser(updateResponse.data);

      Alert.alert("Sucesso", "Avatar atualizado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao fazer upload:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.error || "Não foi possível atualizar o avatar",
      );
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Pegar iniciais do nome
  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomStatusBar />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="#000" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.name ? getInitials(user.name) : "US"}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handlePickImage}
              disabled={uploadingAvatar}
            >
              {uploadingAvatar ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Camera color="#FFFFFF" size={16} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{user?.name || "Usuário"}</Text>
          <Text style={styles.profileEmail}>
            {user?.email || "email@exemplo.com"}
          </Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          {/* Name Field */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <User color="#25b05f" size={20} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Nome</Text>
                <Text style={styles.infoValue}>{user?.name || "Usuário"}</Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditNameVisible(true)}
              >
                <Edit2 color="#999" size={18} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Email Field */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Mail color="#25b05f" size={20} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>
                  {user?.email || "email@exemplo.com"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditEmailVisible(true)}
              >
                <Edit2 color="#999" size={18} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Lock color="#25b05f" size={20} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Senha</Text>
                <Text style={styles.infoValue}>••••••••</Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditPasswordVisible(true)}
              >
                <Edit2 color="#999" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut color="#EF5350" size={20} />
          <View style={styles.logoutTextContainer}>
            <Text style={styles.logoutTitle}>Sair da conta</Text>
            <Text style={styles.logoutSubtitle}>Encerrar sua sessão</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Modals */}
      <EditNameModal
        visible={editNameVisible}
        onClose={() => setEditNameVisible(false)}
        currentName={user?.name || ""}
      />
      <EditEmailModal
        visible={editEmailVisible}
        onClose={() => setEditEmailVisible(false)}
        currentEmail={user?.email || ""}
      />
      <EditPasswordModal
        visible={editPasswordVisible}
        onClose={() => setEditPasswordVisible(false)}
        emailUsuario={user?.email || ""}
      />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 36,
    fontFamily: "Poppins_700Bold",
    color: "#25b05f",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#25b05f",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#F8F9FA",
  },
  profileName: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#666",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#000",
  },
  editButton: {
    padding: 8,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEBEE",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
  },
  logoutTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  logoutTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#EF5350",
    marginBottom: 2,
  },
  logoutSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#EF5350",
    opacity: 0.7,
  },
});
