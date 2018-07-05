import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import PreferenceList from './PreferencesList';
import Config from '../../Config';

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
        fetch(Config.ip + '/api/categories')
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
                    <PreferenceList possCat={this.state.keyList} object={this.state.categories} compare={this.props.compare} cat={this.props.cat}/>
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