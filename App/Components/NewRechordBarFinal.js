import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Metrics, Colors, Images } from '../Themes';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class NewRechordBarFinal extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.edit}>
                        <MaterialCommunityIcons
                            name='pencil-circle'
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
                    <Text style={styles.itemLabel}>{this.props.item.song + " - " + this.props.item.artist}</Text>
                </View>

                <View style={styles.item}>
                    <Entypo
                        name='location-pin'
                        color={Colors.blue}
                        size={Metrics.icons.small}
                    />
                    <Text style={styles.itemLabel}>Harrison Hot Springs</Text>
                </View>

                <View style={styles.item}>
                    <Ionicons
                        name='ios-calendar'
                        color={Colors.blue}
                        size={Metrics.icons.small}
                    />
                    <Text style={styles.itemLabel}>{monthNames[this.props.date.getMonth()] + " " + this.props.date.getDate() + ", " + this.props.date.getFullYear()}</Text>
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
    itemLabel: {
        marginLeft: 30,
        color: Colors.darkGrey,
        position: 'absolute',
    },
})