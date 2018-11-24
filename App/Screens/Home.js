import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { Ionicons } from '@expo/vector-icons'
//import { Images, Colors, Metrics } from '../Themes'

export default class Home extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    const tabBarOptions = {
      tabBarLabel: 'Create Rechord',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name='ios-add-circle'
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
        <Text>Home</Text>
      </View>
    );
  }
}