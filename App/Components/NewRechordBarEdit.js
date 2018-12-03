import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Metrics, Colors, Images } from '../Themes';
import DateTimePicker from 'react-native-modal-datetime-picker';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Reused code from: https://github.com/mmazzarolo/react-native-modal-datetime-picker

export default class NewRechordBarEdit extends React.Component {
    state = {
        isDateTimePickerVisible: false,
    }

    constructor(props) {
        super(props)
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date) => {
        this.hideDateTimePicker();
        this.props.updateDate(date);
    };

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
                                value={this.props.item.song + " - " + this.props.item.artist}
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
                                value={this.props.item.location}
                                onChangeText={(location) => this.props.updateLocation(location)}
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
                            <TouchableOpacity
                                onPress={() => this.showDateTimePicker()}
                            >
                                <Text style={styles.itemLabel} numberOfLines={1}>{this.props.item.dateString}</Text>
                            </TouchableOpacity>

                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                date={this.props.date}
                                mode='date'
                                onConfirm={(date) => this.handleDatePicked(date)}
                                onCancel={() => this.hideDateTimePicker()}
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