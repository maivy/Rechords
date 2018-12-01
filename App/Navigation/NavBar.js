import { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation'

import { NewRechordStack, CollectionStack, ExploreStack } from './';

import { Metrics, Colors } from '../Themes';

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            const {navigation: {state: {params}}} = this.props
            return <SomeComponent {...params} {...this.props} />
        }
    }
}

const NavBar = createBottomTabNavigator({
	RechordCollection: { screen: mapNavigationStateParamsToProps(CollectionStack) },
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