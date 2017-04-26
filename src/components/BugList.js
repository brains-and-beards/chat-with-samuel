import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet } from 'react-native';
import {
  Button, Caption, Icon, Image, ListView, Row, Subtitle, Text, View
} from '@shoutem/ui';
import moment from 'moment';

import BugItem from './BugItem';
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
  state = { bugs }

  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  handleRemove(elementToRemove) {
    this.setState(state => {
      const filteredBugs = state.bugs.filter(item => item != elementToRemove);
      return({ bugs: filteredBugs });
    })
  }

  renderRow(bug) {
    return (
      <BugItem bug={bug} handleRemove={this.handleRemove} />
    );
  }

  render() {
    return (
      <ListView
        data={this.state.bugs}
        renderRow={this.renderRow}
        style={styles.list}
      />
    );
  }
}
