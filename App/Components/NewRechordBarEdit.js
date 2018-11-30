import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Metrics, Colors, Images } from '../Themes';

export default class NewRechordBarEdit extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.edit}>
                        <Ionicons
                            name='ios-checkmark-circle'
                            color={Colors.blue}
                            size={Metrics.icons.small}
                        />
                    </View>
                </TouchableOpacity>
                
                <View style={styles.item}>
                    <Ionicons
                        name='ios-musical-notes'
                        color={Colors.blue}
                        size={Metrics.icons.small}
                    />
                    <View style={styles.textInputView}>
                        <TextInput 
                            style={styles.itemLabel}
                            placeholder="Happier - Marshmello, Bastille"
                            placeholderTextColor={Colors.darkGrey}
                            underlineColorAndroid='white'
                        />
                    </View>
                </View>

                <View style={styles.item}>
                    <Entypo
                        name='location-pin'
                        color={Colors.blue}
                        size={Metrics.icons.small}
                    />
                    <View style={styles.textInputView}>
                        <TextInput 
                            style={styles.itemLabel}
                            placeholder="Happier - Marshmello, Bastille"
                            placeholderTextColor={Colors.darkGrey}
                            underlineColorAndroid='white'
                        />
                    </View>
                </View>

                <View style={styles.item}>
                    <Ionicons
                        name='ios-calendar'
                        color={Colors.blue}
                        size={Metrics.icons.small}
                    />
                    <View style={styles.textInputView}>
                        <TextInput 
                            style={styles.itemLabel}
                            placeholder="Happier - Marshmello, Bastille"
                            placeholderTextColor={Colors.darkGrey}
                            underlineColorAndroid='white'
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        width: Metrics.widths.wide,
        height: Metrics.heights.sortBy,
        padding: Metrics.tinyMargin,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: Metrics.borderRadius.sortBy,
        shadowOffset: { width: 0, height: 1 },
        shadowColor: Colors.black,
        shadowOpacity: 0.25,
        elevation: 5,
    },
    edit: {
        alignItems: 'flex-end',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    textInputView: {
        flexDirection: 'column',
        position: 'absolute',
        marginLeft: 30,
        alignItems: 'flex-start',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 1,
        paddingBottom: 1,
        width: Metrics.widths.wide * 0.8,
        backgroundColor: '#e5e5e5',
    },
    itemLabel: {
        color: Colors.darkGrey,
    },
})