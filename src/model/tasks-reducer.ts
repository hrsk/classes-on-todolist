import {Tasks} from "../app/App.tsx";
import {createTodolistAC, removeTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Tasks = {}

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/delete_task')

export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/create_task')

export const changeTaskStatusAC = createAction<{
    todolistId: string,
    taskId: string,
    isDone: boolean
}>('tasks/change_task_status')

export const changeTaskTitleAC = createAction<{
    todolistId: string,
    taskId: string,
    title: string
}>('tasks/change_task_title')


export const tasksReducer = createReducer(initialState, builder => {
    builder.addCase(createTodolistAC, (state, action) => {
        state[action.payload.todolistId] = []
    })
        .addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        .addCase(deleteTaskAC, (state, action) => {

            const {todolistId, taskId} = action.payload

            const index = state[todolistId].findIndex(task => task.id === taskId)
            if (index !== -1) {
                state[todolistId].splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].unshift({id: nanoid(), title: action.payload.title, isDone: false})
        })
        .addCase(changeTaskTitleAC, (state, action) => {

            const {todolistId, taskId, title} = action.payload

            const task = state[todolistId].find(task => task.id === taskId)
            if (task) {
                task.title = title
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {

            const {todolistId, taskId, isDone} = action.payload

            const task = state[todolistId].find(task => task.id === taskId)
            if (task) {
                task.isDone = isDone
            }
        })
})
