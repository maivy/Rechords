import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Metrics, Colors, Images } from '../Themes';

export default class SortOption extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.sortIcon}
                    source={this.props.icon} />

                <Text
                    style={[
                        styles.sortName,
                        { color: this.props.color } ]}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sortName: {
        fontWeight: 'bold',
        fontSize: 11,
    }
})