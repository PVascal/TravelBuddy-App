import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

export default class Favorites extends React.Component {

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
                //console.log(JSON.stringify(responseJson, null, 4))
                //console.log(this.state.categories.length)

                for (var key in this.state.categories) {
                    temp.push(key)
                    console.log(key)
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
                    <Text style={{fontSize: 30}}>Favorites</Text>
                    {this.state.keyList.map((key, index) => {
                        return <Text key={index}>{key.split('_').join(' ')}</Text>
                    })}
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