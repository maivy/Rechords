import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Font } from 'expo';
import { setCustomText } from 'react-native-global-props';

// import * as screens from './App/Scree?\ns/';
import NavBar from './App/Navigation/NavBar';
import SignedOutStack from './App/Navigation/SignedOutStack';
import NewRechordBar from './App/Components/NewRechordBar';

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
    if (this.state.loggedIn === true) {
      return <NewRechordBar />;
      // return <NavBar />;
    } else {
      return <SignedOutStack />;
    }
    // return (
    //   <View style={styles.container}>
    //     {
    //       this.state.fontLoaded ? (
    //         // <NavBar />
    //         <SignedOutStack />
    //       ) : null
    //     }
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
