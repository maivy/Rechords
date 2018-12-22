import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
    Animated, 
    StatusBar,
} from 'react-native';
import { Constants } from 'expo';

import {
    CollectionHeader,
    CollectionSortBar,
    CollectionToggle,
    CollectionListItem
} from '../Components';

import { Metrics, Colors } from '../Themes';
import PersonalRechords from '../Data/PersonalRechords';
import FriendRechords from '../Data/FriendRechords';
import firebase from 'firebase';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const HEADER_HEIGHT = Metrics.heights.header + Metrics.heights.sortBy + 65 - 39;

export default class CollectionScreen extends React.Component {  

    state = {
        data: [],
        index: 0,
        scrollAnim: new Animated.Value(0),
        offsetAnim: new Animated.Value(0),
    }

    // Function to toggle between personal and friend rechords
    updateIndex = (index) => {
        this.setState({index: index});
        if (index === 0) {
            this.componentWillMount();
        } else {
            // this.setState({data: FriendRechords})
            this.getFriendRechords();
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        // Look at following line for sort by functionality (orderByChild(...))
        var ref = firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('rechords').orderByChild('date');
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
    }

    componentDidMount() {
        this.state.scrollAnim.addListener(this._handleScroll);
    }

    componentWillUnmount() {
        this.state.scrollAnim.removeListener(this._handleScroll);
    }

    _handleScroll = ({ value }) => {
        this._previousScrollvalue = this._currentScrollValue;
        this._currentScrollValue = value;
    };

    _handleScrollEndDrag = () => {
        this._handleMomentumScrollEnd()
    };

    _handleMomentumScrollEnd = () => {
        const currOffset = this.state.offsetAnim.__getValue();
        if (currOffset === 0) return;

        const previous = this._previousScrollvalue;
        const current = this._currentScrollValue;

        if (previous > current || current < HEADER_HEIGHT) {
            // User scrolled down or scroll amount was too less, lets snap back our header
            Animated.spring(this.state.offsetAnim, {
                toValue: -current,
                tension: 300,
                friction: 35,
            }).start();
        } else {
            Animated.timing(this.state.offsetAnim, {
                toValue: 0,
                duration: 500,
            }).start();
        }
    };

    getFriendRechords = () => {
        var ref = firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('friendsRechords').orderByChild('date');
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
    }

    goToViewer = (item) => {
        this.props.navigation.navigate(
        'ViewerScreen',
        {
            item: item,
            ref: item.reference,
            location: false,
            personal: (this.state.index === 0)
        }
    )
    }

    _keyExtractor = (index) => JSON.stringify(index);

    renderRechordItem = (item) => {
        return (
            <CollectionListItem
                personal={this.state.index === 0}
                friend={this.state.index === 1}
                info={item}
                coverContainerStyle={styles.coverWrapper}
                goToViewer={this.goToViewer}
            />
        )
    }

    render() {
        const { scrollAnim, offsetAnim } = this.state;

        const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
            inputRange: [0, HEADER_HEIGHT],
            outputRange: [0, -(HEADER_HEIGHT - 65 + 10)],
            extrapolate: 'clamp',
        });

        let toggle =
            <View style={styles.toggle}>
                <CollectionToggle
                    index={this.state.index}
                    updateIndex={this.updateIndex}
                />
            </View>;

        StatusBar.setBarStyle('dark-content', true);

        return (
            <SafeAreaView style={styles.container}>

                <Animated.View style={styles.content}>

                    <AnimatedFlatList
                        contentContainerStyle={styles.list}
                        columnWrapperStyle={styles.covers}
                        numColumns={2}
                        data={this.state.data}
                        renderItem={({item}) => this.renderRechordItem(item)}
                        keyExtractor={this._keyExtractor}

                        scrollEventThrottle={1}
                        onScroll={Animated.event([
                            { nativeEvent: { contentOffset: { y: this.state.scrollAnim } } },
                        ])}
                        onMomentumScrollEnd={this._handleMomentumScrollEnd}
                        onScrollEndDrag={this._handleScrollEndDrag}>
                    ></AnimatedFlatList>
                </Animated.View>

                <Animated.View style={[styles.hideable, { transform: [{ translateY }] }]}>
                    <CollectionHeader logOut={this.props.screenProps.logOut} />

                    <View style={styles.sortBar}>
                        <CollectionSortBar />
                    </View>

                    <View style={styles.toggleView}>
                        {toggle}
                    </View>
                </Animated.View>

                <View style={styles.statusBarBackground}></View>
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    statusBarBackground: {
        width: '100%',
        height: Constants.statusBarHeight,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white
    },
    hideable: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.white
    },
    content: {
        width: Metrics.widths.wide,
        alignItems: 'center',
        overflow: 'scroll',
    },
    list: {
        width: Metrics.widths.wide,
        paddingTop: HEADER_HEIGHT,
        overflow: 'scroll'
    },
    sortBar: {
        marginTop: -39, // move sort bar over header
    },
    toggleView: {
        height: 65,
        justifyContent: 'center',
    },
    toggle: {
        alignSelf: 'center',
    },
    covers: {
        justifyContent: 'space-between',
    },
    coverWrapper: {
        width: Metrics.widths.cover,
        height: Metrics.widths.cover,
    },
})