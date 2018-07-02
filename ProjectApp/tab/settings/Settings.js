import React from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';

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

var updateOptions = {
    fields: {
        username: {
            label: 'Username',
            error: 'Insert a valid username'
        },
        email: {
            label: 'Email address',
            error: 'Insert a valid email'
        },
        firstname: {
            label: 'First name',
            error: 'Insert your first name'
        },
        lastname: {
            label: 'Last name',
            error: 'Insert your last name'
        },
        password: {
            label: 'Password',
            error: 'Insert your password',
            secureTextEntry: true
        },
        country: {
            label: "County",
            error: 'Insert a valid country',
        }
    }
};



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
        values: [],
        message: "",
    }

    showAlert = () => {
        Alert.alert(
            this.state.message,
            'Your account have been changed!',
        )
    }



    constructor(props) {
        super(props);

        fetch('http://145.37.144.79:5000/api/loginCheck')
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
        console.log("Voor Sander")
        if(this.state.loggedIn) {
            let url = 'http://145.37.144.79:5000/api/user';
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

        if (value != null) {
            let url = 'http://145.37.144.79:5000/api/user';
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
                            password: "",
                        });
                        window.setTimeout(() =>
                            this.setState({
                            message: null,
                            messageId: null
                        }), 2000);
                        this.loadData()
                        this.showAlert()
                    }
                })
                .catch(error => {
                    this.setState({
                        message: error.response.data.message,
                        messageId: "messageError",
                    });
                });
        }

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
                            options={updateOptions}
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
    message: {
        fontSize: 30,
        marginTop: 15,
        marginBottom: 30,
    }
})