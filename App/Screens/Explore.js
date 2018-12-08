import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import ExploreHeader from '../Components/Headers/ExploreHeader';
import RectangleLocation from '../Components/Explore/RectangleLocation';

import { Images, Colors, Metrics } from '../Themes'

export default class Explore extends React.Component {
  state = {
    recentlyVisited: ["Current Location", "Half Moon Bay", "Boston", "Crothers"],
    recentlyViewed: ["New York", "Del Mar Fairgrounds", "Lynn Canyon", "Grouse Mountain"],
    addedTo: ["Building 550", "Half Moon Bay", "Boston", "Crothers"],
    location: 'Search for a location...',
  }

  goBack = () => {
    this.props.navigation.navigate('Explore');
  }

  goToFindLocation = () => {
    this.props.navigation.navigate('FindLocationScreen', {
      location: this.state.location,
      updateLocation: this.updateLocation,
      goToCollection: this.goToCollection,
      goBack: this.goBack
    });
  }

  goToCollection = (location) => {
    this.props.navigation.navigate('LocationCollection',
        {
            location: location,
        }
    )
  }

  updateLocation = (newLocation) => {
    this.setState({ location: newLocation });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ExploreHeader          
          placeholderText='Search for a location...'   // check if I need the go back function
          onPressFunction={this.goToFindLocation}
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
    color: Colors.darkGrey
  },
})