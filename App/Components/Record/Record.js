// EXAMPLE:
// -------------------------------------
// Add small tag for a smaller record size.
//     <Record
//         small
//         title='Happier'
//         artist='Marshmello, Bastille'
//     />

import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

import { Metrics, Colors, Images } from '../../Themes';

export default class Record extends React.Component {
    state = {
        outerStyle: styles.outerLarge,
        innerStyle: styles.innerLarge
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.small) {
            this.setState({ outerStyle: styles.outerSmall });
            this.setState({ innerStyle: styles.innerSmall });
        }
    }

    render() {
        return (
            <View style={this.props.containerStyle}>

                {/* Outer Edge of Record */}

                <ImageBackground
                    style={[styles.outer, this.state.outerStyle]}
                    source={Images.recordEdge}>

                    {/* Inner Middle of Record */}

                    <View style={[styles.inner, this.state.innerStyle]}>

                        <View style={styles.textWrapper}>
                            <Text style={[styles.text, { fontSize: 20 }]}>{this.props.title}</Text>
                        </View>

                        <View style={styles.dot}></View>

                        <View style={styles.textWrapper}>
                            <Text style={[styles.text, { fontSize: 17 }]}>{this.props.artist}</Text>
                        </View>

                    </View> 

                </ImageBackground>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerLarge: {
        width: Metrics.record.outerLarge,
        height: Metrics.record.outerLarge,
        borderRadius: Metrics.record.outerLarge / 2,
    },
    innerLarge: {
        width: Metrics.record.innerLarge,
        height: Metrics.record.innerLarge,
        borderRadius: Metrics.record.innerLarge / 2
    },
    outerSmall: {
        width: Metrics.record.outerSmall,
        height: Metrics.record.outerSmall,
        borderRadius: Metrics.record.outerSmall / 2
    },
    innerSmall: {
        width: Metrics.record.innerSmall,
        height: Metrics.record.innerSmall,
        borderRadius: Metrics.record.innerSmall / 2

    },
    outer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.purple,
        padding: Metrics.smallMargin
    },
    dot: {
        width: Metrics.record.dot,
        height: Metrics.record.dot,
        backgroundColor: Colors.white,
        borderRadius: Metrics.record.dot / 2
    },
    textWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'digital-7'
    }
});