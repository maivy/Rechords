import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';

import { Metrics, Colors, Images, Styles } from '../../Themes';

export default class RecordBackCover extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, Styles.shadow]}>

                <ScrollView style={styles.scrollView}>
                    <TextInput
                        styles={styles.description}
                        placeholder='Enter memory details...'
                        onChangeText={(text) => this.props.updateDescription(text)}
                    />
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: Metrics.smallMargin,
        backgroundColor: Colors.darkGrey,
        borderRadius: Metrics.borderRadius.recordCover,
        overflow: 'scroll',
    },
    scrollView: {
        flex: 1,
    },
    description: {
        flex: 1,
        fontSize: 18,
        color: Colors.white,
        // backgroundColor: 'transparent',
        fontFamily: 'avenir'
    },
})