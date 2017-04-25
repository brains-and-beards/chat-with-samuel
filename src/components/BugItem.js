import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button, Caption, Icon, Image, ListView, Row, Subtitle, Text, TouchableOpacity, View
} from '@shoutem/ui';
import moment from 'moment';

import bugs from '../assets/data/Bugs';

const styles = {
  buttonWrapper: {
    marginHorizontal: 80,
    marginTop: 10,
  },
  list: {
    flex: 1,
  },
}

export default class HomeScreen extends Component {

  state = { showDetails: false }

  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.setState(prevState => ({ showDetails: !prevState.showDetails }));
  }

  render() {
    const { bug } = this.props;
    const { showDetails } = this.state;

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Row>
          <Image
            styleName="small-avatar top"
            source={bug.avatar}
          />
          <View styleName="vertical">
            <View styleName="horizontal space-between">
              <Subtitle styleName="">Dustin Malone</Subtitle>
              <Caption>{moment(bug.createdAt, "YYYYMMDD").fromNow()}</Caption>
            </View>
            <Text styleName="multiline">{showDetails ? bug.description : bug.synopsis}</Text>
          </View>
        </Row>
      </TouchableOpacity>
    );
  }
}
