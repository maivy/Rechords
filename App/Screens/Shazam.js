import React from 'react';
import {
  StyleSheet, 
  Dimensions,
  Text, 
  View, 
  Image,
  TouchableOpacity, 
} from 'react-native';
import { LinearGradient } from 'expo';
import { Images, Colors, Metrics } from '../Themes';
import { FontAwesome } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

export default class Shazam extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.blue, Colors.purple]}
          style={styles.gradient}
        >

          <View style={styles.logoView}>
              <Text style={styles.instructions}>Detecting Song...</Text>
              <Image source={Images.logo} style={styles.logo}/>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  logoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  instructions: {
    color: Colors.white,
    textAlign: 'center',
    marginBottom: height * 0.02,
    fontSize: 24,
  },

  logo: {
    width: width * 0.7,
    height: width * 0.7,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    overflow: 'visible',
  },

  searchButtonView: {
    alignItems: 'center',
    // flex: 1,
    marginTop: height * 0.13,
  },

  searchButton: {
    alignItems: 'center',
    width: 50,
    height: 50,
    paddingTop:15,
    paddingBottom:15,
    // marginLeft:30,
    // marginRight:30,
    backgroundColor: Colors.white,
    borderRadius: 25,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
  },
})