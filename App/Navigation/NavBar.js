import { createBottomTabNavigator } from 'react-navigation'

// import * as screens from '../Screens';
import { NewRechordStack, CollectionStack, ExploreStack } from './';

import { Metrics, Colors } from '../Themes';

const NavBar = createBottomTabNavigator({
	RechordCollection: { screen: CollectionStack },
	NewRechord: { screen: NewRechordStack },
	Explore: { screen: ExploreStack },
}, {
	initialRouteName: 'NewRechord',
	tabBarOptions: {
		activeTintColor: Colors.white,
		activeBackgroundColor: Colors.purple,
		inactiveTintColor: Colors.purple,
		inactiveBackgroundColor: Colors.white,
		style: {
			height: Metrics.navBarHeight,
			shadowColor: 'black',
			shadowOffset: {width: 0, height: 4},
			shadowRadius: 10,
			shadowOpacity: 0.8,
			elevation: 5,
		}
	},
});

export default NavBar;