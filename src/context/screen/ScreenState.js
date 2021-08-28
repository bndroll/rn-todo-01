import React, {useReducer} from "react"
import {ScreenContext} from "./ScreenContext"
import {CHANGE_SCREEN, screenReducer} from "./ScreenReducer"


export const ScreenState = ({children}) => {
    const [state, dispatch] = useReducer(screenReducer, null)

    const changeScreen = (id) => dispatch({type: CHANGE_SCREEN, payload: id})

    return (
        <ScreenContext.Provider value={{
            todoId: state,
            changeScreen
        }}>
            {children}
        </ScreenContext.Provider>
    )
}