import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebaseConfig.js';

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                createdAt: new Date(),
            });
            Alert.alert('Succès', 'Compte créé avec succès !');
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Erreur', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Créez un compte</Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Nom complet:</Text>
                <TextInput style={styles.input} placeholder="Nom complet" value={name} onChangeText={setName} />
            </View>
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
            <TouchableOpacity style={styles.submitButton} onPress={handleSignup} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Inscription</Text>}
            </TouchableOpacity>
            <Text style={styles.formFooter}>
                Déjà un compte ? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Connectez-vous ici</Text>
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

export default SignupScreen;
