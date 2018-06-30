import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import axios from 'axios';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var Settings = t.struct({
    firstname: t.String,
    lastname: t.String,
    username: t.String,
    email: t.String,
    password: t.String,
    country: t.String,
});



export default class AccountSettings extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        country: "",
        password: "",
        usernameId: "",
        loggedIn: false,
        countries: [],
        values: []
    }


    constructor(props) {
        super(props);

        fetch('http://10.0.2.2:5000/api/loginCheck')
            .then((response) => response.json())
            .then((responseJson)=> {
                if (responseJson['username'] != null) {
                    this.setState({
                        usernameId: responseJson['username'],
                        loggedIn: true,
                    })
                }
                this.loadData()
            }).catch((error) => {
            console.log(error)
        })

        this.saveSettings = this.saveSettings.bind(this);

    }

    loadData() {
        if(this.state.loggedIn) {
            let url = 'http://10.0.2.2:5000/api/user';
            axios.get(url)
                .then(result => {
                    result = result.data;
                    valuesList = {
                        firstname: result.firstName,
                        lastname: result.lastName,
                        username: result.username,
                        email: result.email,
                        password: "",
                        country: result.country,
                    }
                    this.setState({
                        firstName: result.firstName,
                        lastName: result.lastName,
                        username: result.username,
                        email: result.email,
                        country: result.country,
                        values: valuesList,
                    });

                });
        }
    }

    saveSettings() {
        var value = this.refs.form.getValue();
        if (value) {
            console.log(value);
        }

        let url = 'http://10.0.2.2:5000/api/user';
        url += "?firstName=" + value.firstname;
        url += "&lastName=" + value.lastname;
        url += "&username=" + value.username;
        url += "&email=" + value.email;
        url += "&password=" + value.password;
        url += "&country=" + value.country;

        axios.put(url)
            .then(response => {
                if(response.data) {
                    this.setState({
                        message: response.data.message,
                        messageId: "messageOk",
                        password: ""
                    });
                    window.setTimeout(() => this.setState({
                        message: null,
                        messageId: null
                    }), 2000);
                }
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.message,
                    messageId: "messageError",
                });
            });

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30}}>Account settings</Text>
                <View>
                    <View style={styles.settingsContainer}>
                        <Form
                            ref="form"
                            type={Settings}
                            value={this.state.values}
                        />
                        <Button onPress={this.saveSettings} title="Save settings" color="#ff922b"/>
                    </View>
                </View>
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
    settingsContainer: {
        marginTop: 25,
    },
    formContainer: {
        marginBottom: 25,
    },
})