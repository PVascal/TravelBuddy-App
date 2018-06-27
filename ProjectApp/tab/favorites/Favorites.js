import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

export default class Favorites extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            jsonCategories: {},
            categories: [],
            results: [],
            searchBar: ""
        }

        fetch('http://10.0.2.2:5000/api/categories')
            .then(result => {
                let temp = [];
                this.setState({
                    jsonCategories: result.data
                })
                console.log("Data: " + result.data)
                for (var key in this.state.jsonCategories) {
                    temp.push(key)
                    console.log(key)
                }
                this.setState({
                    categories: temp
                })
                console.log(this.state.categories)
            }).catch((error) => {
            console.error(error);
        });


    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontSize: 24}}>My preferences</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text>Add preference:</Text>
                    <TextInput
                        style={styles.textField}
                    />
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
    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
    }, textField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 5,
        marginTop: 5,
    }
});