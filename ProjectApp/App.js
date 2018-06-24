import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Header from './header/Header';
import City from './city/City';
import Places from './places/Places';
import Modal from './modal/Modal';
import Navigation from "./Navigation";

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            results: [],
            categories: ["restaurant", "bar"],
            querySet: false,
            range: "5000",
        }
    }

    componentDidMount() {
        let proxy  = 'https://cors-anywhere.herokuapp.com/';
        fetch('http://api.ipstack.com/check?access_key=201a9fbb71fcb2b3195f6626795b5907')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    countryName: responseJson.country_name,
                    regionName: responseJson.region_name,
                    city: responseJson.city,
                    name: responseJson.location.languages[0].name,
                    countryFlag: responseJson.location.country_flag,
                    callingCode: responseJson.location.calling_code,
                    longitude: responseJson.longitude,
                    latitude: responseJson.latitude
                }, function(){

                });
                let places = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
                    + this.state.latitude + ',' + this.state.longitude;
                this.setState({
                    query: places,
                    querySet: true
                });
            }).catch((error) => {
            console.error(error);
        });
    }

    handleClick = () => {
        this.setState({
            show: !this.state.show
        });
    };


    modalHandler = (name) => {
        this.setState({
            showModal: true,
            modalName: name,
        })
    }


    hideModal = () => {
        this.setState({showModal: false})
    };

    render() {

        let viewModal = null;
        if(this.state.showModal){
            viewModal = <Modal
                click={this.hideModal}
                image = {this.state.modalImage}
                name = {this.state.modalName}
                address={this.state.modalAddress}
                open = {this.state.modalOpen}
                lat = {this.state.modalLat}
                lng = {this.state.modalLng}
                id = {this.state.modalId}
                latitude = {this.state.latitude}
                longitude = {this.state.longitude}
                currentLat = {this.state.latitude}
                currentLng = {this.state.longitude}
            />
        }

        if(!this.state.querySet) {
            return (
                <View style={{flex: 1}}>
                    <ScrollView>
                        <View>
                            <Header />
                            <City
                                city={this.state.city}
                                wikitext={this.state.text}
                                callingCode={this.state.callingCode}
                                region={this.state.regionName}
                                country={this.state.countryName}
                            />
                        </View>
                    </ScrollView>
                </View>
            )
        }

        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View>
                        <Header />
                        <City
                            city={this.state.city}
                            wikitext={this.state.text}
                            callingCode={this.state.callingCode}
                            region={this.state.regionName}
                            country={this.state.countryName}
                        />
                        <View style={styles.placesContainer}>
                            {this.state.categories.map((category,index) => {
                                return <Places
                                    cat={category}
                                    query={this.state.query}
                                    key={index}
                                />
                            })}
                        </View>
                    </View>
                </ScrollView>
                <Navigation />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    placesContainer: {
        marginBottom: 75,
    },
});