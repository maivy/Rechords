import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';

import { RechordViewerScreen } from './App/Screens/';
// import { Record, RecordCover } from './App/Components/';
import { Metrics, Images } from './App/Themes';
import RecordCoverFlip from './App/Components/RecordCoverFlip';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <RechordViewerScreen /> */}
        <RecordCoverFlip />
      </SafeAreaView>
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
