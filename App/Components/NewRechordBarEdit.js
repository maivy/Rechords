import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Metrics, Colors, Images } from '../Themes';

export default class NewRechordBarEdit extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.allItems}>
                    <View style={[styles.item, { marginTop: 0}]}>
                        <View style={styles.iconView}>
                            <Ionicons
                                name='ios-musical-notes'
                                color={Colors.blue}
                                size={Metrics.icons.small}
                            />
                        </View>
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
                        <View style={styles.iconView}>
                            <Entypo
                                name='location-pin'
                                color={Colors.blue}
                                size={Metrics.icons.small}
                            />
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput 
                                style={styles.itemLabel}
                                placeholder="Happier - Marshmello, Bastille"
                                placeholderTextColor={Colors.darkGrey}
                                underlineColorAndroid='white'
                            />
                        </View>
                    </View>

                    <View style={[styles.item, { marginBottom: 0 }]}>
                        <View style={styles.iconView}>
                            <Ionicons
                                name='ios-calendar'
                                color={Colors.blue}
                                size={Metrics.icons.small}
                            />
                        </View>

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

                <TouchableOpacity
                    style={styles.edit}
                    onPress={() => this.props.toggleEditMode()}>
                    <View>
                        <Ionicons
                            name='ios-checkmark-circle'
                            color={Colors.blue}
                            size={Metrics.icons.medium}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
        marginTop: -7,
        marginLeft: 6,
    },
    allItems: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: Metrics.tinyMargin,
    },
    item: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: Metrics.tinyMargin /2,
        marginBottom: Metrics.tinyMargin /2,
    },
    iconView: {
        width: Metrics.icons.small,
        height: Metrics.icons.small,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Metrics.tinyMargin
    },
    textInputView: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        width: Metrics.widths.wide * 0.74,
        backgroundColor: Colors.slateGreyAlpha,
    },
    itemLabel: {
        fontFamily: 'avenir-heavy',
        color: Colors.darkGrey,
    },
})