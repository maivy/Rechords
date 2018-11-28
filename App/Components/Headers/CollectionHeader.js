import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Metrics, Colors, Styles, Images } from '../../Themes';

export default class CollectionHeader extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={Styles.h1}>Rechord Collection</Text>
                
                <View style={styles.profileWrapper}>
                    <Image
                        style={styles.profileImage}
                        source={Images.profileIcon} />

                    <Text style={styles.profileName}>Tiffany Manuel</Text>
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
    profileWrapper: {
        flexDirection: 'row',
    },
    profileImage: {
        margin: Metrics.smallMargin,
    },
    profileName: {
        alignSelf: 'center',
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 20,
    }
})