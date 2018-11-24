import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';

import { RecordCover } from '.';
import { Images, Colors, Metrics } from '../Themes';

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
        <View>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <TouchableOpacity onPress={() => this.flipCard()}>
            <RecordCover
              image={Images.cover1}
              location='Harrison Hot Springs'
              date='08 31 18'
              owner='Tiffany Manuel'
              flip={this.flipCard}
            />
            </TouchableOpacity>
          </Animated.View>

          {/* A temporary fix is to have the card flip if you tap anywhere. */}

          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <TouchableOpacity onPress={() => this.flipCard()}>
            <Text style={styles.flipText}>
              Chris and I went jet skiing and it was the happiest I had been in awhile.
              Being in the middle of a lake, surrounded by nothing but water, was what I
              needed after months of stress. I finally felt like I could breathe and live
              with no worries and live in the moment and just be happier.
            </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        
        <TouchableOpacity onPress={() => this.flipCard()}>
          <Text>Flip!</Text>
        </TouchableOpacity>
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
    width: Metrics.widths.wide,
    height: Metrics.widths.wide,
    backfaceVisibility: 'hidden',
    borderRadius: Metrics.borderRadius.recordCover
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
    margin: Metrics.smallMargin
  }
});