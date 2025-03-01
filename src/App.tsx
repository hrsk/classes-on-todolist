import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'All' | 'Active' | 'Completed'

export const App = () => {

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: v1(), title: 'What to learn', filter: 'All'},
        {id: v1(), title: 'What to buy', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
        console.log('taskId:', taskId)
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
        console.log('button:', filter)
    }

    const addTask = (value: string) => {
        setTasks([...tasks, {id: v1(), title: value, isDone: false}])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone} : task))
        console.log('taskId:', taskId)
        console.log('checked:', isDone)
    }

    return (
        <div className="app">
            {
                todolists.map(todolist => {
                    return (
                        <TodolistItem todolist={todolist}
                                      key={todolist.id}
                                      tasks={tasks}
                                      changeFilter={changeFilter}
                                      removeTask={removeTask}
                                      addTask={addTask}
                                      changeTaskStatus={changeTaskStatus}/>
                    )
                })
            }
        </div>
    )
}
