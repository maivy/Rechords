// EXAMPLE:
// --------------------------------------------------
//     <RecordBackCover
//         description={this.props.info.description}
//         flip={this.flipCard}
//     />

import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';


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
                                <AntDesign
                                    name='sync'
                                    color={Colors.white}
                                    size={25}
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
})