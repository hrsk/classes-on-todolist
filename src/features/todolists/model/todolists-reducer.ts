import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'All' | 'Active' | 'Completed'

export const removeTodolistAC = createAction<{ todolistId: string }>('todolists/remove_todolist')

export const createTodolistAC = createAction('todolists/create_todolist', (title: string) => {
    return {
        payload: {title, todolistId: nanoid()}
    }
})

export const changeTodolistTitleAC = createAction<{
    todolistId: string,
    title: string
}>('todolists/change_todolist_title')

export const changeTodolistFilterAC = createAction<{
    todolistId: string,
    filter: FilterValues
}>('todolists/change_todolist_filter')


const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, builder => {
    builder.addCase(removeTodolistAC, (state, action) => {
        const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
        if (index !== -1) {
            state.splice(index, 1)
        }
    })
        .addCase(createTodolistAC, (state, action) => {
            state.push({id: action.payload.todolistId, title: action.payload.title, filter: 'All'})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId)
            if (todolist) {
                todolist.title = action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        })
})
