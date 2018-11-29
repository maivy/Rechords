import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Font } from 'expo';
import { setCustomText } from 'react-native-global-props';

import * as screens from './App/Screens/';
import NavBar from './App/Navigation/NavBar';
import SignedOutStack from './App/Navigation/SignedOutStack';

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

export default class App extends React.Component {

  state = {
    fontLoaded: false,
    loggedIn: false,
  }
    
  checkIfUserLoggedIn = async() => {
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.setState({loggedIn: true});
      }
    });
  }

  async componentDidMount() {
    await Font.loadAsync({
      'digital-7': require('./assets/fonts/Digital-7.ttf'),
      'avenir': require('./assets/fonts/Avenir.ttf'),
      'avenir-heavy': require('./assets/fonts/Avenir-Heavy.ttf'),
    });
    const customTextProps = { 
      style: { 
        fontFamily: 'avenir-heavy'
      }
    };
    setCustomText(customTextProps);
    this.setState({ fontLoaded: true });
    this.checkIfUserLoggedIn();
  }

  render() {
    if (this.state.loggedIn && this.state.fontLoaded) {
      return <NavBar />;
        
    } else if (this.state.fontLoaded) {
      return <SignedOutStack />;
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
