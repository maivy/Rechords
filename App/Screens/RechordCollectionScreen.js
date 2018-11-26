import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';

import {
    RechordCollectionHeader,
    RechordCollectionSortBar,
    RechordCollectionToggle,
    RechordListItem
} from '../Components/';

import { Colors, Metrics, Images, Styles } from '../Themes';
import PersonalRechords from '../Data/PersonalRechords';

export default class RechordCollectionScreen extends React.Component {  

    state = {
        data: PersonalRechords,
        index: 0
    }

    updateIndex = (index) => {
        this.setState({index: index});
        if (index === 0) {
            this.setState({data: PersonalRechords});
        } else {
            this.setState({data: []})
        }
    }

    constructor(props) {
        super(props);
        console.log(JSON.stringify(this.state.data));
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        const tabBarOptions = {
            tabBarLabel: 'Rechord Collection',
            tabBarIcon: () => (
                <Image
                    style={Styles.tabIcon}
                    source={Images.recordIconSlate} />
            ),
        }
      
        const result = {
            ...tabBarOptions,
        }
      
        return result;
    }

    _keyExtractor = (index) => JSON.stringify(index);

    renderRechordItem = (item) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'ViewerScreen',
                    {
                        item: item
                    }
                )}>
                <RechordListItem
                    coverContainerStyle={styles.coverWrapper}
                    image={item.image}
                    location={item.location}
                    date={item.date}
                    owner={item.owner}
                    title={item.title}
                />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>

                <RechordCollectionHeader />

                <View style={styles.sortBar}>
                    <RechordCollectionSortBar />
                </View>

                <View style={styles.toggle}>
                    <RechordCollectionToggle
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
                
            </View>
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