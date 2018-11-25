// EXAMPLE:
// -------------------------------------------------
//
//     In styles:
//     coverWrapper: {
//         width: Metrics.widths.cover, // however big you want the cover to be
//         height: Metrics.widths.cover,
//     }
//
//     <RechordListItem
//         coverContainerStyle={styles.coverWrapper}
//         image={Images.cover6}
//         location='Lynn Canyon'
//         date='08 31 18'
//         owner='Tiffany Manuel'
//         title='Inflatables'
//     />

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Metrics, Colors, Styles, Images } from '../Themes';
import RecordCover from './RecordCover';

export default class RechordListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>

                {/* Record Cover */}

                <View style={this.props.coverContainerStyle}>
                    <RecordCover
                        image={this.props.image}
                        location={this.props.location}
                        date={this.props.date}
                        owner={this.props.owner}
                        fontStyle={{ fontSize: 11 }}
                    />
                </View>

                {/* Record Title and Heart Functionality */}

                <View style={styles.titleBar}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Image
                        source={Images.heartEmptySlate}
                        style={styles.heart} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Metrics.tinyMargin
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Metrics.miniMargin,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.slateGrey,
    },
    heart: {
        height: Metrics.icons.tiny,
        resizeMode: 'contain',
    }
})