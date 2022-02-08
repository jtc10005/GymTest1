import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, ToastAndroid, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { MeetDetailsParamList, MeetSessionParamList, RootTabScreenProps } from '../types';
// import { Meet } from '../assets/models/meet';
import { MeetDetails } from '../assets/models/meetDetails';
import { TouchableLink } from '../components/touchableLink';
import { View } from '../components/Themed';
import { Session } from '../assets/models/session';
import { getLocalTime } from '../assets/utils/dateTime';
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
      console.log(meetData);
      setMeetData(meetData);
    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);

    }
  }


  useEffect(() => {
    getMeetDetails();
  }, []);

  const goToSessionDetails = (sessionId: string) => {
    const resultSet = meetData.sessionResultSets.find(x => x.sessionId?.toUpperCase() === sessionId.toUpperCase())
    if (resultSet && resultSet.resultSetId) {
      let mdp: MeetSessionParamList = { resultSetId: resultSet?.resultSetId };
      navigation.navigate('MeetSession', mdp)
    }
  }

  return (
    <View style={styles.container} >
      {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> :
        <View >
          <TouchableLink url={meetData?.sanction?.siteLink} style={styles.title} text={meetData?.sanction?.name}></TouchableLink>
          <Text style={styles.subtext}>Status: {meetData?.sanction?.meetStatus}</Text>
          <View style={styles.separator} />
          <Text style={styles.subtext}>{meetData?.sanction?.siteName}</Text>
          <Text style={styles.subtext}>{meetData?.sanction?.address1}</Text>

          {
            meetData?.sanction?.address2
              ? <Text>{meetData?.sanction?.address2} {meetData?.sanction?.city}, {meetData?.sanction?.state}</Text>
              : <Text>{meetData?.sanction?.city}, {meetData?.sanction?.state}</Text>
          }

          <DataTable>
            <DataTable.Header>
              <DataTable.Title >sessionId</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Warmup Time</DataTable.Title>
              <DataTable.Title>Start Time</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {
                meetData?.sessions?.map((item: Session) => {
                  return <DataTable.Row key={item.sessionId}
                    onPress={() => goToSessionDetails(item.sessionId)}>
                    <DataTable.Cell>{item.sessionId}</DataTable.Cell>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>{item.date}</DataTable.Cell>
                    <DataTable.Cell>{getLocalTime(item?.time1)}</DataTable.Cell>
                    <DataTable.Cell>{getLocalTime(item.time3)}</DataTable.Cell>
                  </DataTable.Row>
                })
              }
            </ScrollView>
          </DataTable>
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
