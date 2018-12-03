import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchBar_White from './SearchBar_White';
import { Metrics, Colors, Styles } from '../../Themes';

export default class ShareHeader extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                        style={styles.left}
                        onPress={() => this.props.goBack()}
                    >
                        <Ionicons
                            name='ios-arrow-back'
                            color={Colors.white}
                            size={Metrics.icons.medium}
                        />
                    </TouchableOpacity>

                    <Text style={Styles.h1}>Send to Friend</Text>
                </View>

                <SearchBar_White
                    placeholder="Search for friend"
                    onChangeTextFunction={this.props.updateFriend}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Metrics.heights.header,
        padding: Metrics.smallMargin,
        backgroundColor: Colors.purple
    },
    left: {
        position: 'absolute',
        top: -1 * Metrics.miniMargin,
        zIndex: 100,
    },
})