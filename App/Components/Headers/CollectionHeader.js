import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import firebase from 'firebase';
import { Metrics, Colors, Styles, Images } from '../../Themes';

export default class CollectionHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currUser: '',
        }

        this.findOwner();
    }

    signOut = () => {
        firebase.auth().signOut();
        this.props.logOut();
    }

    findOwner = () => {
        var user = firebase.auth().currentUser;
        var ref = firebase.database().ref("users/" + user.uid);
        var name;
        var that = this;
        ref.once("value")
            .then(function(snapshot) {
                name = snapshot.child("name").val();
                that.setState({ currUser: name });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={Styles.h1}>Rechord Collection</Text>
                    
                <View style={styles.profileWrapper}>
                    <Image
                        style={styles.profileImage}
                        source={Images.profileIcon} />
                    
                    <View style={styles.profileTextWrapper}>
                        <Text style={styles.profileName}>{this.state.currUser}</Text>

                        <TouchableOpacity
                            onPress={() => this.signOut()}
                        >
                            <Text style={styles.signOut}>(Sign Out)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Metrics.heights.header,
        padding: (Platform.OS === 'ios') ? Metrics.smallMargin : Metrics.mediumMargin,
        backgroundColor: Colors.purple
    },
    profileWrapper: {
        flexDirection: 'row',
    },
    profileTextWrapper: {
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
        // margin: (Platform.OS === 'ios') ? Metrics.mediumMargin : 0
        // margin: Metrics.mediumMargin,
    },
    signOut: {
        fontSize: 12,
        color: Colors.white,
        textDecorationLine: 'underline',
    },
    profileImage: {
        margin: Metrics.smallMargin,
    },
    profileName: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 18,
        // marginRight: Metrics.miniMargin
    }
})