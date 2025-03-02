import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";
import {EditableSpan} from "./EditableSpan.tsx";

type Props = {
    todolist: Todolist
    tasks: Task[]
    changeFilter: (todolistId: string, filter: FilterValues) => void
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, value: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
}

export const TodolistItem = ({
                                 todolist: {id: todolistId, title, filter},
                                 tasks,
                                 removeTask,
                                 changeFilter,
                                 addTask,
                                 changeTaskStatus,
                                 removeTodolist,
                                 changeTodolistTitle,
                                 changeTaskTitle,
                             }: Props) => {

    const [value, setValue] = useState<string | undefined>('')
    const [error, setError] = useState<string | null>(null)

    let filteredTasks = tasks;

    if (filter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const tasksAfterMap = filteredTasks.map(task => {

        return (
            <li style={{display: 'flex', alignItems: 'center'}} key={task.id} className={task.isDone ? 'isDone' : undefined}>
                <input type="checkbox" checked={task.isDone}
                       onChange={(e) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked)}/>
                <EditableSpan initialValue={task.title}
                              callback={(value) => changeTaskTitle(todolistId, task.id, value)}
                              render={(text, onDoubleClick) => <span onDoubleClick={onDoubleClick}>{text}</span>}/>
                <Button onClick={() => removeTask(todolistId, task.id)}>x</Button>
            </li>
        )
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        if (error !== null) {
            setError(null)
        }
    }

    const addTaskHandler = () => {
        if (value) {
            const trimmedValue = value.trim()
            if (trimmedValue !== '') {
                addTask(todolistId, trimmedValue)
            } else {
                setError('Title is required!')
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

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(todolistId, filter)
    }

    const changeTodolistTitleHandler = (value: string) => {
        changeTodolistTitle(todolistId, value)
    }

    return (
        <div>
            <div className={'container'}>
                <EditableSpan initialValue={title}
                              render={(text, onDoubleClick) => <h3 onDoubleClick={onDoubleClick}>{text}</h3>}
                              callback={(value) => changeTodolistTitleHandler(value)}/>
                <Button onClick={() => removeTodolist(todolistId)}>x</Button>
            </div>
            <div>
                <input className={error ? 'isError' : undefined} value={value} onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <span className={'errorMessage'} style={{display: 'block'}}>{error}</span>}
            </div>
            <ul style={{listStyle: 'none', padding: 0}}>
                {
                    !tasks.length
                        ? <span style={{color: 'crimson'}}>List is empty</span>
                        : tasksAfterMap
                }
            </ul>
            <div>
                <Button className={filter === 'All' ? 'isActive' : undefined}
                        onClick={() => changeFilterHandler('All')}>All</Button>
                <Button className={filter === 'Active' ? 'isActive' : undefined}
                        onClick={() => changeFilterHandler('Active')}>Active</Button>
                <Button className={filter === 'Completed' ? 'isActive' : undefined}
                        onClick={() => changeFilterHandler('Completed')}>Completed</Button>
            </div>
        </div>
    )
}
