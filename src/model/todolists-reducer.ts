import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

const InitialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = InitialState, action: ActionsType): Todolist[] => {
    switch (action.type) {
        case 'remove_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.todolistId)
        }
        case 'create_todolist': {
            const {todolistId, title} = action.payload
            return [...state, {id: todolistId, title: title, filter: 'All'}]
        }
        case 'change_todolist_title': {
            const {todolistId, title} = action.payload
            return state.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist)
        }
        case 'change_todolist_filter': {
            const {todolistId, filter} = action.payload
            return state.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist)
        }
        default:
            return state
    }
}

//actions

export const removeTodolistAC = (payload: { todolistId: string }) => {
    return {
        type: 'remove_todolist',
        payload
    } as const
}

export const createTodolistAC = (payload: { title: string }) => {
    return {
        type: 'create_todolist',
        payload: {
            todolistId: v1(),
            title: payload.title
        }
    } as const
}

export const changeTodolistTitleAC = (payload: { todolistId: string, title: string }) => {
    return {
        type: 'change_todolist_title',
        payload
    } as const
}

export const changeTodolistFilterAC = (payload: { todolistId: string, filter: FilterValues }) => {
    return {
        type: 'change_todolist_filter',
        payload
    } as const
}

//action types

type RemoveTodolist = ReturnType<typeof removeTodolistAC>
type CreateTodolist = ReturnType<typeof createTodolistAC>
type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = RemoveTodolist | CreateTodolist | ChangeTodolistTitle | ChangeTodolistFilter