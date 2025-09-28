import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebaseConfig.js';

const RegisterPackageScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderCountry, setSenderCountry] = useState('');
    const [senderPhone, setSenderPhone] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverCity, setReceiverCity] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [partner, setPartner] = useState('');
    const [pickupRequested, setPickupRequested] = useState(false);
    const [pickupAddress, setPickupAddress] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleRegisterPackage = async () => {
        if (!user) {
            Alert.alert('Erreur', 'Veuillez vous connecter pour enregistrer un colis.');
            return;
        }

        try {
            const packageData = {
                userId: user.uid,
                partner,
                weight: parseFloat(weight),
                description,
                sender: { name: senderName, country: senderCountry, phone: senderPhone },
                receiver: { name: receiverName, city: receiverCity, phone: receiverPhone },
                pickupRequested,
                pickupAddress: pickupRequested ? pickupAddress : null,
                status: 'En attente',
                createdAt: serverTimestamp(),
            };
            await addDoc(collection(db, 'packages'), packageData);
            Alert.alert('Succès', 'Colis enregistré avec succès !');
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de l\'enregistrement du colis: ' + error.message);
        }
    };

    if (loading) {
        return <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />;
    }

    if (!user) {
        return (
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Enregistrer un colis</Text>
                <Text style={styles.authMessage}>
                    Veuillez vous <Text style={styles.link} onPress={() => navigation.navigate('Login')}>connecter</Text> ou <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>créer un compte</Text> pour enregistrer un colis.
                </Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.formContent}>
            <Text style={styles.formTitle}>Enregistrer un colis</Text>
            <View style={styles.fieldset}>
                <Text style={styles.legend}>Sélectionner un partenaire</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Partner (e.g., DHL Express)"
                    value={partner}
                    onChangeText={setPartner}
                />
            </View>
            <View style={styles.fieldset}>
                <Text style={styles.legend}>Détails du colis</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Poids (en Kg)"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description du contenu"
                    multiline
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <View style={styles.fieldset}>
                <Text style={styles.legend}>Informations sur l'expéditeur</Text>
                <TextInput style={styles.input} placeholder="Nom complet" value={senderName} onChangeText={setSenderName} />
                <TextInput style={styles.input} placeholder="Pays" value={senderCountry} onChangeText={setSenderCountry} />
                <TextInput style={styles.input} placeholder="Numéro de téléphone" keyboardType="phone-pad" value={senderPhone} onChangeText={setSenderPhone} />
            </View>
            <View style={styles.fieldset}>
                <Text style={styles.legend}>Informations sur le destinataire</Text>
                <TextInput style={styles.input} placeholder="Nom complet" value={receiverName} onChangeText={setReceiverName} />
                <TextInput style={styles.input} placeholder="Ville (en RDCongo)" value={receiverCity} onChangeText={setReceiverCity} />
                <TextInput style={styles.input} placeholder="Numéro de téléphone" keyboardType="phone-pad" value={receiverPhone} onChangeText={setReceiverPhone} />
            </View>
            <View style={styles.pickupOption}>
                <TouchableOpacity onPress={() => setPickupRequested(!pickupRequested)} style={styles.checkboxContainer}>
                    <Text style={styles.checkbox}>{pickupRequested ? '✓' : ''}</Text>
                    <Text style={styles.checkboxLabel}>Je souhaite que le colis soit ramassé à mon adresse</Text>
                </TouchableOpacity>
            </View>
            {pickupRequested && (
                <View style={styles.fieldset}>
                    <Text style={styles.legend}>Adresse de ramassage</Text>
                    <TextInput style={styles.input} placeholder="Adresse complète" multiline value={pickupAddress} onChangeText={setPickupAddress} />
                </View>
            )}
            <TouchableOpacity style={styles.submitButton} onPress={handleRegisterPackage}>
                <Text style={styles.submitButtonText}>Enregistrer le colis</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
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
    authMessage: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    link: {
        color: '#1A3E6C',
        textDecorationLine: 'underline',
    },
    fieldset: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
    },
    legend: {
        position: 'absolute',
        top: -10,
        left: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        fontWeight: 'bold',
        color: '#1A3E6C',
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
    pickupOption: {
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#1A3E6C',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 3,
    },
    checkboxLabel: {
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
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default RegisterPackageScreen;
