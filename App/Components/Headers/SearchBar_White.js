import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';

export default class SearchBar_White extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.uneditable ? (
                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={this.props.placeholder}
                            placeholderTextColor={Colors.slateGrey}
                            onChangeText={(text) => this.props.onChangeTextFunction(text)}
                            onTouchStart={() => this.props.onPressFunction()}
                        />

                    ) : (
                        <TextInput
                            style={styles.input}
                            placeholder={this.props.placeholder}
                            placeholderTextColor={Colors.slateGrey}
                            onChangeText={(text) => this.props.onChangeTextFunction(text)}
                        />
                    )
                }
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
        fontFamily: 'avenir-heavy',
        color: Colors.darkGrey,
    }
})