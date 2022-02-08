import { DataTable } from 'react-native-paper';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, ToastAndroid, StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';
import { Meet } from '../assets/models/meet';

const row = (item: Meet, callback: Function) => (
    <DataTable.Row key={item.sanctionId}
        onPress={() => callback(item.sanctionId)}>
        <DataTable.Cell>{item.name}</DataTable.Cell>
        <DataTable.Cell>{item.getCityState()}</DataTable.Cell>
        <DataTable.Cell>{item.getFromDate()}</DataTable.Cell>
        <DataTable.Cell>{item.getToDate()}</DataTable.Cell>
    </DataTable.Row>
);

export const MeetGrid = (props: { data: Meet[], filterString: string; clickCallback: Function }) => {

    const [sortName, setSortName] = React.useState<string | undefined>('From');
    const [sortAscending, setSortAscending] = React.useState<boolean>(false);
    
    const filter = props?.filterString?.toLowerCase();
    const sortedItems = filter && filter != '' ? props.data
        .filter(x => x?.name?.toLowerCase().includes(filter)
            || x?.city?.toLowerCase().includes(filter)
            || x?.state?.toLowerCase().includes(filter))
        .slice()
        : filter && filter != "" && sortName && sortName != "" ?
            props.data
                .filter(x => x?.name?.toLowerCase().includes(filter)
                    || x?.city?.toLowerCase().includes(filter)
                    || x?.state?.toLowerCase().includes(filter))
                .slice()
            : sortName && sortName != "" ?
                props.data
                    .slice()
                    .sort((item1, item2) =>
                        sortName === 'Name' ?
                            (sortAscending ? item1.name < item2.name : item2.name < item1.name) ? 1 : -1 :
                            sortName === 'Location' ?
                                (sortAscending ? item1.getCityState() < item2.getCityState() : item2.getCityState() < item1.getCityState()) ? 1 : -1 :
                                sortName === 'From' ?
                                    (sortAscending ? item1.startDate < item2.startDate : item2.startDate < item1.startDate) ? 1 : -1 :
                                    sortName === 'To' && item1.endDate && item2.endDate ?
                                        (sortAscending ? item1.endDate < item2.endDate : item2.endDate < item1.endDate) ? 1 : -1 :
                                        0
                    )
                : props.data;

    const sort = (columnName: string) => {
        if (columnName !== sortName) {
            setSortAscending(true);
            setSortName(columnName);
            return;
        }
        setSortAscending(!sortAscending);
    }
    return (

        <DataTable>
            <DataTable.Header>
                <DataTable.Title
                    sortDirection={sortName === 'Name' ? sortAscending ? 'ascending' : 'descending' : undefined}
                    onPress={() => sort('Name')} >Name</DataTable.Title>
                <DataTable.Title sortDirection={sortName === 'Location' ? sortAscending ? 'ascending' : 'descending' : undefined}
                    onPress={() => sort('Location')}>Location</DataTable.Title>
                <DataTable.Title sortDirection={sortName === 'From' ? sortAscending ? 'ascending' : 'descending' : undefined}
                    onPress={() => sort('From')}>From</DataTable.Title>
                <DataTable.Title sortDirection={sortName === 'To' ? sortAscending ? 'ascending' : 'descending' : undefined}
                    onPress={() => sort('To')}>To</DataTable.Title>
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