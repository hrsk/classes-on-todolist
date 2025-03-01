import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

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

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<Tasks>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ],
        [todolistId2]: []
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((task: Task) => task.id !== taskId)})
        console.log('taskId:', taskId)
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
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
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({
            ...tasks
        })
        console.log('todolists:', todolists)
        console.log('tasks:', tasks)
    }

    return (
        <div className="app">
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
                                      removeTodolist={removeTodolist}/>
                    )
                })
            }
        </div>
    )
}
