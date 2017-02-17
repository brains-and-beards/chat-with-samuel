import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, ListView, Row, Text, View } from '@shoutem/ui';

const bugs = [
  'foo',
  'bar',
  'baz',
]

const styles = {
  buttonWrapper: {
    marginHorizontal: 80,
    marginTop: 10,
  }
}

export default class HomeScreen extends Component {
  state = { bugs }

  renderRow(bug) {
    return (
      <Row styleName="small">
        <Icon name="email" />
        <Text>{bug}</Text>
      </Row>
    );
  }

  render() {
    return (
      <View>
        <ListView
          data={this.state.bugs}
          renderRow={this.renderRow}
        />
        <View style={styles.buttonWrapper}>
          <Button styleName="dupa">
            <Icon name="add-event" />
            <Text>ADD TO CALENDAR</Text>
          </Button>
        </View>
      </View>
    );
  }
}
