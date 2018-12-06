import React from 'react';
import { 
  StyleSheet, 
  View, 
	TouchableOpacity, 
	ActionSheetIOS,
	Alert,
} from 'react-native';
import { Metrics } from '../../Themes';
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons';
import firebase from 'firebase';
// import { Share } from '../../Screens/ShareScreen';

export default class ActionBar extends React.Component {
	goToShare = () => this.props.navigation.navigate(
		'ShareScreen',
		{
				item: this.props.item
		}
	)

	showShareOptions = () => {
		ActionSheetIOS.showActionSheetWithOptions({
			options: ['Cancel', 'Send to Friend', 'Add to ' + this.props.item.location + ' Public Collection'],
			cancelButtonIndex: 0,
			message: this.props.item.title,
		},
		(buttonIndex) => {
			if (buttonIndex === 1) { 
				this.goToShare();
			} else if (buttonIndex === 2) {
				Alert.alert(
					this.props.item.title + ' has been added to ' + this.props.item.location + ' public collection.',
					'',
					[
						{text: 'Undo', onPress: () => console.log('Undo Pressed'), style: 'destructive'},
						{text: 'Okay', onPress: () => console.log('OK Pressed')},
					],
					{ cancelable: false }
				)
			}
		});
	}

	goToEdit = () => this.props.navigation.navigate(
		'EditScreen',
		{
			item: this.props.item
		}
	)

	goToCollection = () => this.props.navigation.navigate(
		'CollectionScreen'
	)

	deleteRechord = () => {
		firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('rechords').child(this.props.item.reference).remove();
		this.goToCollection();
	}

  render() {
    return (
    	<View style={styles.actionBar}>
    		<TouchableOpacity
				onPress={() => this.deleteRechord()}
			>
    			<EvilIcons
    				name='trash'
    				size={40}
    				color={'#68BEE2'}
    			/>
    		</TouchableOpacity>
    		
    		<TouchableOpacity>
    			<AntDesign
    				name='hearto'
    				size={25}
    				color={'#68BEE2'}
    			/>
    		</TouchableOpacity>

    		<TouchableOpacity
					onPress={() => this.goToEdit()}
				>
    			<Feather
    				name='edit'
    				size={25}
    				color={'#68BEE2'}
    			/>
    		</TouchableOpacity>

    		<TouchableOpacity
					onPress={() => this.showShareOptions()}
				>
    			<EvilIcons
    				name='share-apple'
    				size={40}
    				color={'#68BEE2'}
    			/>
    		</TouchableOpacity>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
  actionBar: {
	width: Metrics.widths.wide,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    height: 60,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
  },
})