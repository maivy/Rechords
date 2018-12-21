// EXAMPLE:
// --------------------------------------------------
//     <RecordBackCover
//         description={this.props.info.description}
//         flip={this.flipCard}
//     />

import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


import { Metrics, Colors, Images, Styles } from '../../Themes';

export default class RecordBackCover extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container]}>

                <ScrollView style={styles.scrollView}>
                    <Text style={styles.description}>{this.props.description}</Text>
                </ScrollView>

                <View style={styles.bottom}>

                    {
                        this.props.flip ? (
                            <TouchableOpacity onPress={() => this.props.flip()}>
                                <MaterialIcons
                                    name='sync'
                                    color={Colors.white}
                                    size={Metrics.icons.medium}
                                />
                            </TouchableOpacity>
                        ) : null
                    }

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: Metrics.smallMargin,
        backgroundColor: Colors.darkGrey,
        borderRadius: Metrics.borderRadius.recordCover,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        shadowOpacity: 0.5,
        elevation: 5,
        overflow: 'scroll',
    },
    scrollView: {
        flex: 1,
    },
    description: {
        fontSize: 18,
        color: Colors.white,
        fontFamily: 'avenir'
    },
    bottom: {
        // left: -7,
        width: Metrics.icons.medium + 10,
        height: Metrics.icons.medium + 10,
        padding: 5,
        backgroundColor: Colors.blue,
        borderRadius: (Metrics.icons.medium + 10) / 2
    },
    flip: {
        // position: 'absolute',
        // bottom: Metrics.smallMargin,
        // left: Metrics.smallMargin,
        // padding: 5,
        // backgroundColor: Colors.blue,
        // borderRadius: (Metrics.icons.medium + 10) / 2
    },
})