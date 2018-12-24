import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Animated,
  StatusBar
} from "react-native";
import { Constants } from "expo";
import firebase from "firebase";

import {
  CollectionHeader,
  CollectionSortBar,
  CollectionToggle,
  CollectionListItem
} from "../Components";

import { Metrics, Colors } from "../Themes";
import { SORT_ENUM } from "../Data";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const HEADER_HEIGHT = Metrics.heights.header + Metrics.heights.sortBy + 65 - 39;

const SORT_OPTIONS = [
    "personal",
    "friend",
    "newest",
    "oldest",
    "location",
    "song",
    "title",
    "favorites"
];
export default class CollectionScreen extends React.Component {
  state = {
    index: 0,
    selectedIndex: 0,
    data: [],
    scrollAnim: new Animated.Value(0),
    offsetAnim: new Animated.Value(0),
    refs: {
      personalRechords: this.getRef('rechords'),
      friendRechords: this.getRef('friendsRechords'),
    }
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.state.scrollAnim.addListener(this._handleScroll);
    this.loadRechords(this.state.refs.personalRechords, false);
    console.log("=== Loaded rechords!");
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeListener(this._handleScroll);
  }

  _handleScroll = ({ value }) => {
    this._previousScrollvalue = this._currentScrollValue;
    this._currentScrollValue = value;
  };

  _handleScrollEndDrag = () => {
    this._handleMomentumScrollEnd();
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
        friction: 35
      }).start();
    } else {
      Animated.timing(this.state.offsetAnim, {
        toValue: 0,
        duration: 500
      }).start();
    }
  };

  getRef(childRef, optionalOrderBy) {
    const orderByCondition = optionalOrderBy ? optionalOrderBy : 'date';
    return firebase
      .database()
      .ref("users")
      .child(firebase.auth().currentUser.uid)
      .child(childRef)
      .orderByChild(orderByCondition);
  }

  loadRechords(ref, inOrder = true) {
    console.log("ref: " + ref);
    var that = this;

    ref.on("value", function(dataSnapshot) {
      rechords = [];
      dataSnapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if (inOrder) rechords.push(childData);
        else rechords.unshift(childData); // Note: unshift() adds to the front of the array
      });
      that.setState({ data: rechords });
    });
  }

  loadFavoritedRechords() {
    const { selectedIndex, refs } = this.state;
    const ref = selectedIndex ? refs.friendRechords : refs.personalRechords;
    var that = this;
    ref.on("value", function(dataSnapshot) {
        rechords = [];
        dataSnapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          if (childData.favorite) rechords.unshift(childData); // Note: unshift() adds to the front of the array
        });
        that.setState({ data: rechords });
    });
  };

  // Function to 1) toggle between personal and friend rechords and 2) sort rechords
  updateIndex = index => {
    console.log("=== Updating Index Of: " + SORT_OPTIONS[index]);
    this.setState({ index: index });

    const { selectedIndex, refs } = this.state;
    const currRefOption = selectedIndex ? 'friendsRechords' : 'rechords';
    switch (index) {
      case SORT_ENUM.PERSONAL:
        this.setState({ selectedIndex: index });
        this.loadRechords(refs.personalRechords, false);
        break;
      case SORT_ENUM.FRIEND:
        this.setState({ selectedIndex: index });
        this.loadRechords(refs.friendRechords, false);
        break;
      case SORT_ENUM.OLDEST:
        const oldRef = this.getRef(currRefOption);
        this.loadRechords(oldRef);
        break;
      case SORT_ENUM.LOCATION:
        const locationRef = this.getRef(currRefOption, 'location');
        this.loadRechords(locationRef);
        break;
      case SORT_ENUM.SONG:
        const songRef = this.getRef(currRefOption, 'song');
        this.loadRechords(songRef);
        break;
      case SORT_ENUM.TITLE:
        const titleRef = this.getRef(currRefOption, 'title');
        this.loadRechords(titleRef);
        break;
      case SORT_ENUM.FAVORITES:
        this.loadFavoritedRechords();
        break;
      default:
        break;
    }
  };

  goToViewer = item => {
    this.props.navigation.navigate("ViewerScreen", {
      item: item,
      ref: item.reference,
      location: false,
      personal: this.state.selectedIndex === 0
    });
  };

  _keyExtractor = index => JSON.stringify(index);

  renderRechordItem = item => {
    return (
      <CollectionListItem
        info={item}
        personal={this.state.selectedIndex === 0}
        friend={this.state.selectedIndex === 1}
        coverContainerStyle={styles.coverWrapper}
        goToViewer={this.goToViewer}
      />
    );
  };

  render() {
    const { scrollAnim, offsetAnim } = this.state;

    const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -(HEADER_HEIGHT - 65 + 10)],
      extrapolate: "clamp"
    });

    let toggle = (
      <View style={styles.toggle}>
        <CollectionToggle
          selectedIndex={this.state.selectedIndex}
          updateIndex={this.updateIndex}
        />
      </View>
    );
    
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={styles.content}>
          <AnimatedFlatList
            contentContainerStyle={styles.list}
            columnWrapperStyle={styles.covers}
            numColumns={2}
            data={this.state.data}
            renderItem={({ item }) => this.renderRechordItem(item)}
            keyExtractor={this._keyExtractor}
            scrollEventThrottle={1}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }
            ])}
            onMomentumScrollEnd={this._handleMomentumScrollEnd}
            onScrollEndDrag={this._handleScrollEndDrag}
          ></AnimatedFlatList>
        </Animated.View>

        <Animated.View
          style={[styles.hideable, { transform: [{ translateY }] }]}
        >
          <CollectionHeader logOut={this.props.screenProps.logOut} />

          <View style={styles.sortBar}>
            <CollectionSortBar
                index={this.state.index}
                selectedIndex={this.state.selectedIndex}
                updateIndex={this.updateIndex}
            />
          </View>

          <View style={styles.toggleView}>{toggle}</View>
        </Animated.View>

        <View style={styles.statusBarBackground} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  statusBarBackground: {
    width: "100%",
    height: Constants.statusBarHeight,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white
  },
  hideable: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.white
  },
  content: {
    width: Metrics.widths.wide,
    alignItems: "center",
    overflow: "scroll"
  },
  list: {
    width: Metrics.widths.wide,
    paddingTop: HEADER_HEIGHT,
    overflow: "scroll"
  },
  sortBar: {
    marginTop: -39 // move sort bar over header
  },
  toggleView: {
    height: 65,
    justifyContent: "center"
  },
  toggle: {
    alignSelf: "center"
  },
  covers: {
    justifyContent: "space-between"
  },
  coverWrapper: {
    width: Metrics.widths.cover,
    height: Metrics.widths.cover
  }
});
