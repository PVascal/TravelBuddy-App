import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

export default class Header extends React.Component {

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

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
        fetch('http://10.0.2.2:5000/api/loginCheck')
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


    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.half}>
                        <Text>{this.state.welcome + this.state.name}</Text>
                    </View>
                    <Menu
                        style={styles.half}
                        ref={this.setMenuRef}
                        button={<Text onPress={this.showMenu}>Menu</Text>} >
                        <MenuItem onPress={this.hideMenu}>Home</MenuItem>
                        <MenuItem onPress={this.hideMenu}>Profile</MenuItem>
                        <MenuItem onPress={this.hideMenu}>Add event </MenuItem>
                        <MenuItem onPress={this.hideMenu}>Login</MenuItem>
                    </Menu>
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
    logo: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});



