import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

import background from '../images/sevilla.jpg';

export default class City extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            isLoading: true,
            results: []
        }

    }

    componentDidMount(){
        this.wikiQuery()
    }

    componentDidUpdate() {
        if (this.state.city !== this.props.city) {
            this.wikiQuery()
            this.setState({
                city: this.props.city,
            })
        }
    }

    wikiQuery() {
        let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + this.props.city;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    results: responseJson
                }), function() {

                }
            })
            .catch((error) => {

            })
    }

    render() {

        if(this.state.isLoading){
            return(
                <View style={styles.info}>
                    <Image source={background}/>
                    <View style={styles.infoText}>
                        <ActivityIndicator size="large" color="#ff922b" />
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.info}>
                <Image source={background}/>
                <View style={styles.infoText}>
                    <Text style={styles.city}>{this.props.city}</Text>
                    <Text style={styles.description}>{this.state.results[2][0]}</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        overflow: 'hidden',
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
        textAlign: 'center',
    },
    city: {
        fontSize: 30,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30
    }
});



