import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, ToastAndroid } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Meet } from '../assets/models/meet';

export default function LiveMeetsScreen({ navigation }: RootTabScreenProps<'LiveMeetsScreen'>) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getLiveMeets = async () => {
        try {
            const response = await fetch('https://stark-ocean-54886.herokuapp.com/https://api.myusagym.com/v1/meets/live', {
                method: 'GET',
                headers: {
                    Accept: '*',
                    'Content-Type': 'application/json',
                    origin: '*'
                },
            });
            const json = await response.json();
            const meetData = json.map((x: Meet) => new Meet(x));
            // console.log(json)
            setData(meetData);
        } catch (error) {
            console.error(error);
            showToast('There was an error getting meet data')
        } finally {
            setLoading(false);
            showToast('loading complete')
        }
    }
    function showToast(msg:string) {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
    useEffect(() => {
        getLiveMeets();
    }, []);

    return (
        <View style={{ flex: 1, padding: 12 }}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ sanctionId }, index) => sanctionId}
                    renderItem={({ item }) => (
                        <Text style={{ fontSize: 15, paddingBottom: 10 }}>{item.name}</Text>
                    )}
                />
            )}
        </View>
    );
};


//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Live Meets</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="/screens/LiveMeetsScreen.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
