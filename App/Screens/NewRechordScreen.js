import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Location, Permissions } from 'expo';

import NewRechordHeader from '../Components/Headers/NewRechordHeader';
import RecordCoverFlip from '../Components/Record/RecordCoverFlip';
import NewRechordBarFinal from '../Components/NewRechordBarFinal';
import NewRechordBarEdit from '../Components/NewRechordBarEdit';
import { Metrics, Colors } from '../Themes';
import firebase from 'firebase';

const {width, height} = Dimensions.get('window');
const date = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                    ];
const apiKey = 'AIzaSyDsUW3B-p8Bx8JwkW9aGdYUkaRa4y5RHV0';

export default class NewRechordScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            rechordTitle: '',
            song: 'Put Your Rechords On',
            artist: 'Corinne Bailey Rae',
            location: 'Example Location',
            date: (date.getMonth() + 1) + " " + date.getDate() + " " + JSON.stringify(date.getFullYear()).substr(2, 2),
            dateString: monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
            description: 'Example Description',
            owner: '',
            image: '',
            edit: false,
        }

        this.findOwner();

        this._getLocationAsync();
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

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.coords.latitude + ',' + location.coords.longitude + '&key=' + apiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[0].address_components[0].short_name));
            this.setState({ location: responseJson.results[0].address_components[0].short_name } );
        })
    };

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
        newDateNums = (newDate.getMonth() + 1) + " " + newDate.getDate() + " " + JSON.stringify(newDate.getFullYear()).substr(2, 2);
        this.setState({ date: newDateNums });

        newDateString = monthNames[newDate.getMonth()] + " " + newDate.getDate() + ", " + newDate.getFullYear();
        this.setState({ dateString: newDateString });
    }

    updateImage = (newImage) => {
        this.setState({ image: newImage });
    }

    updateDescription = (newDescription) => {
        console.log(newDescription);
        this.setState({ description: newDescription });
    }

    toggleEditMode = () =>  {
        if (this.state.edit) {
            this.setState({ edit: false });
        } else {
            this.setState({ edit: true });
        }
    }

    saveRechord = () => {
        var ref = firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('rechords').child(this.state.rechordTitle);
        ref.child('song').set(this.state.song);
        ref.child('artist').set(this.state.artist);
        ref.child('location').set(this.state.location);
        ref.child('date').set(this.state.date);
        ref.child('dateString').set(this.state.dateString);
        ref.child('description').set(this.state.description);
        ref.child('owner').set(this.state.owner);
        ref.child('albumCover').set(this.state.image);
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
                            toggleEditMode={this.toggleEditMode}
                            updateLocation={this.updateLocation}
                            updateDate={this.updateDate}
                        />
                    ) : (
                        <NewRechordBarFinal
                            item={this.state}
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
                            updateImage={this.updateImage}
                            updateDescription={this.updateDescription}
                        />
                    </View>

                    <View style={styles.createButtonView}>
                    {
                        (this.state.rechordTitle === '') ? (
                            <View
                                style={[styles.createButton, {backgroundColor: Colors.slateGreyAlpha}]}
                            >
                                <Text style={styles.createButtonText}>Save</Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.createButton}
                                activeOpacity = { .5 }
                                onPress={() => this.saveRechord()}
                            >
                                <Text style={styles.createButtonText}>Save</Text>
                            </TouchableOpacity>
                        )
                    }
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