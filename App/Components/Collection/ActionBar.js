import React from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
} from 'react-native';
import { Metrics } from '../../Themes';
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons';
import { Share } from '../../Screens/ShareScreen';

export default class ActionBar extends React.Component {
	goToShare = () => this.props.navigation.navigate(
		'ShareScreen',
		{
				item: this.props.item
		}
	)

  render() {
    return (
    	<View style={styles.actionBar}>
    		<TouchableOpacity>
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

    		<TouchableOpacity>
    			<Feather
    				name='edit'
    				size={25}
    				color={'#68BEE2'}
    			/>
    		</TouchableOpacity>

    		<TouchableOpacity
					onPress={() => this.goToShare()}
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
		// flex: 1,
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