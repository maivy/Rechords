import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';

import { Record, ActionBar, ViewHeader } from '../Components';
import RecordCoverFlip from '../Components/Record/RecordCoverFlip';

import { Metrics, Colors } from '../Themes';

export default class RechordViewerScreen extends React.Component {

    state = {
        recordStyle: styles.recordHidden,
        recordHidden: true,
    }

    constructor(props) {
        super(props)
    }

    goBack = () => {
        this.props.navigation.navigate('CollectionScreen')
    }

    toggleRecord() {
        if (this.state.recordHidden) {
            this.setState({ 
                recordStyle: styles.recordShown,
                recordHidden: false,
            });
        } else {
            this.setState({
                recordStyle: styles.recordHidden,
                recordHidden: true,
            });
        }
    }

    render() {
        const params = this.props.navigation.state.params;
        return (
            <SafeAreaView style={{flex: 1}}>
                <LinearGradient
                    colors={[Colors.blue, Colors.purple]}
                    style={styles.gradient}
                />

                <View style={styles.container}>

                    <ViewHeader
                        title={params.item.title}
                        goBack={this.goBack}
                    />

                    <View style={[styles.rechord]}>
                        <TouchableOpacity
                            style={this.state.recordStyle}
                            onPress={() => this.toggleRecord()}>

                            <Record
                                small
                                title={params.item.song}
                                artist={params.item.artist}
                                containerStyle={styles.record}
                            />
                        </TouchableOpacity>
                        
                        <View style={styles.coverWrapper}>
                            <RecordCoverFlip
                                info={params.item}
                                style={styles.recordCover}
                            />
                        </View>
                    </View>

                    <ActionBar />
                    
                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Metrics.smallMargin
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
    },
    gradient: {
        position: 'absolute',
        width: Metrics.width,
        height: Metrics.height,
        top: 0,
        left: 0,
    },
    rechord: {
        alignItems: 'center'
    },
    recordShown: {
        zIndex: 100
    },
    recordHidden: {
        zIndex: 0
    },
    coverWrapper: {
        marginTop: -(Metrics.record.outerSmall * (3/5))
    }
})