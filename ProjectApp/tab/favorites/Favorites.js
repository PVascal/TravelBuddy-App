import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

import axios from 'axios';

export default class Favorites extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            items: [],
            placeDetails: {},
            check: false,
            photos: [],
        }

        this.url = "http://10.0.2.2:5000/api/user/favorite";
        this.placeDetailsUrl = "https://maps.googleapis.com/maps/api/place/details/json?placeid=";
        this.proxyUrl = "https://cors-anywhere.herokuapp.com/";
        this.imgUrl = "https://maps.googleapis.com/maps/api/place/photo?maxheight=234&maxwidth=280&photoreference=";
        this.key = "&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E";

        this.loadData();

    }

    loadData() {
        axios.get(this.url)
            .then(response => {
                console.log("First " + response)
                this.setState({
                    items: response.data
                });

            })
            .then(() => {
                this.state.items.forEach(favorite => {
                    if(favorite.placeId) {
                        axios.get(this.proxyUrl + this.placeDetailsUrl + favorite.placeId + this.key)
                            .then(response => {
                                console.log("Second " + response)
                                var temp1 = this.state.placeDetails;
                                temp1[favorite.placeId] = response.data;
                                this.setState({
                                    placeDetails: temp1
                                });
                            })
                    }
                })

            })
            .then(() => {console.log(this.state.placeDetails)})
    }


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontSize: 24}}>Favorites</Text>
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