import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation'

export default class Navigation extends React.Component {

    state = {
        activeTab: 'home',
    }

    tabs = [
        {
            key: 'home',
            icon: 'home',
            label: 'Home',
            barColor: 'orange',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'profile',
            icon: 'user',
            label: 'Profile',
            barColor: 'orange',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'login',
            icon: 'sign-in',
            label: 'Login',
            barColor: 'orange',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ]

    render() {
        return (
            <View style={styles.navigation}>
                <BottomNavigation
                    onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                    renderTab={this.renderTab}
                    tabs={this.tabs}
                />
            </View>
        )
    }

    renderTab = ({ tab, isActive }) => {
        return (
            <FullTab
                key={tab.key}
                isActive={isActive}
                label={tab.label}
                renderIcon={this.renderIcon(tab.icon)}
            />
        )
    }

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    )

}


const styles = StyleSheet.create({
    navigation: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});