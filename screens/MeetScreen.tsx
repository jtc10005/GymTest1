import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, ToastAndroid, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { MeetDetailsParamList, RootTabScreenProps } from '../types';
// import { Meet } from '../assets/models/meet';
import { MeetDetails } from '../assets/models/meetDetails';
import { TouchableLink } from '../components/touchableLink';
import { View } from '../components/Themed';
import { Session } from '../assets/models/session';
export default function MeetScreen({ navigation, route }: RootTabScreenProps<'Meet'>) {
  const { sanctionId } = (route.params as unknown) as MeetDetailsParamList;
  const [isLoading, setLoading] = useState(true);
  const [meetData, setMeetData] = useState(new MeetDetails());

  const getMeetDetails = async () => {
    try {
      setLoading(true);
      if (!sanctionId) {
        console.error('no sanction id');
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

      const json = await response.json();
      const meetData = new MeetDetails(json);
      setMeetData(meetData);
    } catch (error) {
      console.error(error);
      
    } finally {
      setLoading(false);
      
    }
  }
  // function showToast(msg: string) {
  //   ToastAndroid.show(msg, ToastAndroid.SHORT);
  // }
  useEffect(() => {
    getMeetDetails();
  }, []);

  return (
    <View style={styles.container} >
      {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> :
        <View >
          <TouchableLink url={meetData?.sanction?.siteLink} style={styles.title} text={meetData?.sanction?.name}></TouchableLink>

          <View style={styles.separator} />

          <Text style={styles.subtext}>{meetData?.sanction?.address1}</Text>

          {
            meetData?.sanction?.address1
              ? <Text>{meetData?.sanction?.address2} {meetData?.sanction?.city}, {meetData?.sanction?.state}</Text>
              : <Text>{meetData?.sanction?.city}, {meetData?.sanction?.state}</Text>
          }

          <View>
            <Text style={styles.subtext}>Sessions:</Text>
            {/* <Text>{meetData?.sanction?.sessions[0].name}</Text> */}
            <ScrollView>
                {
                    meetData?.sessions?.map((s: Session) => {
                        <Text>s.date</Text>
                    })
                }
            </ScrollView>
          </View>
        </View>}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,

  },
  separator: {
    marginVertical: 5,
    height: .5,
    width: '80%',
    color: 'rgba(255,255,255,0.1)',
  },
  subtext: {
    fontSize: 14,
    paddingLeft: 5,
  }
});
