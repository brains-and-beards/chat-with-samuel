import React, { Component, PropTypes } from 'react';
import { Animated, StyleSheet } from 'react-native';
import {
  Button, Icon, Text, View,
} from '@shoutem/ui';

const styles = {
  container: {
    marginHorizontal: 50,
    marginVertical: 20,
    height: 40,
  },
  image: {
    height: 34,
    width: 34,
    resizeMode: 'contain',
    borderRadius: 17,
    backgroundColor: '#F2F2F2',
    marginVertical: 4,
  }
}

export default class CustomButton extends Component {

  state = {
    animatedOpacity: new Animated.Value(0),
    animatedOffsetX: new Animated.Value(4),
    animatedOffsetY: new Animated.Value(0),
    animatedScale: new Animated.Value(0),
    animatedRotate: new Animated.Value(0),
    pressed: false,
  }

  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    if (this.state.pressed) return null;
    const { onPress } = this.props;
    const duration = 1000;

    this.setState(
      { pressed: true },
      () => {
        onPress();
        Animated.parallel([
          Animated.timing(this.state.animatedOpacity, {
            duration,
            toValue: 1,
          }),
          Animated.timing(this.state.animatedOffsetX, {
            duration,
            toValue: Math.random() * 200 * (Math.random() < 0.5 ? -1 : 1),
          }),
          Animated.timing(this.state.animatedOffsetY, {
            duration,
            toValue: Math.random() * -500,
          }),
          Animated.timing(this.state.animatedScale, {
            duration,
            toValue: 1,
          }),
          Animated.timing(this.state.animatedRotate, {
            duration,
            toValue: Math.random(),
          })
        ]).start(() => {
          this.state.animatedOpacity.setValue(0);
          this.state.animatedOffsetX.setValue(4);
          this.state.animatedOffsetY.setValue(0);
          this.state.animatedScale.setValue(0);
          this.state.animatedRotate.setValue(0);

          this.setState({ 
            pressed: false,
          })
        });
      }
    );
  }

  samuelIcon() {
    const samuelIcon = require('../assets/images/pulp-fiction-icon.png');

    const startingOffset = Math.random() * 200;
    const endingOffset = Math.random() * 300;
    const offsetY = Math.random() * 500;

    const sizeInterpolate = this.state.animatedScale.interpolate({
      inputRange: [0, 1],
      outputRange: [34, 256],
    })
    const iconStyle = {
      ...styles.image,
      transform: [
        {
          translateX: this.state.animatedOffsetX.interpolate({
            inputRange: [-200, 200],
            outputRange: [-200, 200],
          }),
        },
        {
          translateY: this.state.animatedOffsetY.interpolate({
            inputRange: [-1000, 0],
            outputRange: [-1000, -41],
          }),
        },
        {
          rotate: this.state.animatedRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
      opacity: this.state.animatedOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      height: sizeInterpolate,
      width: sizeInterpolate
    }

    return <Animated.Image style={iconStyle} source={samuelIcon} />
  }

  render() {
    const { onPress } = this.props;

    return (
      <View style={styles.container}>
        <Button styleName="dark" onPress={this.handlePress}>
          <Icon name="refresh" />
          <Text>RELOAD DATA</Text>
        </Button>
        {this.samuelIcon()}
      </View>
    );
  }
}
