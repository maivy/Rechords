import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import { Metrics, Colors } from '../../Themes'

export default class ViewHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    goToEdit = () => this.props.navigation.navigate(
		'EditScreen',
		{
			item: this.props.item
		}
	)

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.left}
                    onPress={() => this.props.goBack()}>

                    <AntDesign
                        name='down'
                        color={Colors.white}
                        size={25}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>{this.props.title}</Text>

                <TouchableOpacity
                    style={styles.right}
                    onPress={() => this.goToEdit()}
                >
                    <Feather
                        name='edit'
                        size={25}
                        color={Colors.white}
                    />
                </TouchableOpacity>
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
    right: {
        position: 'absolute',
        right: 0,
        zIndex: 100,
    },
    title: {
        flex: 1,
        paddingLeft: Metrics.mediumMargin + Metrics.smallMargin,
        paddingRight: Metrics.mediumMargin + Metrics.smallMargin,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
    }
})