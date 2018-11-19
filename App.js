import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RechordCollectionSortBar } from './App/Components/';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RechordCollectionSortBar />
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
