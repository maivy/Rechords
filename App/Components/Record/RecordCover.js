// EXAMPLE:
// ----------------------------------------
//     <RecordCover
//         info={this.props.info}
//         fontStyle={{ fontSize: 18 }}  // font size of cover text
//         flip={this.flipCard}          // if you want to include flip functionality
//     />

import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient, ImagePicker, Permissions } from 'expo';

import SubmitButton from '../SubmitButton';
import { Metrics, Colors, Images, Styles } from '../../Themes';

export default class RecordCover extends React.Component {
    state = {
        fontStyle: {},
        image: undefined,
        ready: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.fontStyle) {
            this.setState({
                fontStyle: this.props.fontStyle
            });
        }
        if (this.props.info.image) {
            this.setState({
                image: this.props.info.image
            });
        }
        this.setState({ ready: true });
    }

    onPressUploadPicture = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [3, 3],
            });
            
            console.log(result);
            
            if (!result.cancelled) {
                this.setState({ image: {uri:result.uri} });
            }
        } else {
            throw new Error('Camera roll permission denied');
        }
    };

    render() {
        return (
            <ImageBackground 
                style={[styles.container, Styles.shadow]}
                imageStyle={styles.image}
                source={this.state.image}
                key={this.state.image}>

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

                    {
                        this.props.noImage ? (
                            <SubmitButton
                                text='Select Photo'
                                function={this.onPressUploadPicture}
                            />
                        ) : null
                    }

                    <View style={styles.bottom}>
                        {   // flip icon
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
        alignItems: 'center',
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