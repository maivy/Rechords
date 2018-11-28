import React from 'react';
import { StyleSheet, Image, Text, SafeAreaView } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import * as screens from '../Screens';
import { CollectionStack } from '.'
import { Images, Colors, Styles } from '../Themes';

const NewRechordStack = createStackNavigator({
	Home: { screen: screens.Home },
	// SearchForSong: { screen: screens.SearchForSong },
	// EditRechord: { screen: screens.EditRechord },
}, {
	initialRouteName: 'Home',
});

const ExploreStack = createStackNavigator({
	Explore: { screen: screens.Explore },
}, {
	initialRouteName: 'Explore',
});

const styles = StyleSheet.create({
	tabLabel: {
		fontSize: 10,
		color: Colors.white
	}
})

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
		inactiveBackgroundColor: Colors.white
	},
	// navigationOptions: ({ navigation }) => ({
	// 	tabBarLabel: () => {
	// 		const { routeName } = navigation.state;
	// 		if (routeName === 'RechordCollection') {
	// 			return (
	// 				<Text style={styles.tabLabel}>Rechord Collection</Text>
	// 			)
	// 		} else return (
	// 			<Text style={styles.tabLabel}>{routeName}</Text>
	// 		)
	// 	},
	// 	tabBarIcon: ({ focused, horizontal }) => {
	// 		const { routeName } = navigation.state;
	// 		let icon;

	// 		if (routeName === 'RechordCollection') {
	// 			icon =
	// 				<Image
	// 					style={Styles.tabIcon}
	// 					source={Images.recordIconBlue} />;
	// 		}

	// 		return icon;
	// 	}
	// })
});

export default NavBar;