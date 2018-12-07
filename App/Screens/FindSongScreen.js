import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Dimensions, FlatList } from 'react-native';
import search from '../Data/api/searchApi'

import { FindSongHeader } from '../Components/';
import { Metrics, Colors } from '../Themes';

const {width, height} = Dimensions.get('window');

// const authorizationCode = 'BQCmZAd6TlBhBbPnq7A_71PwnvkNtrIJ0w95jbf0A_g-V5tf7uWoWOzPf5NF1YJfycgNVPuZqzlwwTpSdlE';

const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: '480497afabbc45e18eda389137bd09d5',
    clientSecret: 'c8b10e5e4e5c4a678fc3ee2879d3395f',
});

const encodedClientKey = 'NDgwNDk3YWZhYmJjNDVlMThlZGEzODkxMzdiZDA5ZDU6YzhiMTBlNWU0ZTVjNGE2NzhmYzNlZTI4NzlkMzM5NWY=';

export default class FindSongScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            authorizationCode: '',
            searchResults: [],
        }

        this.getAuthorizationCode();
    }

    getAuthorizationCode = async () => {
        let response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + encodedClientKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });
        let responseJson = await response.json();
        let accessToken = await responseJson.access_token;
        // await console.log("Authorization Code: " + JSON.stringify(accessToken));
        await this.setState({ authorizationCode: accessToken });
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    goBackFromSearch = (screen, song, artist) => {
        this.props.navigation.navigate(screen, {
            song: song,
            artist: artist
        });
    }

    // undoFindSong = () => {
    //     this.props.navigation.goBack();
    // }

    findSong = async (searchEntry) => {
        const results = await search({
            offset: 0,
            limit: 20,
            q: searchEntry,
            token: this.state.authorizationCode
        });
        // console.log('Search results: ' + JSON.stringify(results[0].artists[0].name));
        this.setState({ searchResults: results });
    }

    _keyExtractor = (index) => JSON.stringify(index);

    renderItem = (item) => {
        let screen = 'NewRechordScreen';
        const params = this.props.navigation.state.params;
        if (params) {
            screen = params.screen;
        }
        let song = item.title;
        let artist = item.artists[0].name;
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => this.goBackFromSearch(screen, song, artist)}>

                <Text style={styles.title}>{song}</Text>
                <Text style={styles.artist}>{artist}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const params = this.props.navigation.state.params;
        return (
            <SafeAreaView style={styles.container}>

                <FindSongHeader 
                    goBack={this.goBack}
                    onChangeTextFunction={this.findSong}
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