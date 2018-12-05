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
import { createFilter } from 'react-native-search-filter';

import Record from '../Components/Record/Record';
import ShareHeader from '../Components/Headers/ShareHeader';
import RecordCoverFlip from '../Components/Record/RecordCoverFlip';
import friends from '../Data/Friends';
import { Metrics, Colors } from '../Themes';

const {width, height} = Dimensions.get('window');

const KEYS_TO_FILTERS = ['name'];

export default class ShareScreen extends React.Component {

    state = {
        recordStyle: styles.recordHidden,
        recordHidden: true,
        friend: 'Find a friend...',
        friends: friends,
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
            updateFriend: this.updateFriend
        });
    }

    updateFriend = (newFriend) => {
        this.setState({ friend: newFriend });
    }

    send = () => {
        Alert.alert(
            this.props.navigation.state.params.item.title + ' has been sent to ' + this.state.friend,
            '',
            [
                {text: 'Undo', onPress: () => console.log('Undo Pressed'), style: 'destructive'},
                {text: 'Okay', onPress: () => this.goBack()},
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
                        <TouchableOpacity
                            style={styles.sendButton}
                            activeOpacity = { .5 }
                            onPress={() => this.send()}   // Implement 
                        >
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
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