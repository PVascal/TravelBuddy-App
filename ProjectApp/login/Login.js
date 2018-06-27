import React from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput, Button, TouchableHighlight} from 'react-native';
import axios from 'react-native-axios';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var Login = t.struct({
    name: t.String,
    password: t.String,
});

var Register = t.struct({
    username: t.String,
    email: t.String,
    firstname: t.String,
    lastname: t.String,
    password: t.String,
    country: t.String,
});



export default class Preferences extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            register: false,
            username: ""
        }

        this.sendCredentials = this.sendCredentials.bind(this);
        this.changePage = this.changePage.bind(this);

    }

    sendCredentials() {
        console.log("Formulier verzonden..")
        var details = {
            'email': 'kees@kees.nl',
            'password': 'kees',
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://10.0.2.2:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(function (response) {
            //console.log(response)
        })

        fetch('http://10.0.2.2:5000/api/loginCheck')
            .then((response) => response.json())
            .then((responseJson)=> {
                console.log(responseJson['username'])
                this.setState({
                    username: responseJson['username'],
                })
            }).catch((error) => {
                console.log(error)
        })


        var value = this.refs.form.getValue();
        if (value) {
            //console.log(value);
        }
    }

    changePage() {
        if (!this.state.register) {
            this.setState({register: true})
        } else {
            this.setState({register: false})
        }
    }


    render() {
        return (
            <View>
                {!this.state.register &&
                <View style={styles.container}>
                    <Text style={{fontSize: 30}}>Sign in with TravelBuddy</Text>
                    <View style={styles.loginContainer}>
                        <Form
                            ref="form"
                            type={Login}
                        />
                        <Button onPress={this.sendCredentials} title="Login" color="#ff922b"/>
                        <View style={styles.registerText}>
                            <Text>No account?</Text>
                            <TouchableHighlight onPress={this.changePage}>
                                <Text>Register here</Text>
                            </TouchableHighlight>
                            <Text>{this.state.username}</Text>
                        </View>
                    </View>
                </View>}
                {this.state.register &&
                <View style={styles.container}>
                    <Text style={{fontSize: 30}}>Register to TravelBuddy</Text>
                    <View style={styles.loginContainer}>
                        <Form
                            ref="form"
                            type={Register}
                        />
                        <Button onPress={this.sendCredentials} title="Login" color="#ff922b"/>
                        <View style={styles.registerText}>
                            <Text>Already a member?</Text>
                            <TouchableHighlight onPress={this.changePage}>
                                <Text>Login</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>}
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
    loginContainer: {
        marginTop: 25,
    },
    formContainer: {
        marginBottom: 25,
    },
    registerText: {
        marginTop: 25,
        borderTopWidth: 1,
        borderColor: 'gray',
        paddingTop: 25,
    }
})