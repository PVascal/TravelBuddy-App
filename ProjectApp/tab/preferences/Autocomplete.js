import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default class Autocomplete extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            preferences: [],
            loggedIn: false,
            username: "",
            categories: this.props.cat,
        }

        fetch('http://145.37.144.146:5000/api/loginCheck')
            .then((response) => response.json())
            .then((responseJson)=> {
                if (responseJson['username'] != null) {
                    this.setState({
                        username: responseJson['username'],
                        loggedIn: true,
                    })
                }
                this.loadData()
            }).catch((error) => {
            console.log(error)
        })

        this.addPreference = this.addPreference.bind(this);
        this.removePreference = this.removePreference.bind(this);

    }

    loadData() {
        if(this.state.loggedIn) {
                let url = "http://145.37.144.146:5000/api/user/preferences";
                axios.get(url)
                .then(response => {
                    let temp = [];
                    for (var key in response.data) {
                        temp.push(key)
                    }
                    this.setState({
                        preferences: temp
                    })
                });
        }
    }

    addPreference(i, result) {
        let pref = []
        let check = 0;
        for (let index = 0; index < this.state.preferences.length; index++) {
            pref.push(this.state.preferences[index])
            if (this.state.preferences[index] == result) {
                check++;
            }
        }
        pref.push(result)
        if (check == 0) {
            if(this.state.loggedIn) {
                let url = "http://145.37.144.146:5000/api/user/preferences?id=" + i
                axios.post(url)
                this.setState({
                    preferences: pref,
                })
                this.props.compare(result, this.state.categories)
                this.props.emptySearch();
            }
        }
    }

    removePreference(index, name, i) {
        if(this.state.loggedIn) {
            let url = "http://145.37.144.146:5000/api/user/preferences?id=" + i
            axios.delete(url)
            let array = this.state.preferences;
            array.splice(index, 1);
            this.setState({
                preferences: array,
            });
            this.props.compare(name, this.state.categories)
        }
    }

    render() {
        return (
            <View>
                <View>
                {this.props.suggestions.map((suggestion, index) => {

                    let title = suggestion.charAt(0).toUpperCase() + suggestion.substring(1, suggestion.length);

                    return (
                        <TouchableHighlight key={index} name={suggestion}
                            value={this.props.object[suggestion]}
                            style={styles.suggestion}
                            onPress={this.addPreference.bind(this, this.props.object[suggestion], suggestion)}>
                            <Text>{title.split('_').join(' ')}</Text>
                        </TouchableHighlight>
                    )
                })}
                </View>
                <View style={styles.prefContainer}>
                    {this.state.preferences.map((preference, index) => {

                        let title = preference.charAt(0).toUpperCase() + preference.substring(1, preference.length);

                        return (
                            <TouchableHighlight key={index}
                                onPress={() => this.removePreference(index, preference, this.props.object[preference])}
                                style={styles.preference} >
                                <View>
                                    <Text>{title.split('_').join(' ')}<Icon size={16} color="black" name={"remove"} /></Text>
                                </View>
                            </TouchableHighlight>
                        )
                    })}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    prefContainer: {
        flexDirection: 'row',
        flexWrap:'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    suggestion: {
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    preference: {
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#ff922b',
        borderRadius: 5,
    },
});