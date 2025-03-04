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

//action types

export type RemoveTodolist = {
    type: 'remove_todolist'
    payload: { todolistId: string }
}

type ActionsType = RemoveTodolist