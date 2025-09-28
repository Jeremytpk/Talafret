import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const AboutScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>À propos de nous</Text>
                <View style={styles.pageLogoContainer}>
                    <Image source={{ uri: 'https://placehold.co/150x150/1A3E6C/FF8C00?text=Tala' }} style={styles.pageLogo} />
                </View>
                <Text style={styles.paragraph}>
                    Bienvenue chez Tala, votre partenaire logistique de confiance pour tous vos besoins de transport vers la République Démocratique du Congo. Fondée sur les principes de fiabilité, de sécurité et d'efficacité, notre mission est de connecter les personnes et les entreprises en assurant que chaque colis arrive à destination en parfait état et dans les délais.
                </Text>
                <Text style={styles.subHeading}>Notre Mission</Text>
                <Text style={styles.paragraph}>
                    Chez Tala, nous nous engageons à offrir des solutions de fret aérien et maritime transparentes et sans tracas. Nous comprenons l'importance de vos envois, qu'ils soient personnels ou commerciaux, et nous nous efforçons de dépasser vos attentes à chaque étape du processus.
                </Text>
                <Text style={styles.subHeading}>Notre Vision</Text>
                <Text style={styles.paragraph}>
                    Devenir le leader incontesté du transport de fret vers le RDCongo, reconnu pour notre service client exceptionnel, nos technologies innovantes et notre engagement inébranlable envers la satisfaction de nos clients.
                </Text>
                <Text style={styles.subHeading}>Pourquoi nous choisir ?</Text>
                <Text style={styles.listItem}>- <Text style={{ fontWeight: 'bold' }}>Fiabilité :</Text> Nous garantissons un suivi de vos colis du point de départ à l'arrivée.</Text>
                <Text style={styles.listItem}>- <Text style={{ fontWeight: 'bold' }}>Sécurité :</Text> Vos biens sont manipulés avec le plus grand soin et sont protégés à tout moment.</Text>
                <Text style={styles.listItem}>- <Text style={{ fontWeight: 'bold' }}>Expérience :</Text> Forts de nombreuses années d'expérience dans le secteur, nous maîtrisons les complexités du transport international.</Text>
                <Text style={styles.listItem}>- <Text style={{ fontWeight: 'bold' }}>Service Client :</Text> Notre équipe dédiée est toujours disponible pour répondre à vos questions et vous assister.</Text>
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
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A3E6C',
        marginBottom: 15,
        textAlign: 'center',
    },
    pageLogoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    pageLogo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    subHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A3E6C',
        marginTop: 20,
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
    },
    listItem: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default AboutScreen;
