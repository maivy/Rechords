import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Font } from 'expo';
import { setCustomText } from 'react-native-global-props';

import * as screens from './App/Screens/';
import NavBar from './App/Navigation/NavBar';
import SignedOutStack from './App/Navigation/SignedOutStack';

import firebase from 'firebase';
import Database from './App/Data/Database';
import PersonalRechords from './App/Data/PersonalRechords';
import Images from './App/Themes/Images';

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
    image: '',
    uid: '',
  }
  
    
  checkIfUserLoggedIn = async() => {
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.setState({loggedIn: true});
        that.setState({uid: firebase.auth().currentUser.uid})
      }
    });
  }

  addRechord = (rechordObject) => {
    console.log("working");
    const ref = firebase.storage().ref('rechords').child(this.state.uid).child("image");
    // const response = await fetch(rechordObject.image);
    console.log("rechord object image " + Images.cover6);
    const uri = rechordObjIect.image.uri;
    console.log('uri ' + uri);
 
    // const blob = await rechordObject.image.blob();
    // var that = this;

    // await ref.put(blob).then((snapshot) => {
    //   console.log('puts blob');

    //   snapshot.ref.getDownloadURL().then(function(downloadURL) {
    //     that.setState({ image: downloadURL });
    //     rechordObject.image = this.state.image;
    // });

    // });

    // await firebase.database().ref('users').child(firebase.auth().currentUser.uid).update(rechordObject);
    // rechordObject.image
    // database.ref('rechords/').update(rechordObject).then(() => {
    //     console.log("added rechord!");
    // });
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
    // this.addRechord(PersonalRechords[0]);
  }

  logOut = () => {
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.fontLoaded ? (
            <NavBar logOut={this.logOut} />
            // <screens.EditRechord uid={this.state.uid} />
            // <screens.NewRechordScreen />
          ) : null
        }
      </View>
    )
    // if (this.state.loggedIn && this.state.fontLoaded) {
    //   return <NavBar />;
    // } else if (this.state.fontLoaded) {
    //   return <SignedOutStack />;
    // } else {
    //   return null;
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
