import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

import places from '../images/placeholder.png';

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

    _renderItem = ({item, index}) => {

        let open = "";
        if (item.opening_hours === undefined) {
            open = "No opening hours available"
        } else {
            if (item.opening_hours.open_now) {
                open = "Open now";
            } else {
                open = "Closed now"
            }
        }

        let image;
        let simpleImage;

        if (item.photos == undefined) {
            image = <Image style={{width: 300, height: 250}} source={places} />
            simpleImage = places;
        } else {
            image = <Image style={{width: 300, height: 250}} source={{uri: "https://maps.googleapis.com/maps/api/place/photo?maxheight=234&maxwidth=280&photoreference=" +
                item.photos[0].photo_reference + "&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E"}} />;
                simpleImage = item.photos[0].photo_reference;
        }



        let content = [];
            content.push(
                <View key={index}>
                    <TouchableOpacity onPress={() => this.props.handler(
                        item.name,
                        image,
                        item.vicinity,
                        open,
                        item.geometry.location.lat,
                        item.geometry.location.lng,
                        item.place_id,
                    )} >
                        <View style={styles.slide}>
                            {image}
                            <View style={styles.titleBox} >
                                <Text style={styles.title}>{ item.name }</Text>
                            </View>
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
                    <ActivityIndicator size="large" color="#ff922b" />
                </View>
            )
        }

        let sliderWidth = 350;
        let itemWidth = 280;

        let title = this.props.cat.charAt(0).toUpperCase() + this.props.cat.substring(1, this.props.cat.length);

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <Text>{this.state.modal}</Text>
                <Text style={styles.categoryTitle}>{title.split('_').join(' ')}</Text>
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
        backgroundColor: '#ff922b',
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