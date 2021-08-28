import React, {useEffect, useState} from "react"
import {Dimensions, StyleSheet, TouchableNativeFeedback, View} from "react-native"

import {AppTextBold} from "./AppTextBold"
import {CONSTANTS} from "../../themes/constants";
import {THEME} from "../../themes/theme";


export const AppButton = ({children, styleButton, styleText, pressFunc}) => {
    return (
        <TouchableNativeFeedback activeOpacity={0.7} onPress={pressFunc}>
            <View style={{...styles.defaultButton, ...styleButton}}>
                <AppTextBold style={{...styles.defaultText, ...styleText}}>{children}</AppTextBold>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    defaultButton: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.BLUE_COLOR,
        paddingHorizontal: Dimensions.get('window').width / 9,
        paddingVertical: Dimensions.get('window').height / 35,
    },
    defaultText: {
        fontSize: 18,
        color: '#fff',
    },
})