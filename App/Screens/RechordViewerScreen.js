import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { RecordCover, Record } from '../Components';
import { Images, Metrics } from '../Themes';
import RecordCoverFlip from '../Components/RecordCoverFlip';

export default class RechordViewerScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Record
                    small
                    title='Happier'
                    artist='Marshmello, Bastille'
                    containerStyle={styles.record}
                />
                <RecordCoverFlip />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    record: {
        position: 'absolute',
        top: Metrics.record.outerLarge / 3
    }
})