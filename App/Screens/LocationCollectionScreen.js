import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, } from 'react-native';

import {
    LocationCollectionHeader,
    LocationCollectionSortBar,
    LocationCollectionToggle,
    CollectionListItem
} from '../Components';
import firebase from 'firebase';
import { Metrics } from '../Themes';

export default class CollectionScreen extends React.Component {  

    state = {
        data: [],
        index: 0,
        currUserName: '',
        location: ''
    }

    // Function to toggle between personal and friend rechords
    updateIndex = (index) => {
        this.setState({index: index});
        if (index === 0) {
            this.componentWillMount();
        } else {
            // this.setState({data: []});
            this.getMyRechords();
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        const params = this.props.navigation.state.params;
        if (params.location === 'Current Location') {
            this.setState({ location: 'Hasso Plattner Institute of Design' });
        } else {
            this.setState({ location: params.location });
        }
        // Look at following line for sort by functionality (orderByChild(...))
        var ref = firebase.database().ref('explore').child(this.props.navigation.state.params.location);
        var rechords = [];
        var that = this;

        ref.on('value', function(dataSnapshot) {
            rechords = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                rechords.unshift(childData);    // Note: unshift() adds to the front of the array
            })
            that.setState({ data: rechords });
        });

        var userRef = firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('name');
        var that = this;
        userRef.once('value').then(function(snapshot){
            var snapshotVal = snapshot.val();
            that.setState({ currUserName: snapshotVal });
        })
    }

    getMyRechords = () => {
        console.log("USER NAME: " + this.state.currUserName);
        var ref = firebase.database().ref('explore').child(this.props.navigation.state.params.location);
        var rechords = [];
        var that = this;

        ref.on('value', function(dataSnapshot) {
            rechords = [];
            dataSnapshot.forEach(function(childSnapshot) {
                if(JSON.stringify(childSnapshot.child('owner')) === JSON.stringify(that.state.currUserName)) {
                    console.log("WORKING");
                    var childData = childSnapshot.val();
                    rechords.unshift(childData);    // Note: unshift() adds to the front of the array
                }
            })
            that.setState({ data: rechords });
        });
    }

    goToViewer = (item) => {
        console.log("ITEM: " + JSON.stringify(item));
        this.props.navigation.navigate(
        'ViewerScreen',
        {
            item: item,
            location: true
        }
    )}

    goBack = () => {
        this.props.navigation.goBack();
    }

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
        const params = this.props.navigation.state.params;
        return (
            <SafeAreaView style={styles.container}>

                <LocationCollectionHeader 
                    location={this.state.location}
                    goBack={this.goBack}
                />

                <View style={styles.sortBar}>
                    <LocationCollectionSortBar />
                </View>

                <View style={styles.toggle}>
                    <LocationCollectionToggle
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
        marginTop: -65, // move sort bar over header
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