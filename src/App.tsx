import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

type Tasks = Record<string, Task[]>

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'All' | 'Active' | 'Completed'

export const App = () => {

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    const [tasks, setTasks] = useState<Tasks>({})

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((task: Task) => task.id !== taskId)})
        console.log('taskId:', taskId)
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC({todolistId, filter}))
        console.log('button:', filter)
    }

    const addTask = (todolistId: string, value: string) => {
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId], {id: v1(), title: value, isDone: false}]
        })
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
        })
        console.log('taskId:', taskId)
        console.log('checked:', isDone)
    }

    const removeTodolist = (todolistId: string) => {
        dispatchToTodolists(removeTodolistAC({todolistId}))
        delete tasks[todolistId]
        setTasks({
            ...tasks
        })
        console.log('todolists:', todolists)
        console.log('tasks:', tasks)
    }

    const changeTodolistTitle = (todolistId: string, value: string) => {
        dispatchToTodolists(changeTodolistTitleAC({todolistId, title: value}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, value: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: value} : task)
        })
    }

    const createTodolist = (value: string) => {
        const action = createTodolistAC({title: value})
        dispatchToTodolists(action)
        const todolistId = action.payload.todolistId
        setTasks({...tasks, [todolistId]: []})
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
