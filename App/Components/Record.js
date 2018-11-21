import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

import { Metrics, Colors, Images } from '../Themes';

const center = Metrics.record.outer / 2;
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
                <ImageBackground
                    style={[styles.outer, this.state.outerStyle]}
                    source={Images.recordEdge}>
                    <View style={[styles.inner, this.state.innerStyle]}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>Happier</Text>
                        </View>

                        <View style={styles.dot}></View>

                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>Marshmello, Bastille</Text>
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
        color: Colors.white
    }
});