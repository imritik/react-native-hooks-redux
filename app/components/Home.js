import React, { useState, useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { addQuotes, deleteQuote } from '../actions';
import ListItem from './ListItem';

export default function Home(props) {
    const dispatch = useDispatch();
    const { navigation } = props;


    //declare variables
    const [isFetching, setIsFetching] = useState(false);

    //Access redux store state
    const dataReducer = useSelector((state) => state.dataReducer);
    const { quotes } = dataReducer;

    useEffect(() => getData(), []);

    //get flatlist data

    const getData = () => {
        setIsFetching(true);

        //option1 local data
        AsyncStorage.getItem('quotes', (err, quotes) => {
            if (err) alert(err.message);
            else if (quotes !== null) dispatch(addQuotes(JSON.parse(quotes)));

            setIsFetching(false);
        });

        //option 2 fake api
        // let url = "";
        // axios.get(url)
        //     .then(res => res.data)
        //     .then((data) => dispatch(addQuotes(data)))
        //     .catch(error => alert(error.message))
        //     .finally(() => setIsFetching(false));
    };

    //render flatlist item
    const renderItem = ({ item, index }) => {
        return (
            <ListItem item={item} index={index} navigation={navigation} onDelete={onDelete} onEdit={onEdit} />
        )
    };

    //edit quote
    const onEdit = (item) => {
        navigation.navigate('NewQuote', { quote: item, title: "Edit Quote" })
    };

    //delete quote
    const onDelete = (id) => {

        //option1 localstorage
        AsyncStorage.getItem('quotes', (err, quotes) => {
            if (err) alert(err.message);
            else if (quotes !== null) {
                quotes = JSON.parse(quotes);

                //find the index of quote with id
                const index = quotes.findIndex((obj) => obj.id === id);

                //remove the quote
                if (index !== -1) quotes.splice(index, 1);

                //update local  storage
                AsyncStorage.setItem('quotes', JSON.stringify(quotes), () => dispatch(deleteQuote(id)));
            }
        });


        //OPTION 2 - FAKE API
        // let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        // axios.delete(url, {data:{id:id}})
        //     .then((res) => dispatch(deleteQuote(id)))
        //     .catch(error => alert(error.message))
        //     .finally(() => setIsFetching(false));
    };

    //render
    if (isFetching) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true} />
            </View>
        );
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={quotes}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `quotes_${index}`} />

                <TouchableHighlight style={styles.floatingButton}
                    underlayColor='#ff7043'
                    onPress={() => navigation.navigate('NewQuote', { title: "New Quote" })}>
                    <Text style={{ fontSize: 25, color: 'white' }}>+</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    floatingButton: {
        backgroundColor: '#6B9EFA',
        borderColor: '#6B9EFA',
        height: 55,
        width: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 60,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});