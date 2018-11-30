import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

import RecordCover from '../Components/Record/RecordCover';
import { Metrics } from '../Themes';
import PersonalRechords from '../Data/PersonalRechords';
import RecordCoverFlip from '../Components/Record/RecordCoverFlip';
import SubmitButton from '../Components/SubmitButton';

export default class EditRechord extends React.Component {
    
    state = {
        image: '',
    } 

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.coverWrapper}>
                    {/* <RecordCover
                        noImage
                        info={PersonalRechords[0]}
                        fontStyle={{ fontSize: 18 }}
                    /> */}
                    <RecordCoverFlip
                        edit
                        info={PersonalRechords[0]}
                        fontStyle={{ fontSize: 18 }}
                        uid={this.props.uid}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    coverWrapper: {
        width: Metrics.widths.coverMedium,
        height: Metrics.widths.coverMedium,
    }
})