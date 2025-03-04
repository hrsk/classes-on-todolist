import {Todolist} from "../App.tsx";

const InitialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = InitialState, action: ActionsType): Todolist[] => {
    switch (action.type) {
        case 'remove_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.todolistId)
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

//action types

type RemoveTodolist = ReturnType<typeof RemoveTodolist>

type ActionsType = RemoveTodolist