import React from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput, Button, TouchableHighlight} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var Login = t.struct({
    name: t.String,
    password: t.String,
});


var loginOptions = {
    fields: {
        name: {
            label: 'Email address',
            error: 'Insert a valid email'
        },
        password: {
            label: 'Password',
            error: 'Insert a valid password',
            secureTextEntry: true
        }
    }
};

var Register = t.struct({
    username: t.String,
    email: t.String,
    firstname: t.String,
    lastname: t.String,
    password: t.String,
    country: t.String,
});

var registerOptions = {
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
            error: 'Insert a valid password',
            secureTextEntry: true
        },
        country: {
            label: "Country",
            error: 'Insert a valid country',
        }
    }
};



export default class Preferences extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            register: false,
            username: "",
            ok: true,
        }

        this.sendCredentials = this.sendCredentials.bind(this);
        this.sendRegister = this.sendRegister.bind(this);
        this.changePage = this.changePage.bind(this);

    }

    componentDidMount() {
        //this.props.func("Hello World");
    }

    sendCredentials() {

        var value = this.refs.form.getValue();

        if (value != null) {

            this.props.func("Hello World");

            var details = {
                'email': value.name,
                'password': value.password,
            };

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            fetch('http://145.37.144.79:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            }).then(function (response) {
                //console.log(response)
            })

            fetch('http://145.37.144.79:5000/api/loginCheck')
                .then((response) => response.json())
                .then((responseJson)=> {
                    console.log(responseJson['username'])
                    this.setState({
                        username: responseJson['username'],
                    })
                }).catch((error) => {
                console.log(error)
            })
        }


    }

    sendRegister() {

        var value = this.refs.form.getValue();

        if (value != null) {
            this.props.func("register")

            var value = this.refs.form.getValue();

            var details = {
                'username': value.username,
                'email': value.email,
                'firstname' : value.firstname,
                'lastname' : value.lastname,
                'password': value.password,
                'country': value.country,
            };

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            fetch('http://145.37.144.79:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            }).then(function (response) {
                console.log(response)
            })
            this.setState({
                register: false,
            })
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
                            options={loginOptions}
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
                            options={registerOptions}
                        />
                        <Button onPress={this.sendRegister} title="Register" color="#ff922b"/>
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