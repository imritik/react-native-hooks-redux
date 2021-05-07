import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import AppLoading from 'expo-app-loading';

import SampleData from '../sample.json';

export default function LoadingScreen(props) {

    useEffect(() => checkLocalData(), []);

    function checkLocalData() {

        //check if local storage has data
        AsyncStorage.getItem('quotes', (err, data) => {

            //if data doesnt exist, extract from json file
            if (data === null) {
                AsyncStorage.setItem('quotes', JSON.stringify(SampleData.quotes));

                props.navigation.navigate('App');
            }
            else {
                props.navigation.navigate('App');
            }
        });
    }

    return <AppLoading />;
}