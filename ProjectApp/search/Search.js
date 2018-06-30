import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView, TextInput, FlatList, Picker, TouchableOpacity} from 'react-native';

import background from '../images/searchBanner.jpg';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ResultList from "./ResultList";

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
    }

    apikey = "&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E";

    constructor(props) {
        super(props);

        this.getCategories()

        this.searchType = this.searchType.bind(this);
        this.searchByKeyword = this.searchByKeyword.bind(this);
        this.searchByPlace = this.searchByPlace.bind(this);
        this.checkSearch = this.checkSearch.bind(this);
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

    checkSearch() {
        if (this.state.searchType == 'city') {
            this.searchByPlace()
        } else {
            this.searchByKeyword()
        }
    }

    searchByKeyword () {
        let keyword = this.state.input.split(' ').join('+');
        let url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + keyword + this.apikey;
        fetch(url)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    results: result.results,
                });
            });
    }

    searchByPlace() {
        let keyword = this.state.input.split(' ').join('+');
        let location = "https://maps.googleapis.com/maps/api/geocode/json?address=" + keyword + this.apikey;
        let distance = "&radius=" + this.state.radius;
        let type = "&type=" + this.state.type;
        this.setState({
            loading: "loading",
            results: []
        })
        fetch(location)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    locationLng: result.results[0].geometry.location.lng,
                    locationLat: result.results[0].geometry.location.lat
                })
                let specLocation = this.state.locationLat + "," + this.state.locationLng
                let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + specLocation
                    + distance + type + "&key=AIzaSyDA8JeZ3hy9n1XHBBuq6ke8M9BfiACME_E";
                console.log(url)
                fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        this.setState({
                            loading: ""
                        })
                        this.setState({
                            results: result.results,
                            searchType: 'keyword',
                        });
                        console.log(this.state.results)
                    });
            });


    }

    getCategories() {
        fetch('http://10.0.2.2:5000/api/categories')
            .then((response) => response.json())
            .then((responseJson) => {
                let temp = [];
                let radio = [];
                this.setState({
                    categories: responseJson
                }), function() {

                }

                for (var key in this.state.categories) {
                    temp.push(key)
                    object = {label: key.split('_').join(' '), value: key,}
                    radio.push(object)
                }
                this.setState({
                    keyList: temp,
                    radioObject: radio,
                })
                //console.log(this.state.keyList)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.info}>
                        <Image source={background} style={styles.background}/>
                        <View style={styles.infoText}>
                            <Text style={styles.title}>Search TravelBuddy</Text>
                            <Picker style={styles.picker} selectedValue = {this.state.searchType} onValueChange = {this.searchType}>
                                <Picker.Item label="City search" value="city" />
                                <Picker.Item label="Keyword search" value="keyword" />
                            </Picker>
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid='transparent'
                                placeholder="Do your search"
                                onChangeText={this.changeInput}
                            />
                            <TouchableOpacity style={styles.button} onPress={this.checkSearch}>
                                <Text style={styles.buttonText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.searchType === 'city' &&
                    <View style={styles.filter}>
                        <View styles={styles.childFilter}>
                            <Text>Max. distance</Text>
                            <RadioForm
                                radio_props={radius}
                                initial={0}
                                buttonColor={'#ff922b'}
                                selectedButtonColor={'#ff922b'}
                                onPress={(value) => {this.setState({radius:value})}}
                            />
                        </View>
                        <View>
                            <Text>Type of result</Text>
                            <View style={styles.typeFilter}>
                                <ScrollView>
                                    <RadioForm
                                        radio_props={this.state.radioObject}
                                        initial={0}
                                        buttonColor={'#ff922b'}
                                        selectedButtonColor={'#ff922b'}
                                        onPress={(value) => {this.setState({type:value})}}
                                    />
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                    }
                    <View>

                        <ResultList results={this.state.results} />
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
        width: 320,
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
    childFilter: {
    },
    typeFilter: {
    }
});