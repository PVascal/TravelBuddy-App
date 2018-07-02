import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Map from "../map/Map";

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <ScrollView>
                    <View style={styles.navHeader}>
                        <TouchableOpacity onPress={() => this.props.close()}>
                            <Icon size={24} color="white" name={'chevron-left'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.innerContainer}>
                        {this.props.image}
                        <View style={styles.modalInfo}>
                            <Text style={styles.title}>{this.props.name}</Text>
                            <Text style={styles.infoText}>{this.props.address}</Text>
                            <Text style={styles.infoText}>{this.props.open}</Text>
                        </View>
                        <Map destLat={this.props.lat} destLng={this.props.lng}/>
                    </View>
                </ScrollView>
            </View>
            )
    }

}

const styles = StyleSheet.create({
    navHeader: {
        backgroundColor: '#495057',
        height: 50,
        padding: 10,
    },
    innerContainer: {
        padding: 15,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 15,
    },
    modalInfo: {
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
    },
    image: {
        width: 300,
        height: 250,
        marginLeft: 15,
    }
});