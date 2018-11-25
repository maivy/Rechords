import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo';

import { RecordCover, Record, ActionBar } from '../Components';
import { Images, Metrics, Colors } from '../Themes';
import RecordCoverFlip from '../Components/RecordCoverFlip';

export default class RechordViewerScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#68BEE2', '#9CA5D0']}
                    style={styles.gradient}
                />
                <Text style={styles.title}>Jetting Joy</Text>
                <Record
                    small
                    title='Happier'
                    artist='Marshmello, Bastille'
                    containerStyle={styles.record}
                />
                <RecordCoverFlip />
                <ActionBar />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    record: {
        position: 'absolute',
        top: Metrics.record.outerLarge / 3
    }
})