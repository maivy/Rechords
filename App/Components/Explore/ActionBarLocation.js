import React from 'react';
import { 
  StyleSheet, 
  View, 
	TouchableOpacity, 
	ActionSheetIOS,
	Alert,
} from 'react-native';
import { Metrics, Colors } from '../../Themes';
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons';
import firebase from 'firebase';

export default class ActionBar extends React.Component {
  render() {
    return (
    	<View style={styles.actionBar}>
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
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
  },
})