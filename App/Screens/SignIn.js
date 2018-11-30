import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Dimensions, 
  TextInput,
  TouchableOpacity, 
} from 'react-native';
import firebase from 'firebase';
import { LinearGradient, Font } from 'expo';
import { Images } from '../Themes';

const {width, height} = Dimensions.get('window');

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      name: '',
      email: '',
      password: '',
      errorMessageLogin: '',
    }
  }

  login = async() => {
    await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(error => this.setState({ errorMessageLogin: error.message }));

    if (this.state.errorMessageLogin == "") {
      console.log("email " + this.state.email);
      console.log("password " + this.state.password);
    } else {
      alert(this.state.errorMessageLogin);
    }
  }

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
              style={styles.button}
              activeOpacity = { .5 }
              onPress={() => this.login()}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("CreateAccount")}
            >
              <Text style={styles.create}>Create Account</Text>
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
    marginTop: height * 0.21,
  },

  button: {
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

  buttonText: {
    // fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign:'center',
  },

  create: {
    // fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign:'center',
    marginTop: 15,
  },
})