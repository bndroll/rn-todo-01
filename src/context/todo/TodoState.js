import React, {useContext, useReducer} from "react"
import {TodoContext} from "./TodoContext"
import {
    ADD_TODO,
    CLEAR_ERROR,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    todoReducer,
    UPDATE_TODO
} from "./TodoReducer"
import {ScreenContext} from "../screen/ScreenContext"
import {Alert} from "react-native"
import {Http} from "../../http"


export const TodoState = ({children}) => {
    const {changeScreen} = useContext(ScreenContext)

    const initialState = {
        todos: [],
        loading: false,
        error: null
    }

    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async (title) => {
        const data = await Http.post(
            'https://rn-todo-01-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
            { title }
        )

        dispatch({type: ADD_TODO, title, id: data.name})
    }
    const removeTodo = (id) => {
        const todo = state.todos.find(item => item.id === id)
        Alert.alert(
            "Удаление элемента",
            `Вы уверены что хотите удалить "${todo.title}"?`,
            [
                {
                    text: 'Отмена',
                    style: 'negative'
                },
                {
                    text: 'Удалить',
                    onPress: async () => {
                        changeScreen(null)

                        await Http.delete(
                            `https://rn-todo-01-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`
                        )

                        dispatch({type: REMOVE_TODO, id})
                    },
                    style: 'positive'
                },
            ],
            {cancelable: false},
        )
    }
    const updateTodo = async (id, title) => {
        clearError()

        try {
            await Http.patch(
                `https://rn-todo-01-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
                {title}
            )

            dispatch({type: UPDATE_TODO, id, title})
        } catch (err) {
            showError('Что-то пошло не так...')
        }
    }

    const fetchTodos = async () => {
        showLoader()
        clearError()

        try {
            let data = await Http.get(
                'https://rn-todo-01-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
            ) || {}

            const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))

            dispatch({ type: FETCH_TODOS, todos })
        } catch (err) {
            showError('Что-то пошло не так...' + err)
        } finally {
            hideLoader()
        }
    }

    const showLoader = () => dispatch({type: SHOW_LOADER})
    const hideLoader = () => dispatch({type: HIDE_LOADER})

    const showError = (error) => dispatch({type: SHOW_ERROR, error})
    const clearError = () => dispatch({type: CLEAR_ERROR})

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            loading: state.loading,
            error: state.error,
            addTodo,
            removeTodo,
            updateTodo,
            fetchTodos
        }}>
            {children}
        </TodoContext.Provider>
    )
}