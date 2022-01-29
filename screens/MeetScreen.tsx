import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, ToastAndroid, StyleSheet, ScrollView, } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { MeetDetailsParamList, RootTabScreenProps } from '../types';
import { Meet } from '../assets/models/meet';
import { MeetDetails } from '../assets/models/meetDetails';

export default function MeetScreen({ navigation, route }: RootTabScreenProps<'Meet'>) {
  const { sanctionId } = (route.params as unknown) as MeetDetailsParamList;
  const [isLoading, setLoading] = useState(true);
  const [meetData, setMeetData] = useState(new MeetDetails());

  const getMeetDetails = async () => {
    try {
      setLoading(true);
      if (!sanctionId) {
        console.error('no sacntion id');
      }
      const url = `https://stark-ocean-54886.herokuapp.com/https://api.myusagym.com/v2/sanctions/${sanctionId}`;
      // console.log(url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: '*',
          'Content-Type': 'application/json',
          origin: '*'
        },
      });
      debugger;
      const json = await response.json();
      console.log(json.sanction)
      const meetData = new MeetDetails(json);
      // .map((x: Meet) => new Meet(x));
      // .filter((x: Meet) => x.startDate >= new Date(new Date().getFullYear(), 0, 1));
      console.log(meetData)
      setMeetData(meetData);
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
    getMeetDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meetData?.sanction?.name}</Text>
      {/* <View style={styles.separator} /> */}
      <link rel="stylesheet" href="{meetData?.sanction?.siteLink}" />
      <Text style={styles.subtext}>{meetData?.sanction?.address1}</Text>
      {meetData?.sanction?.address1 
        ? <Text>{meetData?.sanction?.address2} {meetData?.sanction?.city}, {meetData?.sanction?.state}</Text> 
        : <Text>{meetData?.sanction?.city}, {meetData?.sanction?.state}</Text>}
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    // marginVertical: 5,
    height: .5,
    width: '80%',
    color: 'rgba(255,255,255,0.1)',
  },
  subtext: {
    fontSize: 14,
  }
});
