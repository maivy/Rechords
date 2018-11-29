import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Font } from 'expo';
import { setCustomText } from 'react-native-global-props';

import * as screens from './App/Screens/';
import NavBar from './App/Navigation/NavBar';
// import NewRecordCover from './App/Components/Record/NewRecordCover';
import Database from './App/Data/Database';
import PersonalRechords from './App/Data/PersonalRechords';

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
    fontLoaded: false
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
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.fontLoaded ? (
            // <NavBar />
            <screens.EditRechord />
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
