import React, {useContext, useState} from "react"
import {Dimensions, ScrollView, StyleSheet, View} from "react-native"
import { AntDesign } from '@expo/vector-icons'

import {EditModal} from "../components/EditModal/EditModal"
import {AppText} from "../components/ui/AppText"
import {AppButton} from "../components/ui/AppButton"
import {THEME} from "../themes/theme"
import {ScreenContext} from "../context/screen/ScreenContext";
import {TodoContext} from "../context/todo/TodoContext";


export const TodoScreen = () => {
    const {todoId, changeScreen} = useContext(ScreenContext),
          {todos, removeTodo, updateTodo} = useContext(TodoContext)

    const todo = todos.find(item => item.id === todoId)

    const [modal, setModal] = useState(false)

    const saveHandler = async (title) => {
        await updateTodo(todo.id, title)
        setModal(false)
    }

    return (
        <ScrollView style={styles.todoScreenContainer}>
            <EditModal visible={modal}
                       value={todo.title}
                       onSave={saveHandler}
                       cancelModal={() => setModal(false)} />

            <View style={styles.todoTitleContainer}>
                <AppText style={styles.todoTitle}>{todo.title}</AppText>
            </View>

            <View style={styles.todoButtonsContainer}>
                <AppButton styleButton={{...styles.todoButton, backgroundColor: THEME.GREY_COLOR}}
                           styleText={styles.buttonText}
                           pressFunc={() => changeScreen(null)}>
                    <AntDesign name="back" size={24} color="#fff" />
                </AppButton>

                <AppButton styleButton={{...styles.todoButton, backgroundColor: THEME.BLUE_COLOR}}
                           styleText={styles.buttonText}
                           pressFunc={() => setModal(true)}>
                    <AntDesign name="edit" size={24} color="#fff" />
                </AppButton>

                <AppButton styleButton={{...styles.todoButton, backgroundColor: THEME.DANGER_COLOR}}
                           styleText={styles.buttonText}
                           pressFunc={async () => await removeTodo(todo.id)}>
                    <AntDesign name="delete" size={24} color="#fff" />
                </AppButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    todoScreenContainer: {},
    todoTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Dimensions.get('window').width / 20,
        marginVertical: Dimensions.get('window').height / 20
    },
    todoTitle: {
        fontSize: 22,
        textAlign: 'center',
    },
    todoButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    todoButton: {
        backgroundColor: THEME.BLUE_COLOR,
    },
    buttonText: {},
})
