import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Record from './App/Components/Record';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Record />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
