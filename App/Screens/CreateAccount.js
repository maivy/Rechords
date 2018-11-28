import React from 'react';
import { 
  StyleSheet, 
  Text, 
  SafeAreaView,
  View, 
  Image, 
  Button, 
  Dimensions, 
  TextInput,
  TouchableOpacity, 
  AsyncStorage
} from 'react-native';
import firebase from 'firebase';
import { LinearGradient, Font } from 'expo';
import { Images } from '../Themes';

const {width, height} = Dimensions.get('window');

export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      name: '',
      email: '',
      password: '',
    }
  }

  signUp = async() => {
    await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(this.completeSignUp)
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == null) {
        alert("success");
      } else if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else if (errorCode == 'auth/email-already-in-use') {
        alert('This email already has an account');
      } else if (errorCode == 'auth/invalid-email') {
        alert('Please enter a valid email');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
    var user = firebase.auth().currentUser;
    firebase.database().ref('users').child(user.uid).child('name').set(this.state.name);
    // this.verifyEmail();
  }

  // verifyEmail = () => {
  //   firebase.auth().currentUser.sendEmailVerification()
  //     .then(() => {
  //       // Verification email sent.
  //       console.log("email Verification sent");
  //       Alert.alert(
  //         'Email Verification',
  //         "We've sent a user verification email. Please click the link in your email inbox to be verified as a user",
  //         [
  //           { text: 'OK', onPress: () => this.setState({ skypeAlertClear: true }), style: 'cancel' },
  //         ],
  //         { cancelable: false }
  //       )
  //     })
  //     .catch(function (error) {
  //       // Error occurred. Inspect error.code.
  //     });
  // }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#68BEE2', '#9CA5D0']}
          style={styles.gradient}
        >
          <View style={styles.logoView}>
            <Image source={Images.logo} style={styles.logo}/>
          </View>

          <View style={styles.textInputView}>
            <View style={styles.textInput}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor='white'
                underlineColorAndroid='white'
                autoCapitalize='none'
                value={this.state.name}
                onChangeText={(name) => this.setState({ name })}
              />
            </View>

            <View style={styles.textInput}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor='white'
                autoCapitalize='none'
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
              />
            </View>

            <View style={styles.textInput}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor='white'
                autoCapitalize='none'
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />
            </View>
          </View>

          <View style={styles.createButtonView}>
            <TouchableOpacity
              style={styles.createButton}
              activeOpacity = { .5 }
              onPress={() => this.signUp()}
            >
              <Text style={styles.createButtonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.signIn}>Sign In</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
    marginTop: height * 0.1,
  },

  logo: {
    width: width * 0.5,
    height: width * 0.5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    overflow: 'visible',
  },

  textInputView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: width * 0.1,
    marginTop: height * 0.05,
    marginRight: width * 0.1,
  },

  textInput: {
    marginTop: height * 0.05,
    borderBottomWidth: 1.5,
    borderBottomColor: 'white',
    width: width * 0.8,
  },

  input: {
    // fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },

  createButtonView: {
    alignItems: 'center',
    marginTop: height * 0.13,
  },

  createButton: {
    width: width * 0.5,
    height: 50,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#68BEE2',
    borderRadius:100,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
  },

  createButtonText: {
    // fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign:'center',
  },

  signIn: {
    // fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign:'center',
    marginTop: 15,
  },
})