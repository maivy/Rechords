import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Metrics } from '../Themes';

export default class SubmitButton extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.createButton}
                    activeOpacity = { .5 }
                    onPress={() => this.props.function()}>

                    <Text style={styles.createButtonText}>{this.props.text}</Text>
                </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    createButton: {
        width: Metrics.width * 0.5,
        height: 50,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#68BEE2',
        borderRadius:100,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 5,
        shadowOpacity: 0.5,
        elevation: 5,
    },
    createButtonText: {
        fontSize: 16,
        color: 'white',
        textAlign:'center',
    },
})