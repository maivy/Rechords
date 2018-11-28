import { createBottomTabNavigator } from 'react-navigation'

// import * as screens from '../Screens';
import { NewRechordStack, CollectionStack, ExploreStack } from './';

import { Metrics, Colors } from '../Themes';

const NavBar = createBottomTabNavigator({
	RechordCollection: { screen: CollectionStack },
	NewRechord: { screen: NewRechordStack },
	Explore: { screen: ExploreStack },
}, {
	initialRouteName: 'RechordCollection',
	tabBarOptions: {
		activeTintColor: Colors.white,
		activeBackgroundColor: Colors.purple,
		inactiveTintColor: Colors.purple,
		inactiveBackgroundColor: Colors.white,
		style: {
			height: Metrics.navBarHeight,
		}
	},
});

export default NavBar;