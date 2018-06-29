import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';

import axios from 'axios';

export default class Logout extends React.Component {

    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this);

    }


    logout() {
        axios.get('http://10.0.2.2:5000/logout')
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
            <TouchableOpacity onPress={this.logout}>
                <Text>Logout please</Text>
            </TouchableOpacity>
        )
    }


}