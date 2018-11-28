// EXAMPLE:
// ----------------------------------------
//     <RecordCover
//         image={Images.cover1}
//         location='Harrison Hot Springs'
//         date='08 31 18'
//         owner=info.'Tiffany Manuel'
//     />

import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';

import { Metrics, Colors, Images } from '../../Themes';

export default class RecordCover extends React.Component {
    state = {
        fontStyle: {},
    }

    constructor(props) {
        super(props);
        // console.log("FLIP: " + JSON.stringify(this.props.flip));
    }

    componentDidMount() {
        if (this.props.fontStyle) {
            this.setState({
                fontStyle: this.props.fontStyle
            });
        }
    }

    render() {
        return (
            <ImageBackground 
                style={styles.container}
                imageStyle={styles.image}
                source={this.props.info.image}>

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
                        <Text style={[styles.text, styles.left, this.state.fontStyle]}>{this.props.info.date}</Text>
                        <Text style={[styles.text, styles.right, this.state.fontStyle]}>{this.props.info.location}</Text>
                    </View>

                    <View style={styles.bottom}>

                        {/* For some reason, can't get onPress to work. */}

                        {
                            this.props.flip ? (
                                <TouchableOpacity onPress={() => this.props.flip()}>
                                    <Image
                                        style={styles.flip}
                                        source={Images.flip} />
                                </TouchableOpacity>
                            ) : null
                        }

                        <Text style={[styles.text, styles.right, this.state.fontStyle]}>{this.props.info.owner}</Text>
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
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        shadowOpacity: 0.5,
        elevation: 5,
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
        // fontSize: 11,
        fontFamily: 'digital-7',
        color: Colors.blue,
    },
    flip: {
        width: Metrics.icons.small,
        resizeMode: 'contain'
    }
})