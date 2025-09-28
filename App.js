import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import RegisterPackageScreen from './screens/RegisterPackage';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ContactScreen from './screens/ContactScreen';
import ServicesScreen from './screens/ServicesScreen';
import SlideMenu from './screens/SlideMenu'; // Import the new SlideMenu

const Stack = createNativeStackNavigator();

const App = () => {
    const [user, setUser] = useState(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
        });
        return unsubscribe;
    }, []);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsMenuVisible(false);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const getHeaderRight = () => (
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
    );

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#1A3E6C',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Tala',
                        headerRight: getHeaderRight,
                    }}
                />
                <Stack.Screen
                    name="About"
                    component={AboutScreen}
                    options={{
                        title: 'À propos de nous',
                        headerRight: getHeaderRight,
                    }}
                />
                <Stack.Screen
                    name="Services"
                    component={ServicesScreen}
                    options={{
                        title: 'Services',
                        headerRight: getHeaderRight,
                    }}
                />
                <Stack.Screen
                    name="RegisterPackage"
                    component={RegisterPackageScreen}
                    options={{
                        title: 'Envoyer un colis',
                        headerRight: getHeaderRight,
                    }}
                />
                <Stack.Screen
                    name="Contact"
                    component={ContactScreen}
                    options={{
                        title: 'Contact',
                        headerRight: getHeaderRight,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: 'Connexion' }}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ title: 'Inscription' }}
                />
            </Stack.Navigator>
            <SlideMenu
                navigation={Stack.navigation}
                isVisible={isMenuVisible}
                onClose={toggleMenu}
            />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    menuButton: {
        marginRight: 10,
    },
    menuIcon: {
        color: '#fff',
        fontSize: 24,
    },
});

export default App;
