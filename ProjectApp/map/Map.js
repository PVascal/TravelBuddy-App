import React from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import getDirections from "react-native-google-maps-directions";
import Modal from '../modal/Modal';


export default class Map extends React.Component {

    constructor(props) {
        super(props);
    }


    handleGetDirections = () => {
        const data = {
            source: {
                latitude: this.props.latitude,
                longitude: this.props.longitude
            },
            destination: {
                latitude: this.props.destLat,
                longitude: this.props.destLng
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: ""       // this instantly initializes navigation using the given travel mode
                }
            ]
        }

        getDirections(data)
    }

    render() {
        return (
            <View>
                <Button color={'#495057'} onPress={this.handleGetDirections} title="Get Directions"/>
            </View>

        )
    }
}