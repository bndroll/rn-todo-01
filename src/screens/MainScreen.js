import React, {useCallback, useContext, useEffect, useState} from "react"
import {Dimensions, FlatList, Image, StyleSheet, View} from "react-native"

import {AddTodoBlock} from "../components/AddTodo/AddTodoBlock"
import {Todo} from "../components/Todo/Todo"
import {CONSTANTS} from '../themes/constants'
import {TodoContext} from "../context/todo/TodoContext"
import {ScreenContext} from "../context/screen/ScreenContext"
import {AppLoader} from "../components/ui/AppLoader"
import {AppTextBold} from "../components/ui/AppTextBold"
import {THEME} from "../themes/theme"
import {AppButton} from "../components/ui/AppButton"


export const MainScreen = () => {
    const {todos, addTodo, removeTodo, fetchTodos, loading, error} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext)

    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get('window').width - 2 * CONSTANTS.TODOS_WRAP_PADDING_H
    )

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])
    useEffect(() => {
        loadTodos()
    }, [])

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - 2 * CONSTANTS.TODOS_WRAP_PADDING_H
            setDeviceWidth(width)
        }

        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })

    if (loading) {
        return <AppLoader />
    }

    if (error) {
        return (
            <View style={styles.center}>
                <AppTextBold style={styles.error}>{error}</AppTextBold>
                <AppButton pressFunc={loadTodos}>Повторить</AppButton>
            </View>
        )
    }

    let content = (
        <View style={{width: deviceWidth}}>
            <FlatList data={todos}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => (<Todo openTodo={changeScreen} removeTodo={removeTodo} todo={item}/>)}
            />
        </View>
    )

    if (todos.length === 0) {
        content = (
            <View style={styles.imgWrap}>
                <Image style={styles.img}
                       source={require('../../assets/no-items.png')} />
            </View>
        )
    }

    return (
        <View>
            <AddTodoBlock addTodo={addTodo}/>

            <View style={styles.todosContainer}>
                {content}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: THEME.DANGER_COLOR,
        fontSize: 20,
        marginBottom: 10,
    },
    todosContainer: {
        paddingHorizontal: CONSTANTS.TODOS_WRAP_PADDING_H,
    },
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: Dimensions.get('window').height / 3.5,
        marginTop: Dimensions.get('window').height / 6,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
})