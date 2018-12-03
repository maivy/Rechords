import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';

import SortOption from '../SortOption';

export default class SearchBar_White extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={Colors.slateGrey}
                    onChangeText={(newFriend) => this.props.onChangeTextFunction(newFriend)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.widths.wide,
        padding: Metrics.tinyMargin,
        top: 35,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: Metrics.borderRadius.sortBy,
        shadowOffset: { width: 0, height: 1 },
        shadowColor: Colors.black,
        shadowOpacity: 0.25,
        elevation: 5,
    },
    input: {
        color: Colors.darkGrey,
    }
})