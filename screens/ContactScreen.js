import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

const ContactScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleMessageSubmit = () => {
        if (!name || !email || !subject || !message) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        // Here you would implement logic to send the message, e.g., to a backend service or email API.
        // For now, we will just show a success message.
        Alert.alert('Succès', 'Votre message a été envoyé. Nous vous répondrons sous peu.');

        // Reset the form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>Contactez-nous</Text>
                <Text style={styles.introParagraph}>
                    Pour toute question, demande de devis ou information complémentaire, n'hésitez pas à nous contacter. Notre équipe est là pour vous aider.
                </Text>
            </View>

            <View style={styles.contactDetails}>
                <View style={styles.contactCard}>
                    <Text style={styles.cardTitle}>Informations Générales</Text>
                    <Text style={styles.cardText}>
                        <Text style={styles.cardTextBold}>Adresse :</Text> 123, Rue Principale, Ville, Pays
                    </Text>
                    <Text style={styles.cardText}>
                        <Text style={styles.cardTextBold}>Téléphone :</Text> +1 (555) 123-4567
                    </Text>
                    <Text style={styles.cardText}>
                        <Text style={styles.cardTextBold}>Email :</Text> contact@tala.com
                    </Text>
                </View>
                <View style={styles.contactCard}>
                    <Text style={styles.cardTitle}>Heures d'ouverture</Text>
                    <Text style={styles.cardText}>Lundi - Vendredi : 9h00 - 17h00</Text>
                    <Text style={styles.cardText}>Samedi : 10h00 - 14h00</Text>
                    <Text style={styles.cardText}>Dimanche : Fermé</Text>
                </View>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Envoyez-nous un message</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Votre nom:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Nom complet"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Votre e-mail:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        placeholder="Email"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Sujet:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSubject}
                        value={subject}
                        placeholder="Sujet du message"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Votre message:</Text>
                    <TextInput
                        style={styles.textArea}
                        onChangeText={setMessage}
                        value={message}
                        multiline
                        numberOfLines={6}
                        placeholder="Votre message"
                    />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleMessageSubmit}>
                    <Text style={styles.submitButtonText}>Envoyer le message</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    section: {
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A3E6C',
        textAlign: 'center',
        marginBottom: 10,
    },
    introParagraph: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    contactDetails: {
        marginBottom: 30,
    },
    contactCard: {
        backgroundColor: '#f4f4f4',
        padding: 20,
        borderRadius: 8,
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A3E6C',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 14,
        color: '#333',
    },
    cardTextBold: {
        fontWeight: 'bold',
    },
    formContainer: {
        backgroundColor: '#f4f4f4',
        padding: 20,
        borderRadius: 8,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A3E6C',
        marginBottom: 15,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#1A3E6C',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ContactScreen;
