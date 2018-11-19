import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo';

import { Metrics, Colors, Images } from '../Themes';

export default class RecordCover extends React.Component {
    render() {
        return (
            <ImageBackground
                style={styles.container}
                imageStyle={styles.image}
                source={Images.recordCover}>
                
                <LinearGradient
                    style={[styles.overlay, styles.overlayTop]}
                    colors={[Colors.black, 'transparent']}
                />

                <LinearGradient
                    style={[styles.overlay, styles.overlayBottom]}
                    colors={['transparent', Colors.black]}
                />

                <View style={styles.top}>
                    <Text style={[styles.text, styles.left]}>08 28 18</Text>
                    <Text style={[styles.text, styles.right]}>Harrison Hot Springs</Text>
                </View>

                <View style={styles.bottom}>
                    <Image
                        style={styles.flip}
                        source={Images.flip} />
                    <Text style={[styles.text, styles.right]}>Tiffany Manuel</Text>
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        width: Metrics.record.outer,
        height: Metrics.record.outer,
        padding: Metrics.smallMargin
    },
    image: {
        borderRadius: Metrics.borderRadius.small,
    },
    overlay: {
        position: 'absolute',
        height: Metrics.heights.overlay,
        borderRadius: Metrics.borderRadius.small,
    },
    overlayTop: {
        left: 0,
        right: 0,
        top: 0,
    },
    overlayBottom: {
        left: 0,
        right: 0,
        bottom: 0
    },
    top: {
        flex: 1,
        flexDirection: 'row',
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    left: {
        flex: 1,
        textAlign: 'left'
        
    },
    right: {
        flex: 1,
        textAlign: 'right'
    },
    text: {
        color: Colors.blue,
    },
    flip: {
        width: Metrics.icons.small,
        resizeMode: 'contain'
    }
})