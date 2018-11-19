import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
    RechordCollectionHeader,
    RechordCollectionSortBar,
    RechordCollectionToggle,
} from '../Components/';

import { Colors, Metrics } from '../Themes';

export default class RechordCollectionScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <RechordCollectionHeader />
                <View style={styles.sortBar}>
                    <RechordCollectionSortBar />
                </View>
                <View style={styles.toggle}>
                    <RechordCollectionToggle />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    sortBar: {
        marginTop: -39,
    },
    toggle: {
        marginTop: Metrics.smallMargin
    }
})