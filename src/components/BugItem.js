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

  state = { 
    showDetails: false,
    height: 75,
  }

  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  calculateNewHeight(expanded) {
    const { bug } = this.props;
    return expanded ? Math.ceil(bug.description.length / 40) * 25 + 60 : 75;
  }

  handlePress() {
    this.setState(prevState => {
      const showDetails = !prevState.showDetails;

      return ({
        showDetails,
        height: this.calculateNewHeight(showDetails),
      })
    });
  }

  render() {
    const { bug } = this.props;
    const { showDetails, height } = this.state;

    return (
      <TouchableOpacity onPress={this.handlePress} style={{ height }}>
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
