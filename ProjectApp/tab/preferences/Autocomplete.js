import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Autocomplete extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            preferences: ["clothing_store", 'bar', "restaurant", "restaurant", "restaurant"]
        }

        this.addPreference = this.addPreference.bind(this);
        this.removePreference = this.removePreference.bind(this);

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
                this.setState({
                    preferences: pref
                })
                this.props.emptySearch();
        }
    }

    removePreference(index, name, i) {
            let array = this.state.preferences;
            array.splice(index, 1);
            this.setState({
                preferences: array
            });
    }

    render() {
        return (
            <View>
                <View>
                {this.props.suggestions.map((suggestion, index) => {
                    return (
                        <TouchableHighlight key={index} name={suggestion}
                            value={this.props.object[suggestion]}
                            style={styles.suggestion}
                            onPress={this.addPreference.bind(this, this.props.object[suggestion], suggestion)}>
                            <Text>{suggestion.split('_').join(' ')}</Text>
                        </TouchableHighlight>
                    )
                })}
                </View>
                <View style={styles.prefContainer}>
                    {this.state.preferences.map((preference, index) => {
                        return (
                            <TouchableHighlight key={index}
                                onPress={() => this.removePreference(index, preference, this.props.object[preference])}
                                style={styles.preference} >
                                <View>
                                    <Text>{preference.split('_').join(' ')}<Icon size={16} color="black" name={"remove"} /></Text>
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