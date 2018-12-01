import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Metrics, Colors, Images } from '../Themes';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class NewRechordBarFinal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.allItems}>
                    <View style={[styles.item, { marginTop: 0 }]}>
                        <View style={styles.iconView}>
                            <Ionicons
                                name='ios-musical-notes'
                                color={Colors.blue}
                                size={Metrics.icons.small}
                            />
                        </View>

                        <View style={styles.textInputView}>
                            <Text style={styles.itemLabel} numberOfLines={1}>{this.props.item.song + " - " + this.props.item.artist}</Text>
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
                            <Text style={styles.itemLabel} numberOfLines={1}>{this.props.item.location}</Text>
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
                            <Text style={styles.itemLabel} numberOfLines={1}>{monthNames[this.props.date.getMonth()] + " " + this.props.date.getDate() + ", " + this.props.date.getFullYear()}</Text>
                        </View>
                    </View>
                
                </View>

                

                <TouchableOpacity
                    style={styles.edit}
                    onPress={() => this.props.toggleEditMode()}>
                    <View>
                        <MaterialCommunityIcons
                            name='pencil-circle'
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
        marginLeft: 4,
    },
    allItems: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Metrics.tinyMargin,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: Metrics.tinyMargin /2,
    },
    iconView: {
        width: Metrics.icons.small,
        height: Metrics.icons.small,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Metrics.tinyMargin
    },
    textInputView: {
        width: Metrics.widths.wide * 0.74,
    },
    itemLabel: {
        fontFamily: 'avenir-heavy',
        color: Colors.darkGrey,
    },
})