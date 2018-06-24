import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Modal } from 'react-native';

import Carousel from 'react-native-snap-carousel';

export default class Places extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            isLoading: true,
            results: [],
        }
    }

    baseUrl = "https://maps.googleapis.com/maps/api/place/photo?maxheight=234&maxwidth=280&photoreference=";
    apikey = "&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E";
    radius = '&radius=';
    type = '&type=';
    query= this.props.query + this.radius + "25000" + this.type + this.props.cat + this.apikey;

    componentDidMount() {
        this.newQuery()
    }

    newQuery() {
        let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Restaurants+in+Amsterdam&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E';
        fetch(this.query)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    results: responseJson.results
                }), function() {

                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _renderItem ({item, index}) {

        let content = [];
        content.push(
            <View key={index}>
                <TouchableOpacity style={styles.slide}>
                    <Image style={{width: 300, height: 250}} source={{uri: "https://maps.googleapis.com/maps/api/place/photo?maxheight=234&maxwidth=280&photoreference=" +
                        item.photos[0].photo_reference + "&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E"}} />
                    <View style={styles.titleBox} >
                        <Text style={styles.title}>{ item.name }</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
        return content;
    }


    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <Text>De gegevens worden opgehaald.</Text>
                    <Text>{this.state.results.length}</Text>
                </View>
            )
        }

        let sliderWidth = 350;
        let itemWidth = 280;

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <Text>{this.state.modal}</Text>
                <Text style={styles.categoryTitle}>{this.props.cat.split('_').join(' ')}</Text>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.results}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                />
            </View>
        )

    }

}

const styles = StyleSheet.create({
    places: {
        position: 'relative',
        paddingTop: 50,
    },
    titleBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 50,
        backgroundColor: 'orange',
        width: 280,
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    categoryTitle: {
        fontSize: 24,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 32,
    }
});