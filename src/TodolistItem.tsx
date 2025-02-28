import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {useRef} from "react";

type Props = {
    title: string
    tasks: Task[]
    filter: FilterValues
    changeFilter: (filter: FilterValues) => void
    removeTask: (taskId: string) => void
    addTask: (value: string) => void
}

export const TodolistItem = ({title, tasks, removeTask, filter, changeFilter, addTask}: Props) => {

    let filteredTasks = tasks;

    if (filter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const tasksAfterMap = filteredTasks.map(task => {

        const removeTaskHandler = (taskId: string) => {
            removeTask(taskId)
        }

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                <Button onClick={() => removeTaskHandler(task.id)}>x</Button>
            </li>
        )
    })

    const inputRef = useRef<HTMLInputElement>(null)

    const addTaskHandler = () => {
        if (inputRef.current) {
            addTask(inputRef.current.value)
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={inputRef}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul style={{listStyle: 'none', padding: 0}}>
                {
                    !tasks.length
                        ? <span style={{color: 'crimson'}}>List is empty</span>
                        : tasksAfterMap
                }
            </ul>
            <div>
                <Button onClick={() => changeFilter('All')}>All</Button>
                <Button onClick={() => changeFilter('Active')}>Active</Button>
                <Button onClick={() => changeFilter('Completed')}>Completed</Button>
            </div>
        </div>
    )
}
