import React, { useState, useEffect } from 'react';

import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons'

import styles from './styles';

import { useNavigation } from "@react-navigation/native";
import api from '../../services/api'

import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();


    async function loadIncidents() {

        if(loading){
            return;
        }

        if(total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents',{
            params:{page}
        });

        setLoading(false);
        setPage(page+1);
        setIncidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);
    }

    useEffect(() => {
        loadIncidents()
    }, []);

    function navigateToDetail(incident) {
        navigation.navigate('detail',{incident});
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
    Total de <Text style={styles.headerTextBold}> {total}</Text> Casos
            </Text>
            </View>
            <Text style={styles.title}>Bem Vindo!</Text>
            <Text style={styles.descrition}>Escolha um caso e salve o dia</Text>

            <FlatList
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: incident }) => (
                    <View style={styles.incidentsList}>
                        <View style={styles.incidents}>
                            <Text style={styles.incidentsProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>{incident.name}</Text>

                            <Text style={styles.incidentsProperty}>CASO:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>

                            <Text style={styles.incidentsProperty}>VALOR::</Text>
                            <Text style={styles.incidentValue}>
                                {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })
                                    .format(incident.value)}
                            </Text>

                            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                                <Text style={styles.detailsButtonText}>Ver Mais Detalhes</Text>
                                <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />


        </View>
    )
}