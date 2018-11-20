import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import {
    RechordCollectionHeader,
    RechordCollectionSortBar,
    RechordCollectionToggle,
    RechordListItem
} from '../Components/';

import { Colors, Metrics, Images } from '../Themes';

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

                <ScrollView contentContainerStyle={styles.covers}>
                    <RechordListItem
                        coverContainerStyle={styles.coverWrapper}
                        image={Images.cover6}
                        location='Lynn Canyon'
                        date='08 31 18'
                        owner='Tiffany Manuel'
                        title='Inflatables'
                    />

                    <RechordListItem
                        coverContainerStyle={styles.coverWrapper}
                        image={Images.cover2}
                        location='Del Mar Fairgrounds'
                        date='06 20 18'
                        owner='Tiffany Manuel'
                        title="Del Mar Fair 2018"
                    />

                    <RechordListItem
                        coverContainerStyle={styles.coverWrapper}
                        image={Images.cover3}
                        location='Grouse Mountain'
                        date='08 20 18'
                        owner='Tiffany Manuel'
                        title='Jetting Joy'
                    />
                </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        overflow: 'scroll'
    },
    sortBar: {
        marginTop: -39,
    },
    toggle: {
        marginTop: Metrics.smallMargin
    },
    covers: {
        flex: 1,
        width: Metrics.widths.wide,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: Metrics.smallMargin
    },
    coverWrapper: {
        width: Metrics.widths.cover,
        height: Metrics.widths.cover,
    },
})