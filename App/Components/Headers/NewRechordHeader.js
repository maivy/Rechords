import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'

import { Metrics, Colors, Styles, Images } from '../../Themes';

export default class NewRechordHeader extends React.Component {
    state = {
        rechordTitle: '',
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

                    <Text style={Styles.h1}>New Rechord</Text>
                </View>
                
                <View style={styles.rechordTitleView}>
                    <TextInput 
                        style={styles.rechordTitle}
                        placeholder="Enter Rechord Title..."
                        placeholderTextColor={Colors.white}
                        value={this.props.rechordTitle}
                        onChangeText={(rechordTitle) => this.props.updateRechordTitle()}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Metrics.heights.header,
        padding: Metrics.smallMargin,
        backgroundColor: Colors.purple,
        // marginTop: 50,
    },
    left: {
        position: 'absolute',
        top: -1 * Metrics.miniMargin,
        zIndex: 100,
    },
    rechordTitleView: {
        marginTop: Metrics.height * 0.02,
        marginLeft: Metrics.smallMargin,
    },
    rechordTitle: {
        color: Colors.white,
        fontSize: 20,
    },
})