import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Tab extends React.Component {

    render() {
        return (
            <View style={{position: 'relative', marginTop: 50}}>
                <Text style={{fontSize: 30}}>Settings</Text>
            </View>
        )
    }

}