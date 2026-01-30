import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/auth';

export default function Home() {
    const { user, signOut } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo, {user?.name}!</Text>
            <Text style={styles.subtitle}>Você está logado (Modo de Verificação)</Text>

            <TouchableOpacity style={styles.button} onPress={signOut}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#00A86B',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
