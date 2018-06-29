import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MaskTabBar from 'react-native-scrollable-tab-view-mask-bar';
import Favorites from '../tab/favorites/Favorites';
import Settings from '../tab/settings/Settings';
import Preferences from '../tab/preferences/Preferences';
import Logout from '../tab/logout/Logout';

export default class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = { count: 1 }

        this.onPressClick = this.onPress.bind(this);

    }

    onPress = () => {
        this.setState({
            count: this.state.count+1,
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
                    <Preferences tabLabel="Preferences" index={0} compare={this.props.compare} cat={this.props.cat}/>
                    <Favorites tabLabel="Favorites" index={1}/>
                    <Settings tabLabel="Settings" index={2}/>
                    <Favorites tabLabel="Friends" index={3}/>
                    <Logout tabLabel="Logout" index={3} function={this.props.func}/>
                </ScrollableTabView>
            </View>
            )

    }

}

const styles = StyleSheet.create({
    tabContainer: {
       position: 'relative',
       minHeight: 750,
    },
});

const tabUnderlineStyle = {
    position: 'absolute',
    height: 4,
    backgroundColor: '#ff922b',
    bottom: 0,
};