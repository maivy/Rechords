// EXAMPLE: 
// --------------------------------------------
//     <SortOption
//         icon={Images.recordIconSlate}
//         text='Title'
//         color={Colors.slateGrey}   // color of text, not icon
//     />

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { Colors } from '../Themes';
import { SORT_ENUM } from '../Data';

const SELECTED_COLOR = Colors.blue;
const UNSELECTED_COLOR = Colors.slateGrey;
export default class SortOption extends React.Component {

    constructor(props) {
        super(props);
    }

    selectedColor() {
        const { sortOption, index } = this.props;
        // console.log("Sort Option: " + sortOption + '  Index: ' + index);
        isNewestSort = sortOption === SORT_ENUM.NEWEST && index <= 1;
        isSelected = sortOption === index;
        return isSelected || isNewestSort ? SELECTED_COLOR : UNSELECTED_COLOR;
    }

    updateSortIndex = () => {
        const { sortOption, selectedIndex } = this.props;
        var i = sortOption;
        if (sortOption === SORT_ENUM.NEWEST) i = selectedIndex;
        this.props.updateIndex(i);
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.updateSortIndex}    
            >
                <Image
                    style={styles.sortIcon}
                    source={this.props.icon} />

                <Text
                    style={[
                        styles.sortName,
                        { color: this.selectedColor() }
                    ]}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
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