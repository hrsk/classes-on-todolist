import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValues = 'All' | 'Active' | 'Completed'

export const App = () => {

    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValues>('All')

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
        console.log(filter)
    }

    return (
        <div className="app">
            <TodolistItem title={'What to learn'} tasks={tasks} filter={filter} changeFilter={changeFilter}
                          removeTask={removeTask}/>
        </div>
    )
}
