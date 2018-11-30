import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
// import { CollectionStack } from './CollectionStack';
import * as screens from '../Screens';
import { Images, Styles, Colors } from '../Themes';

const ExploreStack = createStackNavigator({
    Explore: { screen: screens.Explore },
    LocationCollection: { screen: screens.LocationCollectionScreen },
    ViewerScreen: { screen: screens.ViewerScreen },
}, {
    initialRouteName: 'Explore',
    headerMode: 'none',
    cardStyle: { backgroundColor: 'white' },
});

ExploreStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
        return { tabBarVisible };
    }
    
    const tabBarOptions = {
        tabBarIcon: ({ tintColor }) => {
        let icon;
        if (tintColor === Colors.white) {
            icon =
            <Image
                source={Images.navGlobeWhite}
                styles={Styles.tabIcon} />
        } else {
            icon =
            <Image
                source={Images.navGlobePurple}
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

export default ExploreStack;