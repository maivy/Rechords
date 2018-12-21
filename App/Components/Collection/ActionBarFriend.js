import React from 'react';
import { 
  StyleSheet, 
  View, 
	TouchableOpacity, 
	ActionSheetIOS,
	Alert,
} from 'react-native';
import { Metrics, Colors } from '../../Themes';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import firebase from 'firebase';

export default class ActionBaFriends extends React.Component {

  deleteRechord = () => {
		firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('friendsRechords').child(this.props.item.reference).remove();
    this.props.navigation.goBack();
  }
  
  deleteRechordPressed = () => {
		Alert.alert(
			this.props.item.title + ' has been deleted.',
			'',
			[
				{text: 'Undo', onPress: () => console.log('Undo Pressed'), style: 'destructive'},
				{text: 'Okay', onPress: () => this.deleteRechord()},
			],
			{ cancelable: false }
		)
	}

  render() {
    return (
    	<View style={styles.actionBar}>
        <TouchableOpacity
            onPress={() => this.deleteRechordPressed()}
        >
            <EvilIcons
                name='trash'
                size={40}
                color={Colors.white}
            />
        </TouchableOpacity>

    		<TouchableOpacity>
    			<AntDesign
    				name='hearto'
    				size={Metrics.icons.medium}
    				color={Colors.white}
    			/>
    		</TouchableOpacity>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
  },
  space: {
    width: 50,
  },
})