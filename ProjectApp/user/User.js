import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MaskTabBar from 'react-native-scrollable-tab-view-mask-bar';
import Tab from '../tab/Tab';
import Settings from '../tab/SettingsTab';

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
                    <Tab tabLabel="Preferences" index={0}/>
                    <Tab tabLabel="Places" index={1}/>
                    <Settings tabLabel="Settings" index={2}/>
                    <Tab tabLabel="Friends" index={3}/>
                </ScrollableTabView>
            </View>
            )

    }

}

const styles = StyleSheet.create({
    tabContainer: {
       position: 'relative',
       minHeight: 400,
    },
});

const tabUnderlineStyle = {
    position: 'absolute',
    height: 4,
    backgroundColor: '#ff922b',
    bottom: 0,
};