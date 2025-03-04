import {Todolist} from "../App.tsx";
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
        default:
            return state
    }
}

//actions

export const RemoveTodolist = (payload: { todolistId: string }) => {
    return {
        type: 'remove_todolist',
        payload
    } as const
}

export const createTodolist = (payload: { title: string }) => {
    return {
        type: 'create_todolist',
        payload: {
            todolistId: v1(),
            title: payload.title
        }
    } as const
}

//action types

type RemoveTodolist = ReturnType<typeof RemoveTodolist>
type CreateTodolist = ReturnType<typeof createTodolist>

type ActionsType = RemoveTodolist | CreateTodolist