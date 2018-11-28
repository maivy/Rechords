import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Foundation } from '@expo/vector-icons';


import * as screens from '../Screens';
import { Metrics, Images, Styles } from '../Themes';

const CollectionStack = createStackNavigator({
    CollectionScreen: { screen: screens.RechordCollectionScreen },
    ViewerScreen: { screen: screens.RechordViewerScreen },
  }, {
    initialRouteName: 'CollectionScreen',
    headerMode: 'none',
    mode: 'modal',
    cardStyle: { backgroundColor: 'white' },
});

CollectionStack.navigationOptions = ({navigation}) => {
  const { params = {} } = navigation.state;

  const tabBarOptions = {
    tabBarLabel: 'Rechord Collection',
    tabBarIcon: ({ tintColor }) => (
      <Foundation
        name='record'
        color={tintColor}
        size={Metrics.icons.small}
      />
    ),
  }

  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    return { tabBarVisible };
  }

  const result = {
    ...tabBarOptions,
  }

  return result;
};

export default CollectionStack