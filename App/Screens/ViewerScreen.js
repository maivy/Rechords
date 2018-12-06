import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo';
import { NavigationEvents } from 'react-navigation';
import { Record, ActionBar, ViewHeader, ActionBarLocation } from '../Components';
import RecordCoverFlip from '../Components/Record/RecordCoverFlip';
import firebase from 'firebase';
import { Metrics, Colors } from '../Themes';

export default class RechordViewerScreen extends React.Component {

    // state = {
    //     recordStyle: styles.recordHidden,
    //     recordHidden: true,

    //     title: this.props.navigation.state.params.item.title,
    //     song: this.props.navigation.state.params.item.song,
    //     artist: this.props.navigation.state.params.item.artist,
    //     location: this.props.navigation.state.params.item.location,
    //     date: this.props.navigation.state.params.item.date,
    //     dateString: this.props.navigation.state.params.item.dateString,
    //     description: this.props.navigation.state.params.item.description,
    //     owner: this.props.navigation.state.params.item.owner,
    //     image: this.props.navigation.state.params.item.image,
    //     reference: this.props.navigation.state.params.item.reference,
    //     edit: false,
    // }

    constructor(props) {
        super(props)
        this.state = {
            recordStyle: styles.recordHidden,
            recordHidden: true,
    
            title: this.props.navigation.state.params.item.title,
            song: this.props.navigation.state.params.item.song,
            artist: this.props.navigation.state.params.item.artist,
            location: this.props.navigation.state.params.item.location,
            date: this.props.navigation.state.params.item.date,
            dateString: this.props.navigation.state.params.item.dateString,
            description: this.props.navigation.state.params.item.description,
            owner: this.props.navigation.state.params.item.owner,
            image: this.props.navigation.state.params.item.image,
            reference: this.props.navigation.state.params.item.reference,
            edit: false,
        }
        // this.componentDidMount();
    }

    
    componentDidMount = async() => {
        
        // var that = this;
        // that.setState({image: this.props.navigation.state.params.item.image});
        // console.log("image passed viewer screen " + this.props.navigation.state.params.item.image);
        if(this.state.reference !== '') {
            var ref = firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('rechords').child(this.state.reference);
            var that = this;
            ref.on('value', function(dataSnapshot) {
                console.log("CHANGE");
                dataSnapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    var childKey = childSnapshot.key;
                    console.log("CHILD KEY: " + childKey);
                    if(childKey === 'title') {
                        that.setState({ title: childData}, () => {
                            console.log("TITLE CHANGED: " + that.state.title)
                        });
                    } else if(childKey === 'image') {
                         that.setState({ image: childData }, () => {
                            console.log("IMAGE: " + that.state.image);
                        });
                    }
                })
            });
        }
        // that.setState({image: this.props.navigation.state.params.item.image});
        // console.log("check state image " + this.state.image);
        // var imageStore = await AsyncStorage.getItem('imageSaved');
        // console.log("imageStore " + imageStore);
        // await that.setState({image: imageStore});
        // console.log("image from aSYNC " + this.state.image);
    }

    // updateImage = (params) => {
    //     console.log("UPDATING VIEWER IMAGE: " + params.item.image);
    //     console.log("OLD IMAGE: " + this.state.image);
    //     this.setState({ image: params.item.image }, () => {
    //         console.log(this.state.image, 'NEW STATE');
    //     });
    // }

    goBack = () => {
        if(this.props.navigation.state.params.location) {
            this.props.navigation.navigate('LocationCollection')
        } else {
            this.props.navigation.navigate('CollectionScreen')
        }
    }

    toggleRecord() {
        if (this.state.recordHidden) {
            this.setState({ 
                recordStyle: styles.recordShown,
                recordHidden: false,
            });
        } else {
            this.setState({
                recordStyle: styles.recordHidden,
                recordHidden: true,
            });
        }
    }

    render() {
        const params = this.props.navigation.state.params;
        return (
            <SafeAreaView style={{flex: 1}}>
                {/* <NavigationEvents
                    onDidFocus={() => this.updatePlease()}
                /> */}
                <LinearGradient
                    colors={[Colors.blue, Colors.purple]}
                    style={styles.gradient}
                />

                <View style={styles.container}>

                    <ViewHeader
                        // title={params.item.title}
                        title={this.state.title}
                        goBack={this.goBack}
                    />

                    <View style={[styles.rechord]}>
                        <TouchableOpacity
                            style={this.state.recordStyle}
                            onPress={() => this.toggleRecord()}>

                            <Record
                                small
                                title={params.item.song}
                                artist={params.item.artist}
                                // title={this.state.title}
                                // artist={this.state.artist}
                                containerStyle={styles.record}
                            />
                        </TouchableOpacity>
                        
                        <View style={styles.coverWrapper}>
                            <RecordCoverFlip
                                info={params.item}
                                // info={this.state}
                                style={styles.recordCover}
                            />
                        </View>
                    </View>

                    {
                        params.location ? (
                            <ActionBarLocation/>
                        ) : (
                            <ActionBar 
                                navigation={this.props.navigation}
                                item={params.item}
                                // item={this.state}
                                // deleteRechord={this.}
                            />
                        )
                    }
                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Metrics.smallMargin
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
    },
    gradient: {
        position: 'absolute',
        width: Metrics.width,
        height: Metrics.height,
        top: 0,
        left: 0,
    },
    rechord: {
        alignItems: 'center',
        // marginBottom: Metrics.height * 0.15,
        // marginTop: Metrics.height
    },
    recordShown: {
        zIndex: 100
    },
    recordHidden: {
        zIndex: 0
    },
    coverWrapper: {
        marginTop: -(Metrics.record.outerSmall * (3/5)),
        width: Metrics.widths.coverMedium,
        height: Metrics.widths.coverMedium,
    }
})