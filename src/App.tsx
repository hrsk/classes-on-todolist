import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'All' | 'Active' | 'Completed'

export const App = () => {

    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValues>('All')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
        console.log(filter)
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
            <TodolistItem title={'What to learn'} tasks={tasks} filter={filter} changeFilter={changeFilter}
                          removeTask={removeTask} addTask={addTask} changeTaskStatus={changeTaskStatus}/>
        </div>
    )
}
