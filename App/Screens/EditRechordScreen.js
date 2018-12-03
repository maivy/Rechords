import React from 'react';
import { 
    StyleSheet, 
    View, 
    SafeAreaView, 
    TouchableOpacity, 
    Text, 
    Dimensions,
    Alert, 
} from 'react-native';
import Record from '../Components/Record/Record';
import EditRechordHeader from '../Components/Headers/EditRechordHeader';
import RecordCoverFlip from '../Components/Record/RecordCoverFlip';
import NewRechordBarFinal from '../Components/NewRechordBarFinal';
import NewRechordBarEdit from '../Components/NewRechordBarEdit';
import { Metrics, Colors } from '../Themes';
import firebase from 'firebase';``

const {width, height} = Dimensions.get('window');
// const date = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class NewRechordScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            rechordTitle: this.props.navigation.state.params.item.title,
            song: this.props.navigation.state.params.item.song,
            artist: this.props.navigation.state.params.item.artist,
            location: this.props.navigation.state.params.item.location,
            date: this.props.navigation.state.params.item.date,
            dateString: this.props.navigation.state.params.item.dateString,
            description: this.props.navigation.state.params.item.description,
            owner: this.props.navigation.state.params.item.owner,
            image: this.props.navigation.state.params.item.image,
            edit: false,
        }
    }

    goBack = () => {
        this.props.navigation.navigate('ViewerScreen');
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
        firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('rechords').child(this.props.navigation.state.params.item.title).remove()

        var ref = firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('rechords').child(this.state.rechordTitle);
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

        Alert.alert(
            'Your changes have been saved.',
            '',
            [
                {text: 'Undo', onPress: () => console.log('Undo Pressed'), style: 'destructive'},
                {text: 'Okay', onPress: () => this.goBack()},
            ],
            { cancelable: false }
        )
    }

    render() {
        const params = this.props.navigation.state.params;
        return (
            <SafeAreaView style={styles.container}>
                <EditRechordHeader 
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