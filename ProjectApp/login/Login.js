import React from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput, Button, TouchableHighlight, Alert} from 'react-native';

import axios from 'axios';
import Config from "../Config";

var t = require('tcomb-form-native');
var Form = t.form.Form;

var Login = t.struct({
    name: t.String,
    password: t.String,
});


var loginOptions = {
    fields: {
        name: {
            label: 'Email address',
            error: 'Insert a valid email'
        },
        password: {
            label: 'Password',
            error: 'Insert a valid password',
            secureTextEntry: true
        }
    }
};

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

var Register = t.struct({
    username: t.String,
    email: t.String,
    firstname: t.String,
    lastname: t.String,
    password: t.String,
    country: countryCodes,
});

var registerOptions = {
    fields: {
        username: {
            label: 'Username',
            error: 'Insert a valid username'
        },
        email: {
            label: 'Email address',
            error: 'Insert a valid email'
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
            error: 'Insert a valid password',
            secureTextEntry: true
        },
        country: {
            label: "Country",
            error: 'Insert a valid country',
        }
    }
};



export default class Preferences extends React.Component {

    errorLogin = () => {
        Alert.alert(
           "Invalid email or password."
        )
    }

    registerError = () => {
        Alert.alert(
            this.state.errorMessage
        )
    }

    constructor(props) {
        super(props);

        this.state = {
            register: false,
            username: "",
            ok: true,
            errorMessage: ""
        }

        this.sendCredentials = this.sendCredentials.bind(this);
        this.sendRegister = this.sendRegister.bind(this);
        this.changePage = this.changePage.bind(this);

    }

    componentDidMount() {
        //this.props.func("Hello World");
    }

    sendCredentials() {

        var value = this.refs.form.getValue();

        if (value != null) {
            let url = Config.ip + '/login';
            url += "?email=" + value.name;
            url += "&password=" + value.password;

            axios.post(url)
                .then(response => {
                    console.log(response)
                })
                .then(() => {
                    fetch(Config.ip + '/api/loginCheck')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson['username'])
                            this.setState({
                                username: responseJson['username'],
                            })
                            this.props.func("Hello World");
                        }).catch((error) => {
                        console.log(error)
                    })
                })
                .catch((error) => {
                    console.log(error)
                    this.errorLogin()
            })
        }

    }

    sendRegister() {

        var value = this.refs.form.getValue();

        if (value != null) {
            this.props.func("register")

            var value = this.refs.form.getValue();

            if (value != null) {
                let url = Config.ip + '/register';
                url += "?firstName=" + value.firstname;
                url += "&lastName=" + value.lastname;
                url += "&username=" + value.username;
                url += "&email=" + value.email;
                url += "&password=" + value.password;
                url += "&country=" + value.country;

                axios.post(url)
                    .then(response => {
                        console.log(response)
                    }).then(() => {
                        this.setState({
                            register: false,
                        })
                    })
                    .catch((error) => {
                    this.setState({
                        errorMessage: error.response.data.message,
                    })
                    this.registerError()
                })
            }
        }
    }

    changePage() {
        if (!this.state.register) {
            this.setState({register: true})
        } else {
            this.setState({register: false})
        }
    }

    render() {
        return (
            <View>
                {!this.state.register &&
                <View style={styles.container}>
                    <Text style={{fontSize: 30}}>Sign in with TravelBuddy</Text>
                    <View style={styles.loginContainer}>
                        <Form
                            ref="form"
                            type={Login}
                            options={loginOptions}
                        />
                        <Button onPress={this.sendCredentials} title="Login" color="#495057"/>
                        <View style={styles.registerText}>
                            <Text style={styles.noAccount}>No account?</Text>
                                <Button title={"Register here"} onPress={this.changePage} color={"#495057"}/>
                            <Text>{this.state.username}</Text>
                        </View>
                    </View>
                </View>}
                {this.state.register &&
                <View style={styles.container}>
                    <Text style={{fontSize: 30}}>Register to TravelBuddy</Text>
                    <View style={styles.loginContainer}>
                        <Form
                            ref="form"
                            type={Register}
                            options={registerOptions}
                        />
                        <Button onPress={this.sendRegister} title="Register" color="#495057"/>
                        <View style={styles.registerText}>
                            <Text>Already a member?</Text>
                            <TouchableHighlight onPress={this.changePage}>
                                <Text>Login</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>}
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    loginContainer: {
        marginTop: 25,
    },
    formContainer: {
        marginBottom: 25,
    },
    registerText: {
        marginTop: 25,
        borderTopWidth: 1,
        borderColor: 'gray',
        paddingTop: 25,
    },
    noAccount: {
        marginBottom: 15,
    }
})