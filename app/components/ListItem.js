import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Button } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

let colors = ["#ff8e42", "#4F6384"];

export default function ListItem({ item, index, navigation, onDelete, onEdit }) {

    const inputE1 = useRef(null);

    const RightActions = ({ progress, dragX, onPress, item }) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.buttons}>

                <RectButton onPress={() => {
                    inputE1.current.close();
                    onEdit(item);
                }}>
                    <View style={[styles.rightAction, styles.editAction]}>
                        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>Edit</Animated.Text>
                    </View>
                </RectButton>

                <RectButton onPress={() => {
                    inputE1.current.close();
                    onDelete(item.id)
                }}>
                    <View style={[styles.rightAction, styles.deleteAction]}>
                        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>Delete</Animated.Text>
                    </View>
                </RectButton>
            </View>
        );
    };

    //returns color based on index
    function random() {
        if (index % 2 === 0) {
            return colors[0];
        }
        else {
            return colors[1];
        }
    }

    return (
        <Swipeable ref={inputE1}
            renderRightActions={(progress, dragX) => (
                <RightActions progress={progress} dragX={dragX} item={item} />
            )}>
            <View style={styles.row}>
                <View style={[styles.container, { backgroundColor: random() }]}>
                    <Text style={styles.quote}>
                        {item.text}
                    </Text>
                    <Text style={styles.author}>
                        {item.author}
                    </Text>
                </View>
            </View>
        </Swipeable>
    )
};

const styles = StyleSheet.create({
    row: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
        backgroundColor: '#FFF',
        padding: 10
    },

    container: {
        padding: 10
    },

    author: {
        marginTop: 25,
        marginBottom: 10,
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 15,
        color: '#FFF',
        textAlign: "right"
    },

    quote: {
        marginTop: 5,
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 17,
        lineHeight: 21,
        color: '#FFF',
    },

    buttons: {
        width: 190,
        flexDirection: 'row'
    },

    rightAction: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: 95,
    },

    editAction: {
        backgroundColor: '#497AFC'
    },

    deleteAction: {
        backgroundColor: '#dd2c00'
    },

    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
    }
});