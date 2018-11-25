import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { Foundation } from '@expo/vector-icons'
//import { Images, Colors, Metrics } from '../Themes'

export default class CollectionView extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    const tabBarOptions = {
      tabBarLabel: 'Rechord Collection',
      tabBarIcon: ({ tintColor }) => (
        <Foundation
          name='record'
          color={tintColor}
          size={Metrics.icons.small}
        />
      )
    }

    const result = {
      ...tabBarOptions,
    }

    return result;
  }

  render() {
    return (
      <View>
        <Text>Collection View</Text>
      </View>
    );
  }
}