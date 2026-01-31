import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';

// Configuração base da API
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log para debug
console.log('🌐 API configurada para:', API_URL);

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@finax:token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log para debug
    console.log(`📡 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Resposta recebida: ${response.status}`);
    return response;
  },
  async (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Timeout: Não foi possível conectar ao servidor');
    } else if (error.code === 'ERR_NETWORK') {
      console.error('🔌 Erro de rede: Verifique se o backend está rodando');
    } else if (error.response) {
      console.error(`❌ Erro ${error.response.status}:`, error.response.data);
    } else {
      console.error('❌ Erro desconhecido:', error.message);
    }
    
    if (error.response?.status === 401) {
      // Token inválido ou expirado - fazer logout
      await AsyncStorage.multiRemove(['@finax:token', '@finax:user']);
    }
    
    return Promise.reject(error);
  }
);
