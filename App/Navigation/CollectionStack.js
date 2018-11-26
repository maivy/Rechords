import React from 'react';
import { createStackNavigator } from 'react-navigation';

import * as screens from '../Screens';
import { Images, Styles } from '../Themes';

const CollectionStack = createStackNavigator({
    CollectionScreen: { screen: screens.RechordCollectionScreen },
    ViewerScreen: { screen: screens.RechordViewerScreen },
  }, {
    initialRouteName: 'CollectionScreen',
    headerMode: 'none',
    mode: 'modal',
    cardStyle: { backgroundColor: 'white' },
  });

export default CollectionStack