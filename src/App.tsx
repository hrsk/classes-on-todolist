import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useReducer} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Tasks = Record<string, Task[]>

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'All' | 'Active' | 'Completed'

export const App = () => {

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(deleteTaskAC({todolistId, taskId}))
        console.log('taskId:', taskId)
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC({todolistId, filter}))
        console.log('button:', filter)
    }

    const addTask = (todolistId: string, value: string) => {
        dispatchToTasks(createTaskAC({todolistId, title: value}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC({todolistId, taskId, isDone}))
        console.log('taskId:', taskId)
        console.log('checked:', isDone)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC({todolistId})
        dispatchToTodolists(action)
        dispatchToTasks(action)
        console.log('todolists:', todolists)
        console.log('tasks:', tasks)
    }

    const changeTodolistTitle = (todolistId: string, value: string) => {
        dispatchToTodolists(changeTodolistTitleAC({todolistId, title: value}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, value: string) => {
        dispatchToTasks(changeTaskTitleAC({todolistId, taskId, title: value}))
    }

    const createTodolist = (value: string) => {
        const action = createTodolistAC({title: value})
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    return (
        <div className="app">
            <CreateItemForm onCreateItem={createTodolist}/>
            {
                todolists.map(todolist => {
                    return (
                        <TodolistItem todolist={todolist}
                                      key={todolist.id}
                                      tasks={tasks[todolist.id]}
                                      changeFilter={changeFilter}
                                      removeTask={removeTask}
                                      addTask={addTask}
                                      changeTaskStatus={changeTaskStatus}
                                      removeTodolist={removeTodolist}
                                      changeTodolistTitle={changeTodolistTitle}
                                      changeTaskTitle={changeTaskTitle}/>
                    )
                })
            }
        </div>
    )
}
