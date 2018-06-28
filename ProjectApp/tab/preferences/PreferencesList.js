import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

import Autocomplete from './Autocomplete';

export default class PreferencesList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            jsonObject: this.props.object
        }

        this.emptySearch = this.emptySearch.bind(this);
    }


    handleChange(e) {
        let inputWord = e;
        let length = e.length;
        let result = [];

        for (let i = 0; i < this.props.possCat.length; i++) {
            let word = this.props.possCat[i];
            if (word.substring(0, length) == e.toLowerCase()) {
                result.push(word);
            }
        }
        if (e == "") {
            this.setState({
                results: []
            })
        } else {
            this.setState({
                results: result
            })
        }
    }

    emptySearch() {
        this.setState({
            searchBar: "",
            results: []
        })
    }

    render() {
        return (
            <View>
                <View style={styles.inputContainer}>
                    <Text>Add preference:</Text>
                    <TextInput
                        style={styles.textField}
                        onChangeText={(this.handleChange.bind(this))}
                    />
                </View>
                <Autocomplete suggestions={this.state.results} object={this.props.object} emptySearch={this.emptySearch} />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    textField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 5,
        marginTop: 5,
    },
});