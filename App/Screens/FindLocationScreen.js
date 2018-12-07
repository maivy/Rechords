import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Dimensions, FlatList } from 'react-native';
import { createFilter } from 'react-native-search-filter';

import Locations from '../Data/Locations';
import SearchHeader from '../Components/Headers/SearchHeader';
import { Metrics, Colors } from '../Themes';

const KEYS_TO_FILTERS = ['name'];

export default class FindLocationScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchResults: Locations,
        }

    }

    searchUpdated = (term) => {
        const filteredLocations = Locations.filter(createFilter(term, KEYS_TO_FILTERS));
        // console.log("SEARCH TERMS: "+JSON.stringify(filteredFriends));
        this.setState({ searchResults: filteredLocations });
    }

    goToCollection = (location) => {
        const params = this.props.navigation.state.params;
        params.goToCollection(location);
    }

    _keyExtractor = (index) => JSON.stringify(index);

    renderItem = (item) => {
        let location = item.name;
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => this.goToCollection(location)}>

                <Text style={styles.title}>{location}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const params = this.props.navigation.state.params;
        return (
            <SafeAreaView style={styles.container}>

                <SearchHeader
                    goBack={params.goBack}
                    screenTitle='Find A Location'
                    placeholderText='Search for a location...'
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