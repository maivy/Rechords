// EXAMPLE:
// ----------------------------------------
//     <RecordCover
//         info={this.props.info}
//         fontStyle={{ fontSize: 18 }}  // font size of cover text
//         flip={this.flipCard}          // if you want to include flip functionality
//     />

import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient, ImagePicker, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

import firebase from 'firebase';
import { NavigationEvents } from 'react-navigation';

import SubmitButton from '../SubmitButton';
import { Metrics, Colors, Images, Styles } from '../../Themes';

export default class RecordCover extends React.Component {
    state = {
        fontStyle: {},
        image: undefined,
        imageURI: '',
        ready: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        var that = this;
        if (that.props.fontStyle) {
            that.setState({
                fontStyle: that.props.fontStyle
            });
        }
        if (that.props.info.image) {
            if (typeof that.props.info.image === 'string') {
                console.log("URI: " + this.props.info.image);
                that.setState({
                    image: { uri: that.props.info.image }
                });
            } else {
                that.setState({
                    image: that.props.info.image
                });
            }
        }
        that.setState({ ready: true });
    }

    onPressUploadPicture = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [3, 3],
            });
            
            if (!result.cancelled) {
                await this.setState({ 
                    image: { uri: result.uri },
                    imageURI: result.uri
                });
            } else return

            this.props.toggleLoadingMode();
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                  resolve(xhr.response);
                };
                xhr.onerror = function(e) {
                  reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', this.state.imageURI, true);
                xhr.send(null);
              });

            const ref = firebase.storage().ref().child(this.state.imageURI);

            const response = await fetch(this.state.imageURI);
            
            // const blob = await response.blob();
            var _this = this;
        
            await ref.put(blob, {contentType: "image/jpeg"}).then(async (snapshot) => {
                
                await snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                    await _this.setState({ imageURI: downloadURL });
                    await _this.setState({ image: { uri: downloadURL } });
                    console.log("download url " + downloadURL);
                    // firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
                    //     image: downloadURL,
                    // });
                    // that.setState({ imageURI: downloadURL });
                });
        
            });
            // console.log("image url " + this.state.imageURI);
            await this.props.updateImage(this.state.imageURI);
            await this.props.toggleLoadingMode();
            console.log("image url " + this.state.imageURI);
            // firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
            //     image: this.state.imageURI,
            // });
        } else {
            throw new Error('Camera roll permission denied');
        }
    };

    update() {
        // console.log("============= RECORD COVER MOUNTED =============");
        // console.log("this.state.image: " + JSON.stringify(this.state.image));
        // console.log("this.props.info.image" + this.props.info.image);
        if (this.props.info.image) {
            if (typeof this.props.info.image === 'string') {
                this.setState({
                    image: { uri: this.props.info.image }
                });
            } else {
                this.setState({
                    image: this.props.info.image
                });
            }
        }
    }

    render() {
        return (
            <ImageBackground 
                style={[styles.container, Styles.shadow]}
                imageStyle={styles.image}
                source={this.state.image}
                key={this.state.imageURI}>

                <NavigationEvents
                    onWillFocus={() => this.update()}
                />

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
                        this.props.noImage && !this.props.info.loading ? (
                            <View style={styles.uploadButton}>
                                <SubmitButton
                                    text='Select Photo'
                                    function={this.onPressUploadPicture}
                                />
                            </View>
                        ) : null
                    }

                    {
                        this.props.info.loading ? (
                            <ActivityIndicator size='small' color={Colors.blue} />
                        ) : null
                    }

                    <View style={styles.bottom}>
                        <Text style={[styles.text, styles.right, this.state.fontStyle]}>{this.props.info.owner}</Text>
                    </View>

                    {   // flip icon
                            this.props.flip ? (
                                <TouchableOpacity
                                    style={styles.flip}
                                    onPress={() => this.props.flip()}
                                >

                                    <MaterialIcons
                                        name='sync'
                                        color={Colors.white}
                                        size={Metrics.icons.medium}
                                    />
                                </TouchableOpacity>
                            ) : null
                        }
                    
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
        position: 'absolute',
        bottom: Metrics.smallMargin,
        left: Metrics.smallMargin,
        padding: 5,
        backgroundColor: Colors.blue,
        borderRadius: (Metrics.icons.medium + 10) / 2
    }
})