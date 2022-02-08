
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, TextInput, ToastAndroid } from 'react-native';
import { RootTabScreenProps } from '../types';
import { Meet } from '../assets/models/meet';
import { MeetGrid, gridstyles } from '../components/meetGrid';

export default function PastMeets({ navigation }: RootTabScreenProps<'PastMeets'>) {
    const [isLoading, setLoading] = useState(true);
    const [pastData, setData] = useState([]);
    const [filterText, onChangeText] = React.useState("");
    const handleNav = (sanctionId: number) => {

        navigation.navigate('Meet', { sanctionId: sanctionId })
    }

    const getLiveMeets = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://stark-ocean-54886.herokuapp.com/https://api.myusagym.com/v1/meets/past', {
                method: 'GET',
                headers: {
                    Accept: '*',
                    'Content-Type': 'application/json',
                    origin: '*'
                },
            });
            const json = await response.json();
            const pastData = json.map((x: Meet) => new Meet(x));
            
            setData(pastData);
        } catch (error) {
            console.error(error);
            // showToast('There was an error getting meet data')
        } finally {
            setLoading(false);
            // showToast('loading complete')
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
                <MeetGrid data={pastData} clickCallback={handleNav} filterString={filterText}/>)
            }
        </View>
    );
}

