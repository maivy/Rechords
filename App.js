import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'

import * as screens from './App/Screens/';
import { CollectionStack } from './App/Navigation'
import { Metrics, Images, Colors } from './App/Themes';

import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyD_vD_Nv5vj46_Tsvvn0Ton4grfSbodnuI",
    authDomain: "rechords-7b3a3.firebaseapp.com",
    databaseURL: "https://rechords-7b3a3.firebaseio.com",
    projectId: "rechords-7b3a3",
    storageBucket: "rechords-7b3a3.appspot.com",
    messagingSenderId: "396699023083"
  };
  firebase.initializeApp(config);

const StackNav = createStackNavigator({
  Create: { screen: CreateAccount },
}, {
  initialRouteName: 'Create',
  header: 'none',
});

export default class App extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CollectionStack />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
