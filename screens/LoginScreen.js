import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig.js';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Succès', 'Connexion réussie !');
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Erreur de connexion', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Connectez-vous à votre compte</Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Adresse e-mail:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Adresse e-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Mot de passe:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleLogin} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Connexion</Text>}
            </TouchableOpacity>
            <Text style={styles.formFooter}>
                Pas encore de compte ? <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Créez-en un ici</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A3E6C',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#1A3E6C',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    formFooter: {
        textAlign: 'center',
        marginTop: 20,
    },
    link: {
        color: '#1A3E6C',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
