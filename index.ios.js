import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import HomeScreen from './src/components/HomeScreen';

class AnimationShowcase extends Component {
  render() {
    return (
      <HomeScreen />
    );
  }
}

AppRegistry.registerComponent('AnimationShowcase', () => AnimationShowcase);
