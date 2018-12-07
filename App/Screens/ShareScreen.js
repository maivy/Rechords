import React from 'react';
import { 
    StyleSheet, 
    View, 
    SafeAreaView, 
    TouchableOpacity, 
    Text, 
    Dimensions, 
    TextInput,
    Alert, 
} from 'react-native';
import firebase from 'firebase';
import { NavigationActions, StackActions } from 'react-navigation';

import Record from '../Components/Record/Record';
import ShareHeader from '../Components/Headers/ShareHeader';
import RecordCoverFlip from '../Components/Record/RecordCoverFlip';
import { Metrics, Colors } from '../Themes';

const {width, height} = Dimensions.get('window');

export default class ShareScreen extends React.Component {

    state = {
        recordStyle: styles.recordHidden,
        recordHidden: true,
        friend: 'Find a friend...',
    }

    constructor(props) {
        super(props)
    }

    goBack = () => {
        this.props.navigation.navigate('ViewerScreen')
    }

    goToFindFriend = () => {
        this.props.navigation.navigate('FindFriendScreen', {
            friend: this.state.friend,
            updateFriend: this.updateFriend,
            rechord: this.props.navigation.state.params.item,
        });
    }

    updateFriend = (newFriend) => {
        this.setState({ friend: newFriend });
    }

    sendToFriend = () => {
        var ref = firebase.database().ref('users');
        var friendUID;
        var that = this;

        ref.once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if(JSON.stringify(childSnapshot.child('name')) === JSON.stringify(that.state.friend)) {
                    friendUID = childSnapshot.key;
                }
            })
            var friendRef = firebase.database().ref('users').child(friendUID).child('friendsRechords').child(that.props.navigation.state.params.item.reference);
            friendRef.child('title').set(that.props.navigation.state.params.item.title);
            friendRef.child('song').set(that.props.navigation.state.params.item.song);
            friendRef.child('artist').set(that.props.navigation.state.params.item.artist);
            friendRef.child('location').set(that.props.navigation.state.params.item.location);
            friendRef.child('date').set(that.props.navigation.state.params.item.date);
            friendRef.child('dateString').set(that.props.navigation.state.params.item.dateString);
            friendRef.child('description').set(that.props.navigation.state.params.item.description);
            friendRef.child('owner').set(that.props.navigation.state.params.item.owner);
            friendRef.child('image').set(that.props.navigation.state.params.item.image);
            friendRef.child('favorite').set(false);
            friendRef.child('reference').set(that.props.navigation.state.params.item.reference);
        });

        this.resetNavigation();
    }

    resetNavigation = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [ NavigationActions.navigate({ routeName: 'CollectionScreen' }) ],
        });
        this.props.navigation.dispatch(resetAction);
    }

    sendPressed = () => {
        Alert.alert(
            this.props.navigation.state.params.item.title + ' has been sent to ' + this.state.friend,
            '',
            [
                {text: 'Undo', onPress: () => console.log('Undo Pressed'), style: 'destructive'},
                {text: 'Okay', onPress: () => this.sendToFriend()},

            ],
            { cancelable: false }
        )
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
            <SafeAreaView style={styles.container}>
                <ShareHeader 
                    goBack={this.goBack}
                    goToFindFriend={this.goToFindFriend}
                    placeholderText={this.state.friend}
                />

                <View style={styles.mainContent}>
                    <Text style={styles.rechordTitle}>{params.item.title}</Text>
                    
                    <View style={[styles.rechord]}>
                        <TouchableOpacity
                            style={this.state.recordStyle}
                            onPress={() => this.toggleRecord()}>

                            <Record
                                tiny
                                title={params.item.song}
                                artist={params.item.artist}
                                containerStyle={styles.record}
                            />
                        </TouchableOpacity>
                        
                        <View style={styles.coverWrapper}>
                            <RecordCoverFlip
                                info={params.item}
                                albumStyle={styles.albumStyle}
                            />
                        </View>
                    </View>

                    {/* To implement if we have time */}

                    {/* <View style={styles.messageView}>
                        <TextInput
                            style={styles.messageInput}
                            placeholder="Write a message (optional)"
                            placeholderTextColor={Colors.slateGrey}
                            value={this.state.message}
                            onChangeText={(message) => this.setState({ message })}
                            multiline={true}
                        />
                    </View> */}

                    <View style={styles.sendButtonView}>
                        {
                            this.state.friend !== 'Find a friend...' ? (
                                <TouchableOpacity
                                    style={styles.sendButton}
                                    activeOpacity = { .5 }
                                    onPress={() => this.sendPressed()} 
                                >
                                    <Text style={styles.sendButtonText}>Send</Text>
                                </TouchableOpacity>
                            ) : (
                                <View
                                    style={[styles.sendButton, {backgroundColor: Colors.slateGreyAlpha}]}
                                >
                                    <Text style={styles.sendButtonText}>Send</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        overflow: 'scroll',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    rechordTitle: {
        fontSize: 24,
        marginTop: Metrics.miniMargin,
        marginBottom: Metrics.miniMargin,
    },
    rechord: {
        alignItems: 'center'
    },
    recordShown: {
        zIndex: 100
    },
    recordHidden: {
        zIndex: 0
    },
    coverWrapper: {
        marginTop: -(Metrics.record.outerSmall * (3/5)),
        width: width * 0.7,
        height: width * 0.7,
    },
    messageView: {
        width: width * 0.9,
        height: height * 0.15,
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        borderRadius: 5, 
        marginTop: Metrics.smallMargin,
        padding: Metrics.miniMargin,
    },
    messageInput: {
        color: Colors.darkGrey,
    },
    sendButtonView: {
        alignItems: 'center',
        marginTop: height * 0.01,
        marginBottom: height * 0.05,
    },    
    sendButton: {
        width: width * 0.5,
        height: 50,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#68BEE2',
        borderRadius:100,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 5,
        shadowOpacity: 0.5,
        elevation: 5,
    },

    sendButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        textAlign:'center',
    },
})