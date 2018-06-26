import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MaskTabBar from 'react-native-scrollable-tab-view-mask-bar';
import Tab from '../tab/Tab';
import Settings from '../tab/SettingsTab';

export default class User extends React.Component {

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
                    <Tab tabLabel="Preferences"/>
                    <Tab tabLabel="Places" />
                    <Settings tabLabel="Settings" />
                    <Tab tabLabel="Friends" />
                </ScrollableTabView>
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