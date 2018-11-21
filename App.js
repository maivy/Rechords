import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';

import { RechordCollectionScreen } from './App/Screens/';
import { Record, RecordCover } from './App/Components/';
import { Metrics, Images } from './App/Themes';

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
  coverWrapper: {
    width: Metrics.widths.cover,
    height: Metrics.widths.cover,
},
});
