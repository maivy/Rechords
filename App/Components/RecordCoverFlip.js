import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';

import { RecordCover } from '.';
import { Images, Colors, Metrics } from '../Themes';

// Reused Code from: https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native

export default class RecordCoverFlip extends Component {
  
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }
  
  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => this.flipCard()}> */}

          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
              <ScrollView>
                <Text style={styles.flipText}>{this.props.description}</Text>
              </ScrollView>
          </Animated.View>
          
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <RecordCover
                image={this.props.image}
                location={this.props.location}
                date={this.props.date}
                owner={this.props.owner}
                fontStyle={{fontSize: 18}}
                flip={this.flipCard}
              />
          </Animated.View>

          {/* A temporary fix is to have the card flip if you tap anywhere. */}

        {/* </TouchableOpacity> */}
        
        {/* <TouchableOpacity onPress={() => this.flipCard()}>
          <Text>Flip!</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  flipCard: {
    width: Metrics.widths.coverMedium,
    height: Metrics.widths.coverMedium,
    backfaceVisibility: 'hidden',
    borderRadius: Metrics.borderRadius.recordCover,
  },
  flipCardBack: {
    backgroundColor: Colors.darkGrey,
    position: "absolute",
    top: 0,
  },
  flipText: {
    height: '100%',
    fontSize: 18,
    color: 'white',
    margin: Metrics.smallMargin,
    fontFamily: 'avenir'
  }
});