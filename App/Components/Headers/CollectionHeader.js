import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Metrics, Colors, Styles, Images } from '../../Themes';

export default class CollectionHeader extends React.Component {

    constructor(props) {
        super(props)
    }

    signOut = () => {
        firebase.auth().signOut();
        this.props.logOut();
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
                        <Text style={styles.profileName}>Tiffany Manuel</Text>

                        <TouchableOpacity
                            onPress={() => this.signOut()}
                        >
                            <Text style={styles.signOut}>Sign Out</Text>
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
        padding: Metrics.smallMargin,
        backgroundColor: Colors.purple
    },
    profileTextWrapper: {
        flexDirection: 'column',
        alignSelf: 'center',
    },
    signOut: {
        fontSize: 12,
        // color: 'rgba(255, 255, 255, 0.8)',
        color: Colors.white,
        textDecorationLine: 'underline',
    },
    profileWrapper: {
        flexDirection: 'row',
    },
    profileImage: {
        margin: Metrics.smallMargin,
    },
    profileName: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 18,
    }
})