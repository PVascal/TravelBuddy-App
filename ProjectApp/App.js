import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Header from './header/Header';
import City from './city/City';
import Places from './places/Places';


export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            results: [],
            categories: ["restaurant", "bar"],
            query: "",
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
                this.setState({query: places});
            }).catch((error) => {
            console.error(error);
        });


    }

  render() {


    return (
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
              <Places cat={this.state.categories} query={this.state.query} />
          </View>
        </ScrollView>
    );
  }
}
