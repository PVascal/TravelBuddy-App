import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MaskTabBar from 'react-native-scrollable-tab-view-mask-bar';
import Favorites from '../tab/favorites/Favorites';
import Settings from '../tab/settings/Settings';

export default class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = { count: 0 }
    }

    onPress = () => {
        this.setState({
            count: this.state.count+1
        })
    }


    render() {
        return (
            <View style={styles.tabContainer}>
                <ScrollableTabView
                    renderTabBar={() => <MaskTabBar
                        activeTextColor={'white'}
                        inactiveTextColor={'white'}
                        underlineStyle={tabUnderlineStyle}
                        backgroundColor={"#495057"}
                        showMask={false} maskMode='light' />}>
                    <Favorites tabLabel="Preferences"/>
                    <Favorites tabLabel="Places" />
                    <Settings tabLabel="Settings" />
                    <Favorites tabLabel="Friends" />
                </ScrollableTabView>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPress}
                >
                    <Text> Touch Here </Text>
                </TouchableHighlight>
                <View>
                    <Text>
                        { this.state.count !== 0 ? this.state.count: null}
                    </Text>
                </View>
            </View>
            )

    }

}

const styles = StyleSheet.create({
    tabContainer: {
       position: 'relative',
    },
});

const tabUnderlineStyle = {
    position: 'absolute',
    height: 4,
    backgroundColor: '#ff922b',
    bottom: 0,
};