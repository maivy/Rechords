import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'

import * as screens from './App/Screens/';
// import { Record, RecordCover } from './App/Components/';
import { Metrics, Images, Colors } from './App/Themes';
import RecordCoverFlip from './App/Components/RecordCoverFlip';

import firebase from 'firebase';

import NavBar from './App/Navigation/NavBar';
import CreateAccount from './App/Screens/CreateAccount';
import ActionBar from './App/Components/ActionBar';

var config = {
    apiKey: "AIzaSyD_vD_Nv5vj46_Tsvvn0Ton4grfSbodnuI",
    authDomain: "rechords-7b3a3.firebaseapp.com",
    databaseURL: "https://rechords-7b3a3.firebaseio.com",
    projectId: "rechords-7b3a3",
    storageBucket: "rechords-7b3a3.appspot.com",
    messagingSenderId: "396699023083"
  };
  firebase.initializeApp(config);

 const CollectionStack = createStackNavigator({
    CollectionScreen: { screen: screens.RechordCollectionScreen },
    ViewerScreen: { screen: screens.RechordViewerScreen },
  }, {
    initialRouteName: 'CollectionScreen',
    headerMode: 'none',
    mode: 'modal',
    cardStyle: { backgroundColor: Colors.white }
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
      <SafeAreaView style={styles.container}>
        <CollectionStack />
        {/* <RecordCoverFlip /> */}
      </SafeAreaView>
      // <ActionBar/>
      // <CreateAccount />
      // <NavBar />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
