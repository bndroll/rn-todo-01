import React from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native"
import {THEME} from "../../themes/theme"
import {AppText} from "../ui/AppText"


export const Todo = ({todo, removeTodo, openTodo}) => {
    return (
        <TouchableOpacity activeOpacity={0.5}
                          onLongPress={() => removeTodo(todo.id)}
                          onPress={() => openTodo(todo.id)} >

            <View style={styles.todoCard}>
                <AppText style={styles.todoCardText}>{todo.title}</AppText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: THEME.LIGHT_GREY_COLOR,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: THEME.TODO_CARD_COLOR
    },
    todoCardText: {
        fontSize: 18,
        width: '85%',
    }
})