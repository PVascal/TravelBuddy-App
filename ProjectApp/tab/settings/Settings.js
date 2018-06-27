import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

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

    constructor(props) {
        super(props);

        this.saveSettings = this.saveSettings.bind(this);

    }


    saveSettings() {
        var value = this.refs.form.getValue();
        if (value) {
            console.log(value);
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