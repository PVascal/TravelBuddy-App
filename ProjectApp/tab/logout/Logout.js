import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import axios from 'axios';
import Config from '../../Config';

export default class Logout extends React.Component {

    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this);

    }


    logout() {
        axios.get(Config.ip + '/logout')
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
                    <Button title={"Logout"} onPress={this.logout} color={"#495057"}/>
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 30,
        marginBottom: 25
    },
    underTitle: {
        marginBottom: 15,
    }
})