import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet } from 'react-native';
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

  state = { expanded: false }

  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
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
    const { expanded } = this.state;

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
            <Text styleName="multiline">{expanded ? bug.description : bug.description.slice(0, 40) + "…"}</Text>
          </View>
        </Row>
      </TouchableOpacity>
    );
  }
}
