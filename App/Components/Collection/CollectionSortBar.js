import React from 'react';
import { StyleSheet, View, Text, TextInput, Image } from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';

import SortOption from '../SortOption';

export default class CollectionSortBy extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    placeholder='Search for a song, artist, etc.'
                />

                <View style={styles.sortOptions}>
                    <SortOption
                        icon={Images.recordIconBlue}
                        text='Newest'
                        color={Colors.blue}
                    />

                    <SortOption
                        icon={Images.recordIconSlate}
                        text='Oldest'
                        color={Colors.slateGrey}
                    />

                    <SortOption
                        icon={Images.locationIconSlate}
                        text='Location'
                        color={Colors.slateGrey}
                    />

                    <SortOption
                        icon={Images.musicIconSlate}
                        text='Song'
                        color={Colors.slateGrey}
                    />

                    <SortOption
                        icon={Images.recordIconSlate}
                        text='Title'
                        color={Colors.slateGrey}
                    />

                    <SortOption
                        icon={Images.heartIconSlate}
                        text='Favorites'
                        color={Colors.slateGrey}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.widths.wide,
        height: Metrics.heights.sortBy,
        padding: Metrics.tinyMargin,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: Metrics.borderRadius.sortBy,
        shadowOffset: { width: 0, height: 1 },
        shadowColor: Colors.black,
        shadowOpacity: 0.25,
        elevation: 5,
    },
    searchBar: {
        padding: Metrics.miniMargin,
        backgroundColor: Colors.slateGreyAlpha,
        borderRadius: Metrics.borderRadius.search,
        color: Colors.darkGrey
    },
    sortOptions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginTop: Metrics.tinyMargin,
    },
})