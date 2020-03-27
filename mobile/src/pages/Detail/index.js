import React from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import { Feather } from '@expo/vector-icons'
import logoImg from '../../assets/logo.png'
import styles from './styles';

export default function Detail() {

    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident

    const message = `Olá ${incident.name},estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })
    .format(incident.value)}`


    function navegateBack() {
        navigation.goBack()
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Heroi do caso:${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <TouchableOpacity onPress={navegateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041"></Feather>
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <View style={styles.incidentsList}>
                    <View style={styles.incidents}>
                        <Text style={[styles.incidentsProperty, { marginTop: 0 }]}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                        <Text style={styles.incidentsProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentsProperty}>VALOR::</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })
                                .format(incident.value)}
                        </Text>

                    </View>
                </View>
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o Dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói deste caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}