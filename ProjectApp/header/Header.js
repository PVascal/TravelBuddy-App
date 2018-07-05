import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Not logged in',
            loginStatus: "Not logged in",
            welcome: "",
            avatar: '',
            check: false,
        }
        this.loginCheck()
    }

    loginCheck() {
        fetch('http://145.37.144.146:5000/api/loginCheck')
            .then((response) => response.json())
            .then((responseJson)=> {
                if (responseJson['username'] != null) {
                    this.setState({
                        name: responseJson['username'],
                        welcome: "Welcome "
                    })
                } else {
                    this.setState({
                        name: "Not logged in",
                        welcome: "",
                    })
                }
            }).catch((error) => {
            console.log(error)
        })
    }

    componentDidUpdate() {
        if (this.state.loginStatus !== this.props.status) {
            this.loginCheck()
            this.setState({
                loginStatus: this.props.status,
            })
        }
    }

    componentDidMount() {
            this.loginCheck()
            this.setState({
                loginStatus: this.props.status,
            })
    }


    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.half}>
                        <Text>{this.state.welcome + this.state.name}</Text>
                    </View>
                    <Text>Never travel alone</Text>
                </View>
    </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff922b',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        flexWrap:'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    half: {
        flex: 1,
    },
});



