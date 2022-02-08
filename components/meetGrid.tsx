import { DataTable } from 'react-native-paper';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, ToastAndroid, StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';
import { Meet } from '../assets/models/meet';

export const MeetGrid = (props: { data: Meet[], filterString: string; clickCallback: Function }) => {

    const [sortNameAscending, setSortNameAscending] = React.useState<boolean | undefined>(undefined);
    const filter = props?.filterString?.toLowerCase();
    const sortedItems = filter && filter != '' ? props.data
        .filter(x => x?.name?.toLowerCase().includes(filter)
        || x?.city?.toLowerCase().includes(filter)
        || x?.state?.toLowerCase().includes(filter))
        .slice()
        .sort((item1, item2) =>
            (sortNameAscending ? item1.name < item2.name : item2.name < item1.name)
                ? 1
                : -1
        ) :
        props.data
            .slice()
            .sort((item1, item2) =>
                (sortNameAscending ? item1.name < item2.name : item2.name < item1.name)
                    ? 1
                    : -1
            );

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
                <DataTable.Title
                    sortDirection={sortNameAscending ? 'ascending' : 'descending'}
                    onPress={() => setSortNameAscending(!sortNameAscending)} >Name</DataTable.Title>
                <DataTable.Title>Location</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
                {
                    sortedItems.map((meet: Meet) => {
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});