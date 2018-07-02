import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView, TextInput, ActivityIndicator, Picker, TouchableOpacity} from 'react-native';

import background from '../images/searchBanner.jpg';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ResultList from "./ResultList";
import Modal from '../modal/Modal';

var radius = [
    {label: '5 km', value: 5000 },
    {label: '10 km', value: 10000 },
    {label: '15 km', value: 15000 },
    {label: '20 km', value: 20000 },
    {label: '25 km', value: 25000 },
];


var categories = []

export default class Search extends React.Component {

    state = {
        searchType: "keyword",
        results: [],
        categories: [],
        input: '',
        type: "",
        radius: "",
        language: "",
        locationLng: "",
        locationLat: "",
        active: "search",
        isLoading: false,
    }

    apikey = "&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E";

    constructor(props) {
        super(props);

        this.searchType = this.searchType.bind(this);
        this.searchByKeyword = this.searchByKeyword.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }

    searchType(e) {
        this.setState({
            searchType: e,
        })
    }

    changeInput(e) {
        this.setState({
            input: e,
        })
    }


    searchByKeyword () {
        this.setState({
            isLoading: true,
        })
        let keyword = this.state.input.split(' ').join('+');
        let url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + keyword + this.apikey;
        fetch(url)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    isLoading: false,
                    results: result.results,
                });
            });
    }

    modalHandler = (name, image, address, open, lat, lng, id) => {
        this.setState({
            modalName: name,
            modalImage: image,
            modalAddress: address,
            modalOpen: open,
            modalLat: lat,
            modalLng: lng,
            modalId: id,
            active: 'modal'
        })
    }


    hideModal = () => {
        this.setState({
            active: 'search',
        })
    };

    getContent() {

        if (this.state.active === 'search') {
            return (
                <View>
                    <View style={styles.info}>
                        <Image source={background} style={styles.background}/>
                        <View style={styles.infoText}>
                            <Text style={styles.title}>Search TravelBuddy</Text>
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid='transparent'
                                placeholder="Eg. Restaurant in Amsterdam"
                                onChangeText={this.changeInput}
                            />
                            <TouchableOpacity style={styles.button} onPress={this.searchByKeyword}>
                                <Text style={styles.buttonText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.isLoading &&
                        <View style={styles.info}>
                            <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#ff922b" />
                            </View>
                        </View>}
                    <ResultList results={this.state.results} handler={this.modalHandler}/>
                    {this.state.results.length === 0 &&
                    <View style={styles.container}>
                        <View styles={styles.textContainer}>
                            <Text style={styles.noResults}>Unfortunately, no results were found.</Text>
                        </View>
                    </View>
                    }
                </View>
            )
        } else {
            return <Modal
                name={this.state.modalName}
                image = {this.state.modalImage}
                address={this.state.modalAddress}
                open = {this.state.modalOpen}
                lat = {this.state.modalLat}
                lng = {this.state.modalLng}
                id = {this.state.modalId}
                close={this.hideModal}
            />
        }

    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                        {this.getContent()}
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    info: {
        position: 'relative',
        flex: 1,
        overflow: 'hidden',
        height: 350,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        height: 350,
    },
    infoText: {
        position: 'absolute',
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        alignSelf: 'stretch',
        height: 360,
        width: 360,
        padding: 20
    },
    title: {
        fontSize: 30,
        color: 'white',
        marginBottom: 25,
    },
    input: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        marginBottom: 25,
        backgroundColor: 'white',
    },
    picker: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 25,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#ff922b',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
    },
    buttonText: {
        color: 'white',
    },
    filter: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'flex-start',
    },
    textContainer:  {
        padding: 15,
    },
    noResults: {
        fontSize: 18,
    },
    container: {
        marginTop: 25,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});