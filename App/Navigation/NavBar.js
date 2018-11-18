import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import * as screens from '../Screens';

const RechordCollectionStack = createStackNavigator({
	CollectionView: { screen: screens.CollectionView },
	// FriendCollection: { screen: FriendCollection },	// Needed?
	// RechordView: { screen: screens.RechordView },
	// SendToFriend: { screen: screens.SendToFriend },
	// EditRechord: { screen: screens.EditRechord },
}, {
	initialRouteName: 'CollectionView',
});

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

const NavBar = createBottomTabNavigator({
	RechordCollection: { screen: RechordCollectionStack },
	NewRechord: { screen: NewRechordStack },
	Explore: { screen: ExploreStack },
}, {
	initialRouteName: 'NewRechord'
});

export default NavBar;