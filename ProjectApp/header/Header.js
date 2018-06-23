import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import logo from '../images/logo.png';

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
                name: 'Welcome Pascal',
                avatar: '',
                check: false
        }
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.half}>
                        <Text>{this.state.name}</Text>
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
                <View style={styles.logo}>
                    <Image source={logo}/>
                </View>
    </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
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



