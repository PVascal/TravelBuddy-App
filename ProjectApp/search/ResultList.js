import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native';

export default class ResultList extends React.Component {

    constructor(props) {
        super(props);
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


        if (item.photos != null) {
            let image;
            image = <Image style={{width: 300, height: 250}} source={{uri: "https://maps.googleapis.com/maps/api/place/photo?maxheight=234&maxwidth=280&photoreference=" +
                item.photos[0].photo_reference + "&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E"}} />;

            return (
                <View key={index} style={styles.singleResult}>
                    <TouchableOpacity onPress={() => this.props.handler(
                        item.name,
                        image,
                        item.formatted_address,
                        open,
                        item.geometry.location.lat,
                        item.geometry.location.lng,
                        item.place_id,
                    )} >
                        <View style={styles.slide}>
                            <Image style={{width: 300, height: 250}} source={{uri: "https://maps.googleapis.com/maps/api/place/photo?maxheight=234&maxwidth=280&photoreference=" +
                                item.photos[0].photo_reference + "&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E"}} />
                            <View style={styles.titleBox} >
                                <Text style={styles.title}>{ item.name }</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <FlatList
                        data={this.props.results}
                        renderItem={(item, index) => this._renderItem(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        marginBottom: 100,
    }
    ,places: {
        position: 'relative',
        paddingTop: 50,
    },
    titleBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 50,
        width: 300,
        backgroundColor: '#ff922b',
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
    },
    singleResult: {
        marginBottom: 25,
    }
});