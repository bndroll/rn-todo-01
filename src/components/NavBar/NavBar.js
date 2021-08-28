import React from 'react'
import {Dimensions, StyleSheet, View} from "react-native"
import {THEME} from "../../themes/theme"
import {AppText} from "../ui/AppText"
import { Entypo } from '@expo/vector-icons'


export const NavBar = ({title}) => {
    return (
        <View style={styles.navbarContainer}>
            <View style={styles.navbar}>
                <Entypo name="list" size={24} color="#fff" />
                <AppText style={styles.text}>{title}</AppText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarContainer: {
        justifyContent: 'flex-end'
    },
    navbar: {
        flexDirection: 'row',
        height: Dimensions.get('window').height / 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: THEME.BLUE_COLOR,
        paddingBottom: 10,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'roboto-regular'
    }
})