import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';


export default class Places extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            isLoading: true,
            results: []
        }
    }

    baseUrl = "https://maps.googleapis.com/maps/api/place/photo?maxheight=234&maxwidth=280&photoreference=";
    apikey = "&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E";

    componentDidMount() {
        this.newQuery()
    }

    newQuery() {
        let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Restaurants+in+Amsterdam&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E';
        fetch(url)
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
        let image = this.baseUrl + item.photos[0].photo_reference + this.apikey;
        return (
            <View style={styles.slide}>
                <Text>{ item.name }</Text>
                <Image src={image} />
            </View>
        );
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

        let sliderWidth = 300;
        let itemWidth = 200;

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <Text>{this.state.results.length}</Text>
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
        paddingTop: 50
    }
});