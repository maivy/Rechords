import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

import { Metrics, Colors, Images } from '../Themes';

const center = Metrics.record.outer / 2;
export default class Record extends React.Component {
    render() {
        return (
            <ImageBackground
                style={styles.outer}
                source={Images.recordEdge}>
                <View style={styles.inner}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>Happier</Text>
                    </View>

                    <View style={styles.dot}></View>

                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>Marshmello, Bastille</Text>
                    </View>
                </View> 
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    outer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Metrics.record.outer,
        height: Metrics.record.outer,
        // backgroundColor: Colors.black,
        borderRadius: Metrics.record.outer / 2,
    },
    inner: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: Metrics.record.inner,
        height: Metrics.record.inner,
        backgroundColor: Colors.purple,
        borderRadius: Metrics.record.inner / 2
    },
    dot: {
        width: Metrics.record.dot,
        height: Metrics.record.dot,
        backgroundColor: Colors.white,
        borderRadius: Metrics.record.dot / 2
    },
    textWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.white
    }
});