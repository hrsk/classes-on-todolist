import {Tasks} from "../app/App.tsx";
import {CreateTodolist, RemoveTodolist} from "./todolists-reducer.ts";
import {v1} from "uuid";

const initialState: Tasks = {}

export const tasksReducer = (state: Tasks = initialState, action: Actions): Tasks => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'remove_todolist': {
            delete state[action.payload.todolistId]
            return {...state}
        }
        case 'delete_task': {
            const {todolistId, taskId} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].filter(task => task.id !== taskId)
            }
        }
        case 'create_task': {
            const {todolistId, title} = action.payload
            return {
                ...state, [todolistId]: [...state[todolistId], {id: v1(), title, isDone: false}]
            }
        }
        case 'change_task_status': {
            const {todolistId, taskId, isDone} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
            }
        }
        case 'change_task_title': {
            const {todolistId, taskId, title} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, title} : task)
            }
        }
        default:
            return state
    }
}

//action creators

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return {
        type: 'delete_task',
        payload,
    } as const
}

export const createTaskAC = (payload: { todolistId: string, title: string }) => {
    return {
        type: 'create_task',
        payload,
    } as const
}

export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
    return {
        type: 'change_task_status',
        payload,
    } as const
}

export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
    return {
        type: 'change_task_title',
        payload,
    } as const
}

//types

type DeleteTask = ReturnType<typeof deleteTaskAC>
type CreateTask = ReturnType<typeof createTaskAC>
type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>

type Actions = CreateTodolist | RemoveTodolist | DeleteTask | CreateTask | ChangeTaskStatus | ChangeTaskTitle
