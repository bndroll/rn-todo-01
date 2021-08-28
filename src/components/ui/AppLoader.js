import React from "react"
import {View, ActivityIndicator, StyleSheet, Dimensions} from "react-native"
import {THEME} from "../../themes/theme";


export const AppLoader = () => {
    return (
        <View style={styles.loadWrap}>
            <ActivityIndicator color={THEME.BLUE_COLOR} />
        </View>
    )
}

const styles = StyleSheet.create({
    loadWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})