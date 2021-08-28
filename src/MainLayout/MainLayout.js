import React, {useContext} from "react"
import {StyleSheet, View} from "react-native"

import {NavBar} from "../components/NavBar/NavBar"
import {MainScreen} from "../screens/MainScreen"
import {TodoScreen} from "../screens/TodoScreen"
import {ScreenContext} from "../context/screen/ScreenContext"


export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext)

    return (
        <View style={styles.container}>
            <NavBar title="Todo Application" />
            <View style={styles.addTodoContainer}>
                { todoId ? <TodoScreen /> : <MainScreen /> }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addTodoContainer: {
        flex: 1,
    },
})