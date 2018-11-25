import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Metrics, Colors } from '../../Themes'

export default class ViewHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.left}
                    onPress={() => this.props.goBack()}>

                    <AntDesign
                        name='down'
                        color={Colors.white}
                        size={Metrics.icons.small}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Metrics.widths.wide,
        alignItems: 'center',
    },
    left: {
        position: 'absolute',
        left: 0,
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