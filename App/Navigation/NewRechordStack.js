import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import * as screens from '../Screens';
import { Images, Styles, Colors } from '../Themes';

const NewRechordStack = createStackNavigator({
	Home: { screen: screens.Home },
}, {
    initialRouteName: 'Home',
    headerMode: 'none',
    cardStyle: { backgroundColor: 'white' },
});

NewRechordStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
        return { tabBarVisible };
    }
    
    const tabBarOptions = {
        tabBarLabel: 'New Rechord',
        tabBarIcon: ({ tintColor }) => {
        let icon;
        if (tintColor === Colors.white) {
            icon =
            <Image
                source={Images.navAddWhite}
                styles={Styles.tabIcon} />
        } else {
            icon =
            <Image
                source={Images.navAddPurple}
                styles={Styles.tabIcon} />
        }
    
        return icon;
        },
    }
    
    const result = {
        ...tabBarOptions,
    }
    
    return result;

}

export default NewRechordStack;