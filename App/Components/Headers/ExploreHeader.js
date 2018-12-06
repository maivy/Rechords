import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchBar_White from './SearchBar_White';
import { Metrics, Colors, Styles } from '../../Themes';

export default class ExploreHeader extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={Styles.h1}>Explore Public Collections for Different Locations</Text>
                </View>

                <SearchBar_White
                    uneditable
                    placeholder={this.props.placeholderText}
                    onPressFunction={this.props.goToFindLocation}
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
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
    }
})