import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Dimensions, FlatList } from 'react-native';
import { createFilter } from 'react-native-search-filter';

import SearchHeader from '../Components/Headers/SearchHeader';
import { Metrics, Colors } from '../Themes';
import firebase from 'firebase';

const KEYS_TO_FILTERS = ['name'];

export default class FindFriendScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchResults: [],
            friends: [],
            currUserName: '',
        }

    }

    componentWillMount = () => {
        var userRef = firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('name');
        var that = this;
        userRef.once('value').then(function(snapshot) {
            var snapshotVal = snapshot.val()
            that.setState({ currUserName: snapshotVal });
        }) 

        this.initFriends();
    }

    componentWillUnmount() {
        // Detach listener for firebase
        var userRef = firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('name');
        userRef.off();
    }

    initFriends = () => {
        var ref = firebase.database().ref('users');
        var initFriends = [];
        var that = this;

        ref.on('value', function(dataSnapshot) {
            initFriends = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if(childData.name !== that.state.currUserName) {
                    initFriends.unshift(childData);
                }
            })
            that.setState({ friends: initFriends });
            that.setState({ searchResults: initFriends });
        });
    }

    searchUpdated = (term) => {
        const filteredFriends = this.state.friends.filter(createFilter(term, KEYS_TO_FILTERS));
        this.setState({ searchResults: filteredFriends });
    }

    goBack = (friend) => {
        const params = this.props.navigation.state.params;
        if (friend !== undefined) {
            params.updateFriend(friend);
        }
        this.props.navigation.navigate('ShareScreen', { item: this.props.navigation.state.params.rechord });
    }

    _keyExtractor = (index) => JSON.stringify(index);

    renderItem = (item) => {
        let friend = item.name;
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => this.goBack(friend)}>

                <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const params = this.props.navigation.state.params;
        return (
            <SafeAreaView style={styles.container}>

                <SearchHeader
                    goBack={this.goBack}
                    screenTitle='Find A Friend'
                    placeholderText='Search for a friend...'
                    onChangeTextFunction={this.searchUpdated}
                    style={styles.header}
                />

                <View style={styles.list}>
                    <FlatList
                        data={this.state.searchResults}
                        renderItem={({item}) => this.renderItem(item)}
                        keyExtractor={this._keyExtractor}
                        ListEmptyComponent={<Text style={styles.noResults}>No results :(</Text>}
                    />
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
    list: {
        flex: 1,
        marginTop: Metrics.smallMargin
    },
    listItem: {
        width: Metrics.widths.wide,
        marginBottom: Metrics.tinyMargin
    },
    title: {
        fontSize: 16,
        color: Colors.darkGrey
    },
    artist: {
        fontFamily: 'avenir',
        fontSize: 14,
        color: Colors.slateGrey
    },
    noResults: {
        fontSize: 16,
        color: Colors.darkGrey
    }
})