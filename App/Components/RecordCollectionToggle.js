import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { ButtonGroup } from 'react-native-elements';
import { Metrics, Colors, Styles } from '../Themes';


export default class RecordCollectionToggle extends React.Component {
    state = {
        index: 0
    }

    updateIndex = (index) => {
        this.setState({index: index});
    }

    render() {
        return (
            <View>
                <ButtonGroup
                    selectedButtonStyle={styles.selectedButton}
                    selectedTextStyle={styles.selectedText}
                    textStyle={styles.text}
                    innerBorderStyle={styles.innerBorder}
                    onPress={this.updateIndex}
                    selectedIndex={this.state.index}
                    buttons={['Personal', 'Friends']}
                    containerStyle={styles.toggle}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toggle: {
        width: Metrics.widths.wide,
        height: 30,
        borderColor: Colors.purple,
        backgroundColor: Colors.white
    },
    selectedButton: {
        backgroundColor: Colors.purple,
    },
    selectedText: {
        color: Colors.white,
    },
    text: {
        fontWeight: 'bold',
        color: Colors.purple
    },
    innerBorder: {
        width: 0,
        color: Colors.purple
    }
})