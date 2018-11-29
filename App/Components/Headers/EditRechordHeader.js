import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import NewRechordBarFinal from '../NewRechordBarFinal';
import { Metrics, Colors, Styles, Images } from '../../Themes';

export default class EditRechordHeader extends React.Component {
    state = {
        rechordTitle: '',
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                        style={styles.left}
                        onPress={() => this.props.goBack()}
                    >
                        <Ionicons
                            name='ios-arrow-back'
                            color={Colors.white}
                            size={Metrics.icons.medium}
                        />
                    </TouchableOpacity>

                    <Text style={Styles.h1}>Edit Rechord</Text>
                </View>
                
                <View style={styles.rechordTitleView}>
                    <TextInput 
                        style={styles.rechordTitle}
                        placeholder={this.props.item.title}
                        placeholderTextColor={Colors.white}
                        value={this.state.rechordTitle}
                        onChangeText={(rechordTitle) => this.setState({ rechordTitle })}
                    />
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
        backgroundColor: Colors.purple,
        marginTop: 50,
    },
    left: {
        position: 'absolute',
        top: -1 * Metrics.miniMargin,
        zIndex: 100,
    },
    rechordTitleView: {
        marginTop: Metrics.height * 0.04,
        marginLeft: Metrics.smallMargin,
    },
    rechordTitle: {
        color: Colors.white,
        fontSize: 20,
    },
})