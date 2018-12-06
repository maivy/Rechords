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
  TouchableOpacity,
  Text,
} from 'react-native';

import RecordCover from './RecordCover';
import { RecordBackCover, RecordEditBack } from '..';
import { Colors, Metrics } from '../../Themes';

// Reused Code from: https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native

export default class RecordCoverFlip extends Component {

  state = {
    description: '',
    frontZIndex: 100,
    backZIndex: 99,

  }

  constructor(props) {
    super(props);
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
    if (this.state.frontZIndex === 100) {
      this.setState({
        frontZIndex: 90,
        backZIndex: 100
      });
    } else {
      this.setState({
        frontZIndex: 100,
        backZIndex: 90
      });
    }
    // this.props._moveCover();
    // console.log("Called this.props._moveCover()");
  }

  getLayout() {
    if (this.props.moveAnimation) {
      return this.props.moveAnimation.getLayout();
    } else return {}
  }
  
  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ],
      opacity: this.backOpacity,
      zIndex: this.state.frontZIndex
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ],
      opacity: this.frontOpacity,
      zIndex: this.state.backZIndex
    }
    return (
      <View style={styles.container}>

          <Animated.View style={[styles.flipCard, this.props.albumStyle, frontAnimatedStyle]}>
              { // Check if in edit mode
                this.props.edit ? (
                  <RecordCover
                    noImage
                    info={this.props.info}
                    fontStyle={{ fontSize: 18 }}
                    updateImage={this.props.updateImage}
                    uid={this.props.uid}
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

          <Animated.View style={[styles.flipCard, this.props.albumStyle, backAnimatedStyle, styles.flipCardBack]}>
              { // Check if in edit mode
                this.props.edit ? (
                  <RecordEditBack
                    updateDescription={this.props.updateDescription}
                    description={this.props.info.description}
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
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => this.flipCard()}>

                <Text style={styles.editButton}>Flip</Text>
              </TouchableOpacity>
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
    // width: Metrics.widths.coverMedium,
    // height: Metrics.widths.coverMedium,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: Metrics.borderRadius.recordCover,
  },
  flipCardBack: {
    backgroundColor: Colors.darkGrey,
    position: "absolute",
    top: 0,
  },
  buttonWrapper: {
    marginTop: Metrics.smallMargin
  },
  editButton: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: Colors.blue
  }
});