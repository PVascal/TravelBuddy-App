import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Favorites extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            categories: [],
        })
    }

    componentDidMount() {
        this.getCategories()
    }

    getCategories() {
        fetch('http://10.0.2.2:5000/api/categories')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    categories: responseJson
                }), function() {

                }
                console.log("Fetch is gelukt")
                console.log(JSON.stringify(responseJson, null, 4))
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30}}>Favorites</Text>
                <Text>{this.state.categories.length}</Text>
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
})