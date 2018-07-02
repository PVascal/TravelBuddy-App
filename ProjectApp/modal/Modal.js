import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

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
                        <Image style={styles.image} source={{uri: "https://maps.googleapis.com/maps/api/place/photo?maxheight=234&maxwidth=280&photoreference=" +
                            this.props.image + "&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E"}} />
                        <View style={styles.modalInfo}>
                            <Text style={styles.title}>{this.props.name}</Text>
                            <Text style={styles.infoText}>{this.props.address}</Text>
                            <Text style={styles.infoText}>{this.props.open}</Text>
                        </View>
                        <Button title={'Get directions'} color={'#ff922b'} onPress={() => {console.log("Directions")}} />
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