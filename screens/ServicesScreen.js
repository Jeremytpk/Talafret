import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const ServicesScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>Nos Solutions de Fret</Text>
                <Text style={styles.introParagraph}>
                    Tala offers a complete range of transport services to meet all your logistical needs, from small parcels to large goods thanks to our partners.
                </Text>
            </View>

            <View style={styles.serviceCardsContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Air Freight Express ✈️</Text>
                    <Text style={styles.cardText}>
                        For urgent and high-value shipments, our air freight service is the fastest solution. We ensure secure transport and on-time delivery of your goods to the DRCongo.
                    </Text>
                    <View style={styles.list}>
                        <Text style={styles.listItem}>• Short delivery times</Text>
                        <Text style={styles.listItem}>• Ideal solution for perishable goods and important documents</Text>
                        <Text style={styles.listItem}>• Package tracking</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Sea Freight 🚢</Text>
                    <Text style={styles.cardText}>
                        Sea freight is the most economical option for bulky and non-urgent shipments. We manage the transport of full containers (FCL) or shared containers (LCL).
                    </Text>
                    <View style={styles.list}>
                        <Text style={styles.listItem}>• Reduced transport costs</Text>
                        <Text style={styles.listItem}>• Capacity for heavy and bulky goods</Text>
                        <Text style={styles.listItem}>• Simplified planning and documentation</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Home Pickup Service 🚚</Text>
                    <Text style={styles.cardText}>
                        Simplify your shipping process with our pickup service. We come to collect your package directly from your address for maximum convenience.
                    </Text>
                    <View style={styles.list}>
                        <Text style={styles.listItem}>• Saves time and effort</Text>
                        <Text style={styles.listItem}>• Available upon simple request when registering your package</Text>
                        <Text style={styles.listItem}>• Increased security from the point of departure to our warehouse</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Customs Clearance Service 📝</Text>
                    <Text style={styles.cardText}>
                        Easily navigate the complexities of customs. Our team handles all the necessary documentation for a quick and hassle-free customs clearance in the DRCongo.
                    </Text>
                    <View style={styles.list}>
                        <Text style={styles.listItem}>• Expertise in customs procedures</Text>
                        <Text style={styles.listItem}>• Rapid processing of formalities</Text>
                        <Text style={styles.listItem}>• Avoid delays and unforeseen costs</Text>
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
        padding: 20,
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
    serviceCardsContainer: {
        flexDirection: 'column',
        gap: 20,
    },
    card: {
        backgroundColor: '#f4f4f4',
        padding: 20,
        borderRadius: 8,
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
        marginBottom: 10,
    },
    list: {
        marginLeft: 10,
    },
    listItem: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
});

export default ServicesScreen;
