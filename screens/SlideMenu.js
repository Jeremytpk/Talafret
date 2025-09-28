import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const { width } = Dimensions.get('window');

const SlideMenu = ({ navigation, isVisible, onClose }) => {
    const [user, setUser] = useState(null);
    // Use ref for animated value so it persists across renders
    const slideAnim = useRef(new Animated.Value(width)).current;

    useEffect(() => {
        // When visible, slide to 0 (fully visible). When hidden, slide to width (off-screen to the right).
        Animated.timing(slideAnim, {
            toValue: isVisible ? 0 : width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isVisible, slideAnim]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
        });
        return unsubscribe;
    }, []);

    const pages = [
        { name: 'Accueil', screen: 'Home' },
        { name: 'À propos de nous', screen: 'About' },
        { name: 'Services', screen: 'Services' },
        { name: 'Envoyer un colis', screen: 'RegisterPackage' },
        { name: 'Contact', screen: 'Contact' },
    ];

    const handleNavigation = (screenName) => {
        onClose && onClose();
        if (navigation && screenName) {
            navigation.navigate(screenName);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            onClose();
            // Optional: navigate to the home screen after logout
            navigation.navigate('Home');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    {pages.map((page, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={() => handleNavigation(page.screen)}
                        >
                            <Text style={styles.menuItemText}>{page.name}</Text>
                        </TouchableOpacity>
                    ))}
                    {user ? (
                        <>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => handleNavigation('MyPackages')}
                            >
                                <Text style={styles.menuItemText}>Mes Colis</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={handleLogout}
                            >
                                <Text style={styles.loginButtonText}>Déconnexion</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => handleNavigation('Login')}
                        >
                            <Text style={styles.loginButtonText}>Connexion</Text>
                        </TouchableOpacity>
                    )}
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    menuContainer: {
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 20,
        right: 125,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 100,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    closeButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuItemText: {
        fontSize: 18,
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#1A3E6C',
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default SlideMenu;
