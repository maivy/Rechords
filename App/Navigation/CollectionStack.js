import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import * as screens from '../Screens';
import { Images, Styles, Colors } from '../Themes';

const mapNavigationStateParamsToProps = (SomeComponent) => {
  return class extends Component {
      static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
      render() {
          const {navigation: {state: {params}}} = this.props
          return <SomeComponent {...params} {...this.props} />
      }
  }
}

const CollectionStack = createStackNavigator({
    CollectionScreen: { screen: mapNavigationStateParamsToProps(screens.CollectionScreen) },
    ViewerScreen: { screen: screens.ViewerScreen },
    ShareScreen: { screen: screens.ShareScreen },
    EditScreen: { screen: screens.EditRechordScreen },
  }, {
    initialRouteName: 'CollectionScreen',
    headerMode: 'none',
    mode: 'modal',
    cardStyle: { backgroundColor: 'white' },
});

CollectionStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    return { tabBarVisible };
  }

  const tabBarOptions = {
    tabBarLabel: 'Rechord Collection',
    tabBarIcon: ({ tintColor }) => {
      let icon;
      if (tintColor === Colors.white) {
        icon =
          <Image
            source={Images.navRechordWhite}
            styles={Styles.tabIcon} />
      } else {
        icon =
          <Image
            source={Images.navRechordPurple}
            styles={Styles.tabIcon} />
      }

      return icon;
    },
  }

  const result = {
    ...tabBarOptions,
  }

  return result;
};

export default CollectionStack