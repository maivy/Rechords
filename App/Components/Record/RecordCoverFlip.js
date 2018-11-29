// EXAMPLE:
// --------------------------------------------
//     <View style={styles.coverWrapper}>  // set width and height of cover here
//         <RecordCoverFlip
//             edit                        // add edit tag if edit mode
//             info={params.item}
//             style={styles.recordCover}
//         />
//     </View>

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';

import RecordCover from './RecordCover';
import { RecordBackCover, RecordEditBack } from '..';
import { Colors, Metrics } from '../../Themes';
import SubmitButton from '../SubmitButton';

// Reused Code from: https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native

export default class RecordCoverFlip extends Component {

  state = {
    description: ''
  }

  updateDescription = (description) => {
    this.setState({ description: description });
  }
  
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
    this.backOpacity = this.animatedValue.interpolate({ inputRange: [89, 90], outputRange: [1, 0] });
    this.frontOpacity = this.animatedValue.interpolate({ inputRange: [89, 90], outputRange: [0, 1] });
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
      ],
      opacity: this.backOpacity
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ],
      opacity: this.frontOpacity
    }
    return (
      <View style={styles.container}>

          {/* <Animated.View style={[styles.flipCard, backAnimatedStyle, styles.flipCardBack]}>
              { // Check if in edit mode
                this.props.edit ? (
                  <RecordEditBack />
                ) : (
                  <RecordBackCover
                    description={this.props.info.description}
                    flip={this.flipCard}
                  />
                )
              }
          </Animated.View> */}

          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              { // Check if in edit mode
                this.props.edit ? (
                  <RecordCover
                    noImage
                    info={this.props.info}
                    fontStyle={{ fontSize: 18 }}
                    updateDescription={this.updateDescription}
                  />
                ) : (
                  <RecordCover
                    info={this.props.info}
                    fontStyle={{ fontSize: 18 }}
                    flip={this.flipCard}
                  />
                )
              }
          </Animated.View>

          <Animated.View style={[styles.flipCard, backAnimatedStyle, styles.flipCardBack]}>
              { // Check if in edit mode
                this.props.edit ? (
                  <RecordEditBack
                    updateDescription={this.updateDescription}
                  />
                ) : (
                  <RecordBackCover
                    description={this.props.info.description}
                    flip={this.flipCard}
                  />
                )
              }
          </Animated.View>

          {
            this.props.edit ? (
              <SubmitButton
                text='Flip'
                function={this.flipCard}
              />
            ) : null
          }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
});