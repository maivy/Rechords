// EXAMPLE:
// ----------------------------------------
//     <RecordCover
//         image={Images.cover1}
//         location='Harrison Hot Springs'
//         date='08 31 18'
//         owner='Tiffany Manuel'
//     />

import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo';

import { Metrics, Colors, Images } from '../Themes';

export default class RecordCover extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ImageBackground 
                style={styles.container}
                imageStyle={styles.image}
                source={this.props.image}>

                {/* Black/Transparent Gradients on Rechord Cover */}
                
                <LinearGradient
                    style={[styles.overlay, styles.overlayTop]}
                    colors={[Colors.black, 'transparent']}
                />

                <LinearGradient
                    style={[styles.overlay, styles.overlayBottom]}
                    colors={['transparent', Colors.black]}
                />

                {/* Information on Cover: Date, Location, Owner, Flip Icon */}

                <View style={styles.coverInfo}>

                    <View style={styles.top}>
                        <Text style={[styles.text, styles.left]}>{this.props.date}</Text>
                        <Text style={[styles.text, styles.right]}>{this.props.location}</Text>
                    </View>

                    <View style={styles.bottom}>
                        <Image
                            style={styles.flip}
                            source={Images.flip} />

                        <Text style={[styles.text, styles.right]}>{this.props.owner}</Text>
                    </View>
                    
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.darkGrey,
        borderRadius: Metrics.borderRadius.recordCover,
    },
    image: {
        borderRadius: Metrics.borderRadius.recordCover,
    },
    overlay: {
        position: 'absolute',
        height: Metrics.heights.overlay,
        borderRadius: Metrics.borderRadius.recordCover,
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
    coverInfo: {
        flex: 1,
        padding: Metrics.miniMargin,
    },
    text: {
        fontSize: 11,
        color: Colors.blue,
    },
    flip: {
        width: Metrics.icons.small,
        resizeMode: 'contain'
    }
})