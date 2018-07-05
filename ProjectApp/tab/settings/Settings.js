import React from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';

import axios from 'axios';

var t = require('tcomb-form-native');
var Form = t.form.Form;


var countryCodes = t.enums({
    "AD": "Andorra","AE": "United Arab Emirates",
    "AF": "Afghanistan",
    "AG": "Antigua and Barbuda",
    "AI": "Anguilla",
    "AL": "Albania",
    "AM": "Armenia",
    "AO": "Angola",
    "AQ": "Antarctica",
    "AR": "Argentina",
    "AS": "American Samoa",
    "AT": "Austria",
    "AU": "Australia",
    "AW": "Aruba",
    "AX": "Åland Islands",
    "AZ": "Azerbaijan",
    "BA": "Bosnia and Herzegovina",
    "BB": "Barbados",
    "BD": "Bangladesh",
    "BE": "Belgium",
    "BF": "Burkina Faso",
    "BG": "Bulgaria",
    "BH": "Bahrain",
    "BI": "Burundi",
    "BJ": "Benin",
    "BL": "Saint Barthélemy",
    "BM": "Bermuda",
    "BN": "Brunei Darussalam",
    "BO": "Bolivia, Plurinational State of",
    "BQ": "Bonaire, Sint Eustatius and Saba",
    "BR": "Brazil",
    "BS": "Bahamas",
    "BT": "Bhutan",
    "BV": "Bouvet Island",
    "BW": "Botswana",
    "BY": "Belarus",
    "BZ": "Belize",
    "CA": "Canada",
    "CC": "Cocos (Keeling) Islands",
    "CD": "Congo, the Democratic Republic of the",
    "CF": "Central African Republic",
    "CG": "Congo",
    "CH": "Switzerland",
    "CI": "Côte d'Ivoire",
    "CK": "Cook Islands",
    "CL": "Chile",
    "CM": "Cameroon",
    "CN": "China",
    "CO": "Colombia",
    "CR": "Costa Rica",
    "CU": "Cuba",
    "CV": "Cape Verde",
    "CW": "Curaçao",
    "CX": "Christmas Island",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DE": "Germany",
    "DJ": "Djibouti",
    "DK": "Denmark",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "DZ": "Algeria",
    "EC": "Ecuador",
    "EE": "Estonia",
    "EG": "Egypt",
    "EH": "Western Sahara",
    "ER": "Eritrea",
    "ES": "Spain",
    "ET": "Ethiopia",
    "FI": "Finland",
    "FJ": "Fiji",
    "FK": "Falkland Islands (Malvinas)",
    "FM": "Micronesia, Federated States of",
    "FO": "Faroe Islands",
    "FR": "France",
    "GA": "Gabon",
    "GB": "United Kingdom",
    "GD": "Grenada",
    "GE": "Georgia",
    "GF": "French Guiana",
    "GG": "Guernsey",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GL": "Greenland",
    "GM": "Gambia",
    "GN": "Guinea",
    "GP": "Guadeloupe",
    "GQ": "Equatorial Guinea",
    "GR": "Greece",
    "GS": "South Georgia and the South Sandwich Islands",
    "GT": "Guatemala",
    "GU": "Guam",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HK": "Hong Kong",
    "HM": "Heard Island and McDonald Islands",
    "HN": "Honduras",
    "HR": "Croatia",
    "HT": "Haiti",
    "HU": "Hungary",
    "ID": "Indonesia",
    "IE": "Ireland",
    "IL": "Israel",
    "IM": "Isle of Man",
    "IN": "India",
    "IO": "British Indian Ocean Territory",
    "IQ": "Iraq",
    "IR": "Iran, Islamic Republic of",
    "IS": "Iceland",
    "IT": "Italy",
    "JE": "Jersey",
    "JM": "Jamaica",
    "JO": "Jordan",
    "JP": "Japan",
    "KE": "Kenya",
    "KG": "Kyrgyzstan",
    "KH": "Cambodia",
    "KI": "Kiribati",
    "KM": "Comoros",
    "KN": "Saint Kitts and Nevis",
    "KP": "Korea, Democratic People's Republic of",
    "KR": "Korea, Republic of",
    "KW": "Kuwait",
    "KY": "Cayman Islands",
    "KZ": "Kazakhstan",
    "LA": "Lao People's Democratic Republic",
    "LB": "Lebanon",
    "LC": "Saint Lucia",
    "LI": "Liechtenstein",
    "LK": "Sri Lanka",
    "LR": "Liberia",
    "LS": "Lesotho",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "LV": "Latvia",
    "LY": "Libya",
    "MA": "Morocco",
    "MC": "Monaco",
    "MD": "Moldova, Republic of",
    "ME": "Montenegro",
    "MF": "Saint Martin (French part)",
    "MG": "Madagascar",
    "MH": "Marshall Islands",
    "MK": "Macedonia, the former Yugoslav Republic of",
    "ML": "Mali",
    "MM": "Myanmar",
    "MN": "Mongolia",
    "MO": "Macao",
    "MP": "Northern Mariana Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MS": "Montserrat",
    "MT": "Malta",
    "MU": "Mauritius",
    "MV": "Maldives",
    "MW": "Malawi",
    "MX": "Mexico",
    "MY": "Malaysia",
    "MZ": "Mozambique",
    "NA": "Namibia",
    "NC": "New Caledonia",
    "NE": "Niger",
    "NF": "Norfolk Island",
    "NG": "Nigeria",
    "NI": "Nicaragua",
    "NL": "Netherlands",
    "NO": "Norway",
    "NP": "Nepal",
    "NR": "Nauru",
    "NU": "Niue",
    "NZ": "New Zealand",
    "OM": "Oman",
    "PA": "Panama",
    "PE": "Peru",
    "PF": "French Polynesia",
    "PG": "Papua New Guinea",
    "PH": "Philippines",
    "PK": "Pakistan",
    "PL": "Poland",
    "PM": "Saint Pierre and Miquelon",
    "PN": "Pitcairn",
    "PR": "Puerto Rico",
    "PS": "Palestinian Territory, Occupied",
    "PT": "Portugal",
    "PW": "Palau",
    "PY": "Paraguay",
    "QA": "Qatar",
    "RE": "Réunion",
    "RO": "Romania",
    "RS": "Serbia",
    "RU": "Russian Federation",
    "RW": "Rwanda",
    "SA": "Saudi Arabia",
    "SB": "Solomon Islands",
    "SC": "Seychelles",
    "SD": "Sudan",
    "SE": "Sweden",
    "SG": "Singapore",
    "SH": "Saint Helena, Ascension and Tristan da Cunha",
    "SI": "Slovenia",
    "SJ": "Svalbard and Jan Mayen",
    "SK": "Slovakia",
    "SL": "Sierra Leone",
    "SM": "San Marino",
    "SN": "Senegal",
    "SO": "Somalia",
    "SR": "Suriname",
    "SS": "South Sudan",
    "ST": "Sao Tome and Principe",
    "SV": "El Salvador",
    "SX": "Sint Maarten (Dutch part)",
    "SY": "Syrian Arab Republic",
    "SZ": "Swaziland",
    "TC": "Turks and Caicos Islands",
    "TD": "Chad",
    "TF": "French Southern Territories",
    "TG": "Togo",
    "TH": "Thailand",
    "TJ": "Tajikistan",
    "TK": "Tokelau",
    "TL": "Timor-Leste",
    "TM": "Turkmenistan",
    "TN": "Tunisia",
    "TO": "Tonga",
    "TR": "Turkey",
    "TT": "Trinidad and Tobago",
    "TV": "Tuvalu",
    "TW": "Taiwan, Province of China",
    "TZ": "Tanzania, United Republic of",
    "UA": "Ukraine",
    "UG": "Uganda",
    "UM": "United States Minor Outlying Islands",
    "US": "United States",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VA": "Holy See (Vatican City State)",
    "VC": "Saint Vincent and the Grenadines",
    "VE": "Venezuela, Bolivarian Republic of",
    "VG": "Virgin Islands, British",
    "VI": "Virgin Islands, U.S.",
    "VN": "Viet Nam",
    "VU": "Vanuatu",
    "WF": "Wallis and Futuna",
    "WS": "Samoa",
    "YE": "Yemen",
    "YT": "Mayotte",
    "ZA": "South Africa",
    "ZM": "Zambia",
    "ZW": "Zimbabwe",
});

var Settings = t.struct({
    firstname: t.String,
    lastname: t.String,
    username: t.String,
    email: t.String,
    password: t.String,
    country: countryCodes,
});


var updateOptions = {
    order: ['username', 'email', 'firstname', 'lastname', 'password', 'country'],
    fields: {
        username: {
            label: 'Username',
            error: 'Insert a valid username',
            editable: false,
        },
        email: {
            label: 'Email address',
            error: 'Insert a valid email',
            editable: false,
        },
        firstname: {
            label: 'First name',
            error: 'Insert your first name'
        },
        lastname: {
            label: 'Last name',
            error: 'Insert your last name'
        },
        password: {
            label: 'Password',
            error: 'Insert your password',
            secureTextEntry: true
        },
        country: {
            label: "Country",
            error: 'Insert a valid country',
        }
    }
};



export default class AccountSettings extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        country: "",
        password: "",
        usernameId: "",
        loggedIn: false,
        countries: [],
        values: [],
        message: "",
    }

    showAlert = () => {
        Alert.alert(
            this.state.message,
        )
    }



    constructor(props) {
        super(props);

        fetch('http://145.37.144.146:5000/api/loginCheck')
            .then((response) => response.json())
            .then((responseJson)=> {
                if (responseJson['username'] != null) {
                    this.setState({
                        usernameId: responseJson['username'],
                        loggedIn: true,
                    })
                }
                this.loadData()
            }).catch((error) => {
            console.log(error)
        })

        this.saveSettings = this.saveSettings.bind(this);

    }


    loadData() {
        if(this.state.loggedIn) {
            let url = 'http://145.37.144.146:5000/api/user';
            axios.get(url)
                .then(result => {
                    result = result.data;
                    valuesList = {
                        firstname: result.firstName,
                        lastname: result.lastName,
                        username: result.username,
                        email: result.email,
                        password: "",
                        country: result.country,
                    }
                    this.setState({
                        firstName: result.firstName,
                        lastName: result.lastName,
                        username: result.username,
                        email: result.email,
                        country: result.country,
                        values: valuesList,
                    });

                });
        }
    }

    saveSettings() {
        var value = this.refs.form.getValue();

        if (value != null) {
            let url = 'http://145.37.144.146:5000/api/user';
            url += "?firstName=" + value.firstname;
            url += "&lastName=" + value.lastname;
            url += "&username=" + value.username;
            url += "&email=" + value.email;
            url += "&password=" + value.password;
            url += "&country=" + value.country;

            axios.put(url)
                .then(response => {
                    if(response.data) {
                        this.setState({
                            message: response.data.message,
                            messageId: "messageOk",
                            password: "",
                        });
                        window.setTimeout(() =>
                            this.setState({
                            message: null,
                            messageId: null
                        }), 2000);
                        this.loadData()
                        this.showAlert()
                    }
                })
                .catch(error => {
                    console.log("Error message: " + error.response.data.message)
                    this.setState({
                        message: error.response.data.message,
                        messageId: "messageError",
                    });
                    this.showAlert()
                });
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30}}>Account settings</Text>
                <View>
                    <View style={styles.settingsContainer}>
                        <Form
                            ref="form"
                            type={Settings}
                            value={this.state.values}
                            options={updateOptions}
                        />
                        <Button onPress={this.saveSettings} title="Save settings" color="#495057"/>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingTop: 20,
        paddingBottom: 50,
        paddingLeft: 10,
        paddingRight: 10,
    },
    settingsContainer: {
        marginTop: 25,
    },
    formContainer: {
        marginBottom: 25,
    },
    message: {
        fontSize: 30,
        marginTop: 15,
        marginBottom: 30,
    }
})