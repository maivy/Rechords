import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { RecordCover } from '../Components';
import { Images, Metrics } from '../Themes';

export default class RechordViewerScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.coverWrapper}>
                    <RecordCover 
                        image={Images.cover1}
                        location='Harrison Hot Springs'
                        date='08 31 18'
                        owner='Tiffany Manuel'
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    coverWrapper: {
        // flex: 1,
        width: Metrics.widths.wide,
        height: Metrics.widths.wide,
    }
})