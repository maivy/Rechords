import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Dimensions } from 'react-native';
import Record from '../Components/Record/Record';
import ShareHeader from '../Components/Headers/ShareHeader';
import RecordCoverFlip from '../Components/Record/RecordCoverFlip';
import { Metrics, Colors } from '../Themes';

const {width, height} = Dimensions.get('window');

export default class ShareScreen extends React.Component {

    state = {
        recordStyle: styles.recordHidden,
        recordHidden: true,
    }

    constructor(props) {
        super(props)
    }

    goBack = () => {
        this.props.navigation.navigate('ViewerScreen')
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
            <SafeAreaView style={styles.container}>
                <ShareHeader 
                    goBack={this.goBack}
                />

                <Text style={styles.rechordTitle}>{params.item.title}</Text>
                
                <View style={[styles.rechord]}>
                    <TouchableOpacity
                        style={this.state.recordStyle}
                        onPress={() => this.toggleRecord()}>

                        <Record
                            tiny
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

                <View style={styles.createButtonView}>
                    <TouchableOpacity
                        style={styles.createButton}
                        activeOpacity = { .5 }
                        onPress={() => this.signUp()}
                    >
                        <Text style={styles.createButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        overflow: 'scroll',
    },
    rechordTitle: {
        fontSize: 24,
        marginTop: Metrics.smallMargin,
        marginBottom: Metrics.smallMargin,
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
    },
    createButtonView: {
        alignItems: 'center',
        marginTop: height * 0.04,
        marginBottom: height * 0.05,
    },
    
    createButton: {
        width: width * 0.5,
        height: 50,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#68BEE2',
        borderRadius:100,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 5,
        shadowOpacity: 0.5,
        elevation: 5,
    },

    createButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        textAlign:'center',
    },
})