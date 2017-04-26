import React, { Component } from 'react';
import { Animated, PanResponder, LayoutAnimation, StyleSheet } from 'react-native';
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

  state = {
    expanded: false,
    slideOffset: 0,
    animatedRemove: new Animated.Value(1),
  }

  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder:
        (event, gestureState) => gestureState.dx > 0,

      onPanResponderMove: (event, gestureState) => {
        this.setState({ slideOffset: gestureState.dx })
      },

      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx < 100) {
          this.setState({ slideOffset: 0 });
        } else {
          Animated.timing( this.state.animatedRemove, {
            duration: 300,
            toValue: 0,
          }).start( () => {
            const { bug, handleRemove } = this.props;

            handleRemove(bug);
            this.setState({
              animatedRemove: new Animated.Value(1),
              slideOffset: 0,
            });
          });
        }
      }
    });
  }

  componentWillUpdate() {
    const config = {
      duration: 950,
      update: {
        type: 'spring',
        springDamping: 0.4,
      },
    };
    LayoutAnimation.configureNext(config);
  }

  handlePress() {
    this.setState(
      state => ({ expanded: !state.expanded }),
    )
  }

  render() {
    const { bug } = this.props;
    console.log('Rendering item', bug);
    const { expanded } = this.state;
    const transformStyle = {
      transform: [
        { translateX: this.state.slideOffset },
      ],
      opacity: this.state.animatedRemove.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    }

    return (
        <Animated.View {...this.panResponder.panHandlers} style={transformStyle}>
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
      <TouchableOpacity onPress={this.handlePress}>

              <Text styleName="multiline">{expanded ? bug.description : bug.description.slice(0, 40) + "…"}</Text>
      </TouchableOpacity>

            </View>
          </Row>
        </Animated.View>
    );
  }
}
