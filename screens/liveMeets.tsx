import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, ToastAndroid } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { MeetDetailsParamList, RootTabScreenProps } from '../types';
import { Meet } from '../assets/models/meet';
import { MeetGrid, gridstyles } from '../components/meetGrid';

export default function LiveMeets({ navigation }: RootTabScreenProps<'LiveMeets'>) {
    const [isLoading, setLoading] = useState(true);
    const [liveData, setData] = useState([]);
    const [filterText, onChangeText] = React.useState("");

    /**callback to handle row click */
    const handleNav = (sanctionId: number) => {
        let mdp: MeetDetailsParamList = { sanctionId: sanctionId };
        navigation.navigate('Meet', mdp)
    }

    const getLiveMeets = async () => {
        try {
            setLoading(false);
            const response = await fetch('https://stark-ocean-54886.herokuapp.com/https://api.myusagym.com/v1/meets/live', {
                method: 'GET',
                headers: {
                    Accept: '*',
                    'Content-Type': 'application/json',
                    origin: '*'
                },
            });
            const json = await response.json();
            const liveData = json.map((x: Meet) => new Meet(x));
            // console.log(json)
            setData(liveData);
        } catch (error) {
            console.error(error);
            showToast('There was an error getting meet data')
        } finally {
            setLoading(false);
        }
    }
    function showToast(msg: string) {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
    useEffect(() => {
        getLiveMeets();
    }, []);

    return (
        <View style={gridstyles.container}>
            <TextInput placeholder='Search for'
                style={gridstyles.input}
                onChangeText={onChangeText}
                value={filterText} />
            {isLoading ? <ActivityIndicator /> : (
                <MeetGrid data={liveData} clickCallback={handleNav} filterString={filterText}/>)
            }
        </View>
    );
};

