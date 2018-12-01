import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Dimensions } from 'react-native';
import Record from '../Components/Record/Record';
import NewRechordHeader from '../Components/Headers/NewRechordHeader';
import RecordCoverFlip from '../Components/Record/RecordCoverFlip';
import NewRechordBarFinal from '../Components/NewRechordBarFinal';
import NewRechordBarEdit from '../Components/NewRechordBarEdit';
import { Metrics, Colors } from '../Themes';
import firebase from 'firebase';

const {width, height} = Dimensions.get('window');
const date = new Date();

export default class EditRechordScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            rechordTitle: '',
            song: 'Put Your Rechords On',
            artist: 'Corinne Bailey Rae',
            location: 'Example Location',
            date: (date.getMonth() + 1) + " " + date.getDate() + " " + JSON.stringify(date.getFullYear()).substr(2, 2),
            description: 'Example Description',
            owner: '',
            edit: false,
        }

        this.findOwner();
    }

    findOwner = () => {
        var user = firebase.auth().currentUser;
        var ref = firebase.database().ref("users/" + user.uid);
        var name;
        var that = this;
        ref.once("value")
            .then(function(snapshot) {
                name = snapshot.child("name").val();
                that.setState({ owner: name });
        });
    }

    goBack = () => {
        this.props.navigation.navigate('Home');
    }

    updateRechordTitle = (newTitle) => {
        this.setState({ rechordTitle: newTitle });
    }

    updateLocation = (newLocation) => {
        this.setState({ location: newLocation });
    }

    updateDate = (newDate) => {
        this.setState({ date: newDate });
    }

    toggleEditMode = () =>  {
        if (this.state.edit) {
            this.setState({ edit: false });
        } else {
            this.setState({ edit: true });
        }
    }

    render() {
        const params = this.props.navigation.state.params;
        return (
            <SafeAreaView style={styles.container}>
                <NewRechordHeader 
                    goBack={this.goBack}
                    rechordTitle={this.state.rechordTitle}
                    updateRechordTitle={this.updateRechordTitle}
                />

                <View style={styles.whiteBar}>
                {
                    this.state.edit ? (
                        <NewRechordBarEdit
                            item={this.state}
                            date={date}
                            toggleEditMode={this.toggleEditMode}
                            updateLocation={this.updateLocation}
                            updateDate={this.updateDate}
                        />
                    ) : (
                        <NewRechordBarFinal
                            item={this.state}
                            date={date}
                            toggleEditMode={this.toggleEditMode}
                        />
                    )
                }
                </View>

                <View style={styles.editCover}>
                    <View style={styles.album}>  
                        <RecordCoverFlip
                            edit                        
                            info={this.state}
                            albumStyle={styles.albumStyle}
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
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        overflow: 'scroll',
    },
    rechordTitle: {
        fontSize: 24,
        marginTop: Metrics.mediumMargin,
        marginBottom: Metrics.tinyMargin,
    },
    // editCover: {
    //     flex: 1,
    //     justifyContent: 'space-around',
    //     marginTop: Metrics.mediumMargin
    // },
    // album: {
    //     marginBottom: Metrics.mediumMargin,
    // },
    albumStyle: {
        width: Metrics.widths.coverMedium,
        height: Metrics.widths.coverMedium, 
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
        marginBottom: Metrics.mediumMargin
    },
})