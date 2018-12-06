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

export default class ActionBaFriends extends React.Component {
  render() {
    return (
    	<View style={styles.actionBar}>
        <TouchableOpacity
            // onPress={() => this.deleteRechord()}
        >
            <EvilIcons
                name='trash'
                size={40}
                color={Colors.white}
            />
        </TouchableOpacity>

        {/* <View style={styles.space}></View> */}

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