import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import PreferenceList from './PreferencesList';

export default class Preferences extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            categories: [],
            keyList: [],
        })
    }

    componentDidMount() {
        this.getCategories()
    }

    getCategories() {
        fetch('http://10.0.2.2:5000/api/categories')
            .then((response) => response.json())
            .then((responseJson) => {
                let temp = [];
                this.setState({
                    categories: responseJson
                }), function() {

                }

                for (var key in this.state.categories) {
                    temp.push(key)
                }

                this.setState({
                    keyList: temp,
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={{fontSize: 30}}>Preferences</Text>
                    <PreferenceList possCat={this.state.keyList} object={this.state.categories}/>
                </ScrollView>
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