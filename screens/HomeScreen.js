import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// Import the local image asset
import kinshasaImage from '../assets/kinshasa_gombe.jpg';

const HomeScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
        });
        return unsubscribe;
    }, []);

    const handleButtonPress = () => {
        if (user) {
            // Navigate to MyPackagesScreen if user is logged in
            navigation.navigate('MyPackages');
        } else {
            // Navigate to RegisterPackageScreen if user is not logged in
            navigation.navigate('RegisterPackage');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.hero}>
                <Image
                    source={kinshasaImage}
                    style={StyleSheet.absoluteFillObject}
                />
                <Text style={styles.heroText}>Votre partenaire de confiance pour le fret vers le RDCongo</Text>
                <Text style={styles.heroSubText}>Spécialistes du transport aérien et maritime. Envoyez vos colis en toute sécurité.</Text>
                <TouchableOpacity style={styles.ctaButton} onPress={handleButtonPress}>
                    <Text style={styles.ctaButtonText}>
                        {user ? 'Mes Colis' : 'Envoyer un colis'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Nos services</Text>
                <View style={styles.serviceCardsContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Fret Aérien</Text>
                        <Text style={styles.cardText}>Transport rapide pour vos colis urgents.</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Fret Maritime</Text>
                        <Text style={styles.cardText}>Solution économique pour les gros volumes.</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Ramassage à domicile</Text>
                        <Text style={styles.cardText}>Nous venons chercher votre colis directement chez vous.</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    section: {
        padding: 20,
    },
    hero: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        overflow: 'hidden',
    },
    heroText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    heroSubText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    ctaButton: {
        backgroundColor: '#FF8C00',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    ctaButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A3E6C',
        marginBottom: 15,
        textAlign: 'center',
    },
    serviceCardsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
    },
    card: {
        backgroundColor: '#f4f4f4',
        padding: 20,
        borderRadius: 8,
        width: '100%',
        alignItems: 'flex-start',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A3E6C',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 14,
        color: '#333',
    },
});

export default HomeScreen;
