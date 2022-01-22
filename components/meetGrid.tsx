import { DataTable } from 'react-native-paper';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, ToastAndroid, StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';
import { Meet } from '../assets/models/meet';

export const MeetGrid = (props: { data: Meet[], clickCallback: Function }) => {

    const row = (item: Meet, callback: Function) => (
        <DataTable.Row key={item.sanctionId}
            onPress={() => callback(item.sanctionId)}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.city}, {item.state}</DataTable.Cell>
        </DataTable.Row>
    );

    return (

        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Location</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
                {
                    props.data.map((meet: Meet) => {
                        return (row(meet, props.clickCallback));
                    })
                }
            </ScrollView>
        </DataTable>
    );
}


export const gridstyles = StyleSheet.create({
    container: {
        flex: 1, padding: 12
    },
});