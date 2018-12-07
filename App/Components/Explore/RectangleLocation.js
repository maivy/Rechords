import React from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { Colors } from '../../Themes';

const {width, height} = Dimensions.get('window');

export default class RectangleLocation extends React.Component {
    constructor(props) {
        super(props);
    }
	goToCollection = () => {
        this.props.navigation.navigate(
            'LocationCollection',
            {
                location: this.props.label,
            }
        )
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.goToCollection()}>
                <View style={styles.actionBar}>
                    <Text style={styles.label}>{this.props.label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  actionBar: {
    width: width * 0.45,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: Colors.slateGrey,
    height: 80,
    borderRadius: 10,
    margin: 2,
  },
  label: {
    color: Colors.white,
    fontSize: 18,
  },
})