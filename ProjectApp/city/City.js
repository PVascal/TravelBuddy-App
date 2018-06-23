import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import background from '../images/sevilla.jpg';

export default class City extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.info}>
                <Image source={background}/>
                <View style={styles.infoText}>
                    <Text style={styles.city}>{this.props.city}</Text>
                    <Text style={styles.extraInfo}>Calling code: +{this.props.callingCode}</Text>
                    <Text style={styles.extraInfo}>Region: {this.props.region}</Text>
                    <Text style={styles.extraInfo}>Country: {this.props.country}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    info: {
        position: 'relative',
        flexDirection: 'row',
        flexWrap:'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        overflow: 'hidden'
    },
    infoText: {
        position: 'absolute',
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        alignSelf: 'stretch',
        height: 360,
        width: 320,
        padding: 20
    },
    extraInfo: {
        fontSize: 16,
    },
    city: {
        fontSize: 30,
    }
});



