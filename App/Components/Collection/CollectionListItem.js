// EXAMPLE:
// -------------------------------------------------

//     In styles:
//     coverWrapper: {
//         width: Metrics.widths.cover,  // however big you want the cover to be
//         height: Metrics.widths.cover,
//     }

//     <RechordListItem
//         coverContainerStyle={styles.coverWrapper}
//         info={item}
//         flip={this.flipCard}  // ignore if you don't want flip icon to show
//     />

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Metrics, Colors, Images } from '../../Themes';
import RecordCover from '../Record/RecordCover';

export default class RechordListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>

                {/* Record Cover */}
                
                <TouchableOpacity onPress={() => this.props.goToViewer(this.props.info)}>
                    <View style={this.props.coverContainerStyle}>
                        <RecordCover
                            info={this.props.info}
                            fontStyle={{ fontSize: 14 }}
                        />
                    </View>
                </TouchableOpacity>

                {/* Record Title and Heart Functionality */}

                <View style={styles.titleBar}>
                    <Text style={styles.title} numberOfLines={1}>{this.props.info.title}</Text>
                    <Image                                      // still need to implement functionality
                        source={Images.heartEmptySlate}
                        style={styles.heart} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Metrics.smallMargin
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Metrics.miniMargin,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.slateGrey,
        width: 130,
    },
    heart: {
        height: Metrics.icons.tiny,
        resizeMode: 'contain',
    }
})