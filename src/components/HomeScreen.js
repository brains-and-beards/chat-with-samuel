import React, { Component } from 'react';
import { NavigationBar, Screen, Title } from '@shoutem/ui';

import BugList from './BugList';

export default class HomeScreen extends Component {
  render() {
    return (
      <Screen>
        <NavigationBar 
          centerComponent={<Title>List items</Title>}
          styleName="inline"
        />
        <BugList />
      </Screen>
    );
  }
}
