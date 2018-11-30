import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Dimensions } from 'react-native';
import Record from '../Components/Record/Record';
import NewRechordHeader from '../Components/Headers/NewRechordHeader';
import RecordCoverFlip from '../Components/Record/RecordCoverFlip';
import NewRechordBarFinal from '../Components/NewRechordBarFinal';
import NewRechordBarEdit from '../Components/NewRechordBarEdit';
import { Metrics, Colors } from '../Themes';

const {width, height} = Dimensions.get('window');
const date = new Date();

export default class EditRechordScreen extends React.Component {

    state = {
        rechordTitle: '',
        song: 'No Song',
        artist: 'No Artist',
        location: '',
        date: (date.getMonth() + 1) + " " + date.getDate() + " " + JSON.stringify(date.getFullYear()).substr(2, 2),
        description: '',
        owner: '',
        index: 0,
    }

    constructor(props) {
        super(props)
    }

    goBack = () => {
        this.props.navigation.navigate('Home');
    }

    updateRechordTitle = (title) => {
        this.setState({rechordTitle: title});
    }

    render() {
        const params = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <NewRechordHeader 
                    goBack={this.goBack}
                    rechordTitle={this.state.rechordTitle}
                    updateRechordTitle={this.updateRechordTitle}
                />

                <View style={styles.whiteBar}>
                    <NewRechordBarFinal
                        item={this.state}
                        date={date}
                    />
                </View>
                
                <View style={styles.album}>  
                    <RecordCoverFlip
                        edit                        
                        info={this.state}
                        style={styles.recordCover}
                    />
                </View>

                <View style={styles.createButtonView}>
                    <TouchableOpacity
                        style={styles.createButton}
                        activeOpacity = { .5 }
                        onPress={() => this.signUp()}
                    >
                        <Text style={styles.createButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    album: {
        marginTop: Metrics.mediumMargin,
        width: Metrics.widths.coverMedium,
        height: Metrics.widths.coverMedium, 
        marginBottom: Metrics.mediumMargin,
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
    whiteBar: {
        marginTop: -39,
    },
})