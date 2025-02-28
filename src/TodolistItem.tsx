import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";

type Props = {
    title: string
    tasks: Task[]
    filter: FilterValues
    changeFilter: (filter: FilterValues) => void
    removeTask: (taskId: string) => void
    addTask: (value: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({title, tasks, removeTask, filter, changeFilter, addTask, changeTaskStatus}: Props) => {

    const [value, setValue] = useState<string | undefined>('')

    let filteredTasks = tasks;

    if (filter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const tasksAfterMap = filteredTasks.map(task => {

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}
                       onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}/>
                <span>{task.title}</span>
                <Button onClick={() => removeTask(task.id)}>x</Button>
            </li>
        )
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (value) {
            const trimmedValue = value.trim()
            if (trimmedValue !== '') {
                addTask(trimmedValue)
            }
        }
        setValue('')
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        const key = e.key
        if (key === 'Enter' && e.metaKey) {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={value} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
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
