import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';

import axios from 'axios';

export default class Logout extends React.Component {

    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this);

    }


    logout() {
        axios.get('http://145.37.144.79:5000/logout')
            .then((response) => {
                console.log("Logged out")
                this.props.function("Uitloggen");
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Logout</Text>
                <Text style={styles.underTitle}>You can logout with the link below</Text>
                <TouchableOpacity onPress={this.logout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    title: {
        fontSize: 30,
        marginBottom: 25
    },
    underTitle: {
        marginBottom: 15,
    }
})