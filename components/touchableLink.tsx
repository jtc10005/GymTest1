import { DataTable } from 'react-native-paper';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, ToastAndroid, StyleSheet, ScrollView, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import { RootTabScreenProps } from '../types';
import { Meet } from '../assets/models/meet';
import * as Linking from 'expo-linking';

export const TouchableLink = (props: { url: string | undefined, style: StyleProp<TextStyle>, text: string | undefined }) => {
    const handlePress = async () => {
        if (!props.url) {
            return;
        }
        let link = props.url;
        if (!link.startsWith('http:')) {
            console.warn(`link ${link} is missng http/https.  Adding it.`)
            link = `http://${link}`;
        }
        const supported = await Linking.canOpenURL(link);

        if (supported) {
            Linking.openURL(link);
        }
    }

    return (
        <TouchableOpacity onPress={() => handlePress()}>
            <Text style={props.style}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

