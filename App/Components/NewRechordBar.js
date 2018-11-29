import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { Metrics, Colors, Images } from '../Themes';

import SortOption from './SortOption';

export default class NewRechordBar extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Under construction.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.widths.wide,
        height: Metrics.heights.sortBy,
        padding: Metrics.tinyMargin,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: Metrics.borderRadius.sortBy,
        shadowOffset: { width: 0, height: 1 },
        shadowColor: Colors.black,
        shadowOpacity: 0.25,
        elevation: 5,
    },
    searchBar: {
        padding: Metrics.miniMargin,
        backgroundColor: Colors.slateGreyAlpha,
        borderRadius: Metrics.borderRadius.search,
        color: Colors.darkGrey
    },
    sortOptions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginTop: Metrics.tinyMargin,
    },
})