import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import NavBar from './App/Navigation/NavBar';
import CreateAccount from './App/Screens/CreateAccount';
import ActionBar from './App/Components/ActionBar';
import SignIn from './App/Screens/SignIn';

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

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
  // componentDidMount() {
  //   Font.loadAsync({
  //     'avenir': require('./assets/Avenir.ttc'),
  //   });
  // }

  render() {
    //if(user is not logged in)
    return (
      <View>
        <StackNav/>
      </View>
      // <ActionBar/>
      // <CreateAccount />
      // <SignIn />
      // <NavBar />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
