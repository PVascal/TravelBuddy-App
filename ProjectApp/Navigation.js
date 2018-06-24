import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation'

export default class Navigation extends React.Component {
    tabs = [
        {
            key: 'games',
            icon: 'gamepad-variant',
            label: 'Home',
            barColor: 'orange',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'movies-tv',
            icon: 'movie',
            label: 'Profile',
            barColor: 'orange',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'music',
            icon: 'music-note',
            label: 'Login',
            barColor: 'orange',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ]

    render() {
        return (
            <View style={styles.navigation}>
                <BottomNavigation
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
                renderIcon={this.renderIcon}
            />
        )
    }

    renderIcon = iconName => ({ isActive }) => {
        return <Icon size={24} color="white" name={"rocket"} />
    }

}


const styles = StyleSheet.create({
    navigation: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});