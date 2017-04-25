import React, { Component } from 'react';
import { Animated,Easing, StyleSheet } from 'react-native';
import {
  Button, Caption, Icon, Image, ListView, Row, Subtitle, Text, TouchableOpacity, View
} from '@shoutem/ui';
import moment from 'moment';

import bugs from '../assets/data/Bugs';

const styles = {
  container: {
    overflow: 'hidden',
  },
}

export default class HomeScreen extends Component {

  baseHeight = 25
  textHeight = new Animated.Value(0)
  state = { expanded: false }

  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  calculateExpandedHeight() {
    const { bug } = this.props;

    return Math.ceil(bug.description.length / 40) * 25 + 15;
  }

  handlePress() {
    console.log('Handling press');
    this.setState(
      state => ({ expanded: !state.expanded }),
      () => Animated.timing(this.textHeight, {
        toValue: this.state.expanded ? 1 : 0,
        duration: 300,
      }).start()
    )
  }

  render() {
    const { bug } = this.props;
    const height = this.textHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [this.baseHeight, this.calculateExpandedHeight()]
    })

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Row style={styles.container}>
          <Image
            styleName="small-avatar top"
            source={bug.avatar}
          />
          <View styleName="vertical v-end" style={styles.container}>
            <View styleName="horizontal space-between">
              <Subtitle styleName="">{bug.name}</Subtitle>
              <Caption>{moment(bug.createdAt, "YYYYMMDD").fromNow()}</Caption>
            </View>
            <Animated.View style={{ height }}>
              <Text styleName="multiline">{bug.description}</Text>
            </Animated.View>
          </View>
        </Row>
      </TouchableOpacity>
    );
  }
}
