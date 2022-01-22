
import { DataTable } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, ToastAndroid, StyleSheet } from 'react-native';
// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Meet } from '../assets/models/meet';

export default function PastMeets({ navigation }: RootTabScreenProps<'PastMeets'>) {
    const [isLoading, setLoading] = useState(true);
    const [pastData, setData] = useState([]);

    const getLiveMeets = async () => {
        try {
            const response = await fetch('https://stark-ocean-54886.herokuapp.com/https://api.myusagym.com/v1/meets/past', {
                method: 'GET',
                headers: {
                    Accept: '*',
                    'Content-Type': 'application/json',
                    origin: '*'
                },
            });
            const json = await response.json();
            const pastData = json
                .map((x: Meet) => new Meet(x));
            // .filter((x: Meet) => x.startDate >= new Date(new Date().getFullYear(), 0, 1));
            // console.log(pastData)
            setData(pastData);
        } catch (error) {
            console.error(error);
            showToast('There was an error getting meet data')
        } finally {
            setLoading(false);
            showToast('loading complete')
        }
    }
    function showToast(msg: string) {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
    useEffect(() => {
        getLiveMeets();
    }, []);

    const row = (item: Meet) => (
        <DataTable.Row key={item.sanctionId}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.city}</DataTable.Cell>
        </DataTable.Row>
    );

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : (
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>City</DataTable.Title>
                        <DataTable.Title>State</DataTable.Title>
                    </DataTable.Header>

                    {
                        pastData.map((meet: Meet) => {
                            return (row(meet));
                        })
                    }

                </DataTable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 12
    },
});