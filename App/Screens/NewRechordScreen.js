import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Dimensions, Animated } from 'react-native';
import { Location, Permissions } from 'expo';
import firebase from 'firebase';

import NewRechordHeader from '../Components/Headers/NewRechordHeader';
import RecordCoverFlip from '../Components/Record/RecordCoverFlip';
import NewRechordBarFinal from '../Components/NewRechordBarFinal';
import NewRechordBarEdit from '../Components/NewRechordBarEdit';
import { Metrics, Colors } from '../Themes';
// import { throws } from 'assert';

const { width, height } = Dimensions.get('window');
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
            location: '--',
            date: (date.getMonth() + 1) + " " + date.getDate() + " " + JSON.stringify(date.getFullYear()).substr(2, 2),
            dateString: monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
            description: 'Example Description',
            owner: '',
            image: '',
            edit: false,
            moveAnimation: undefined
        }

        this.findOwner();

    }

    componentWillMount() {
        this._getLocationAsync();
        this.updateSong();
        console.log('Song updated with: ' + this.state.song + '=' + this.state.artist);
    }

    componentDidMount() {
        // this.getCoverPosition();
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

    getCoverPosition = () => {
        var that = this;
        this.coverFlip.measure((fx, fy, width, height, px, py) => {
            console.log('Component width is: ' + width)
            console.log('Component height is: ' + height)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)
            that.x = px;
            that.y = py;
        })

        if (that.x !== undefined) {
            this.setState({
                moveAnimation: new Animated.ValueXY({
                    x: that.x,
                    y: that.y
                })
            });
            console.log('CURRENT X: ' + that.x);
            console.log('CURRENT Y: ' + that.y);
        }
    }

    // _moveCover = () => {
    //     Animated.spring(this.moveAnimation, {
    //         toValue: {
    //             x: 100,
    //             y: 100
    //         }
    //     }).start();
    // }

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
        var newDateNums;
        if(JSON.stringify(newDate.getDate()).length === 1) {
            newDateNums = (newDate.getMonth() + 1) + " 0" + newDate.getDate() + " " + JSON.stringify(newDate.getFullYear()).substr(2, 2);
        } else { 
            newDateNums = (newDate.getMonth() + 1) + " " + newDate.getDate() + " " + JSON.stringify(newDate.getFullYear()).substr(2, 2);
        }

        if(JSON.stringify(newDate.getMonth()).length === 1) {
            newDateNums = "0" + newDateNums;
        }
        this.setState({ date: newDateNums});
        console.log(newDateNums);

        var newDateString = monthNames[newDate.getMonth()] + " " + newDate.getDate() + ", " + newDate.getFullYear();
        this.setState({ dateString: newDateString });
    }

    updateImage = (newImage) => {
        this.setState({ image: newImage });
    }

    updateDescription = (newDescription) => {
        this.setState({ description: newDescription });
    }

    updateSong() {
        const params = this.props.navigation.state.params;
        if (params) {
            this.setState({
                song: params.song,
                artist: params.artist
            });
        }
        // console.log("Song has been updated with: " + this.state.song + '-' + this.state.artist);
    }

    goToFindSong = () => {
        this.props.navigation.navigate('FindSong');
    }

    toggleEditMode = () =>  {
        if (this.state.edit) {
            this.setState({ edit: false });
        } else {
            this.setState({ edit: true });
        }
    }

    saveRechord = () => {
        var ref = firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('rechords').push();
        ref.child('title').set(this.state.rechordTitle);
        ref.child('song').set(this.state.song);
        ref.child('artist').set(this.state.artist);
        ref.child('location').set(this.state.location);
        ref.child('date').set(this.state.date);
        ref.child('dateString').set(this.state.dateString);
        ref.child('description').set(this.state.description);
        ref.child('owner').set(this.state.owner);
        ref.child('image').set(this.state.image);
        ref.child('favorite').set(false);
        ref.child('reference').set(ref.getKey());

        this.props.navigation.navigate("RechordCollection");
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
                {/* {
                    this.state.edit ? ( */}
                        <NewRechordBarEdit
                            item={this.state}
                            toggleEditMode={this.toggleEditMode}
                            updateLocation={this.updateLocation}
                            updateDate={this.updateDate}
                            goToFindSong={this.goToFindSong}
                            updateSong={this.updateSong}
                        />
                    {/* ) : (
                        <NewRechordBarFinal
                            item={this.state}
                            toggleEditMode={this.toggleEditMode}
                        />
                    )
                } */}
                </View>

                <View style={styles.editCover}>
                    <View style={styles.album}
                        onLayout={(event) => this.getCoverPosition(event)}
                        ref={view => { this.coverFlip = view; }}>  
                        <RecordCoverFlip
                            edit                        
                            info={this.state}
                            albumStyle={styles.albumStyle}
                            updateImage={this.updateImage}
                            updateDescription={this.updateDescription}
                            _moveCover={this._moveCover}
                            moveAnimation={this.state.moveAnimation}
                        />
                    </View>

                    <View style={styles.createButtonView}>
                    {
                        (this.state.rechordTitle === '') || (this.state.edit) ? (
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