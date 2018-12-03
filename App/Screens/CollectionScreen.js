import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, } from 'react-native';

import {
    CollectionHeader,
    CollectionSortBar,
    CollectionToggle,
    CollectionListItem
} from '../Components';

import { Metrics } from '../Themes';
import PersonalRechords from '../Data/PersonalRechords';
import FriendRechords from '../Data/FriendRechords';

export default class CollectionScreen extends React.Component {  

    state = {
        data: PersonalRechords,
        index: 0
    }

    // Function to toggle between personal and friend rechords
    updateIndex = (index) => {
        this.setState({index: index});
        if (index === 0) {
            this.setState({data: PersonalRechords});
        } else {
            this.setState({data: FriendRechords})
        }
    }

    constructor(props) {
        super(props);
    }

    goToViewer = (item) => this.props.navigation.navigate(
        'ViewerScreen',
        {
            item: item,
            location: false,
        }
    )

    _keyExtractor = (index) => JSON.stringify(index);

    renderRechordItem = (item) => {
        return (
            <CollectionListItem
                info={item}
                coverContainerStyle={styles.coverWrapper}
                goToViewer={this.goToViewer}
            />
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>

                <CollectionHeader logOut={this.props.screenProps.logOut} />

                <View style={styles.sortBar}>
                    <CollectionSortBar />
                </View>

                <View style={styles.toggle}>
                    <CollectionToggle
                        index={this.state.index}
                        updateIndex={this.updateIndex}
                    />
                </View>

                <FlatList
                    columnWrapperStyle={styles.covers}
                    numColumns={2}
                    data={this.state.data}
                    renderItem={({item}) => this.renderRechordItem(item)}
                    keyExtractor={this._keyExtractor}
                />

                {/* If we wanna just go with hardcoded data */}

                {/* <ScrollView contentContainerStyle={styles.covers}>
                    <RechordListItem
                        coverContainerStyle={styles.coverWrapper}
                        image={Images.cover6}
                        location='Lynn Canyon'
                        date='08 31 18'
                        owner='Tiffany Manuel'
                        title='Inflatables'
                    />

                    <RechordListItem
                        coverContainerStyle={styles.coverWrapper}
                        image={Images.cover2}
                        location='Del Mar Fairgrounds'
                        date='06 20 18'
                        owner='Tiffany Manuel'
                        title="Del Mar Fair 2018"
                    />

                    <RechordListItem
                        coverContainerStyle={styles.coverWrapper}
                        image={Images.cover3}
                        location='Grouse Mountain'
                        date='08 20 18'
                        owner='Tiffany Manuel'
                        title='Jetting Joy'
                    />
                </ScrollView> */}
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        overflow: 'scroll',
    },
    sortBar: {
        marginTop: -39, // move sort bar over header
    },
    toggle: {
        marginTop: Metrics.smallMargin,
        marginBottom: Metrics.smallMargin
    },
    covers: {
        flex: 1,
        width: Metrics.widths.wide,
        // flexDirection: 'row',       // For ScrollView Option
        // flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    coverWrapper: {
        width: Metrics.widths.cover,
        height: Metrics.widths.cover,
    },
})