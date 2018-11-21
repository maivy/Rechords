import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';

import { RechordCollectionScreen } from './App/Screens/';
import { Record } from './App/Components/';
import { Metrics } from './App/Themes';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <RechordCollectionScreen /> */}
        <Record small />
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
  recordWrapper: {
    width: Metrics.width * 0.9,
    height: Metrics.width * 0.9,
  }
});
