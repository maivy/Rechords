import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Dimensions } from 'react-native';
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
            authorizationCode: ''
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
        await console.log("Authorization Code: " + JSON.stringify(accessToken));
        await this.setState({ authorizationCode: accessToken });
    }

    goBack = () => {
        this.props.navigation.navigate('Home')
    }

    findSong = (searchEntry) => {
        search({
            offset: 0,
            limit: 10,
            q = searchEntry,
            token: this.state.authorizationCode
        })
    }

    getAlbums = () => {
        spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
            function(data) {
                console.log('Artist albums', data.body);
            },
            function(err) {
                console.error(err);
            }
        );
    }

    render() {
        const params = this.props.navigation.state.params;
        return (
            <SafeAreaView style={styles.container}>
                <FindSongHeader 
                    goBack={this.goBack}
                    findSong={this.getAlbums}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        overflow: 'scroll',
    },
    rechordTitle: {
        fontSize: 24,
        marginTop: Metrics.smallMargin,
        marginBottom: Metrics.smallMargin,
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
        marginTop: -(Metrics.record.outerSmall * (3/5))
    },
    createButtonView: {
        alignItems: 'center',
        marginTop: height * 0.04,
        marginBottom: height * 0.05,
    },
    
    createButton: {
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

    createButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        textAlign:'center',
    },
})