export const ADD_TODO = 'ADD_TODO',
             UPDATE_TODO = 'UPDATE_TODO',
             REMOVE_TODO = 'REMOVE_TODO',
             FETCH_TODOS = 'FETCH_TODOS',
             SHOW_LOADER = 'SHOW_LOADER',
             HIDE_LOADER = 'HIDE_LOADER',
             SHOW_ERROR = 'SHOW_ERROR',
             CLEAR_ERROR = 'CLEAR_ERROR'

const handlers = {
    [ADD_TODO]: (state, {title, id}) => ({
        ...state,
        todos: [...state.todos, {id, title}]
    }),
    [REMOVE_TODO]: (state, {id}) => ({
        ...state,
        todos: state.todos.filter(item => item.id !== id)
    }),
    [UPDATE_TODO]: (state, {title, id}) => ({
        ...state,
        todos: state.todos.map(item => {
            if (item.id === id) {
                item.title = title
            }

            return item
        })
    }),
    [FETCH_TODOS]: (state, {todos}) => ({...state, todos}),
    [SHOW_LOADER]: (state) => ({...state, loading: true}),
    [HIDE_LOADER]: (state) => ({...state, loading: false}),
    [SHOW_ERROR]: (state, {error}) => ({...state, error}),
    [CLEAR_ERROR]: (state) => ({...state, error: null}),
    DEFAULT: (state) => state
}

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT

    return handler(state, action)
}