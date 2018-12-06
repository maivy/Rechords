import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, FlatList, ScrollView } from 'react-native';
import ExploreHeader from '../Components/Headers/ExploreHeader';
import RectangleLocation from '../Components/Explore/RectangleLocation';
// import styles from '../Themes/Styles';
import { Images, Colors, Metrics } from '../Themes'

export default class Explore extends React.Component {
  state = {
    recentlyVisited: ["Current Location", "Harrison Hot Springs", "Del Mar Fair", "Lynn Canyon"],
    recentlyViewed: ["Harrison Hot Springs", "Del Mar Fair", "Lynn Canyon", "Grouse Mountain"],
    addedTo: ["Harrison Hot Springs", "Del Mar Fair", "Lynn Canyon", "Grouse Mountain"],
    location: 'Search for a location...',
  }

  goBack = () => {
    this.props.navigation.navigation('Explore');
  }

  goToFindLocation = () => {
    this.props.navigation.navigation('FindLocationScreen', {
      location: this.state.location,
      updateLocation: this.updateLocation
    });
  }

  updateLocation = (newLocation) => {
    this.setState({ location: newLocation });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ExploreHeader
          goToFindFriend={this.goToFindFriend}
          placeholderText={this.state.friend}   // check if I need the go back function
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.category}>Recently Visited Locations</Text>
            <View style={{flexDirection: 'row'}}>
              <RectangleLocation
                label={this.state.recentlyVisited[0]}
                navigation={this.props.navigation}
              />
              <RectangleLocation
                label={this.state.recentlyVisited[1]}
                navigation={this.props.navigation}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <RectangleLocation
                label={this.state.recentlyVisited[2]}
                navigation={this.props.navigation}
              />
              <RectangleLocation
                label={this.state.recentlyVisited[3]}
                navigation={this.props.navigation}
              />
            </View>
          </View>

          <View style={{flexDirection: 'column'}}>
            <Text style={styles.category}>Recently Viewed Locations</Text>
            <View style={{flexDirection: 'row'}}>
              <RectangleLocation
                label={this.state.recentlyViewed[0]}
                navigation={this.props.navigation}
              />
              <RectangleLocation
                label={this.state.recentlyViewed[1]}
                navigation={this.props.navigation}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <RectangleLocation
                label={this.state.recentlyViewed[2]}
                navigation={this.props.navigation}
              />
              <RectangleLocation
                label={this.state.recentlyViewed[3]}
                navigation={this.props.navigation}
              />
            </View>
          </View>

          <View style={[{flexDirection: 'column'}, {overflow: 'scroll'}]}>
            <Text style={styles.category}>Collections You've Added To</Text>
            <View style={{flexDirection: 'row'}}>
              <RectangleLocation
                label={this.state.addedTo[0]}
                navigation={this.props.navigation}
              />
              <RectangleLocation
                label={this.state.addedTo[1]}
                navigation={this.props.navigation}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <RectangleLocation
                label={this.state.addedTo[2]}
                navigation={this.props.navigation}
              />
              <RectangleLocation
                label={this.state.addedTo[3]}
                navigation={this.props.navigation}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      // alignItems: 'flex-start',
      overflow: 'scroll',
  },
  scrollView: {
    alignItems: 'flex-start',
    marginLeft: Metrics.smallMargin,
    marginRight: Metrics.smallMargin,
    // overflow: 'scroll',
  },
  category: {
    marginTop: Metrics.smallMargin,
    fontSize: 18,
  },
})