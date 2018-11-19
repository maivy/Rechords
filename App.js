import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';

import { RechordCollectionScreen } from './App/Screens/';
// import { RechordCollectionSortBar } from './App/Components/';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <RechordCollectionScreen />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
