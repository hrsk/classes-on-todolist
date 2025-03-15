import {FilterValues, Task, Todolist} from "./app/App.tsx";
import {Button} from "./common/components/button/Button.tsx";
import {EditableSpan} from "./common/components/editable-span/EditableSpan.tsx";
import {CreateItemForm} from "./common/components/create-item-form/CreateItemForm.tsx";

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

    let filteredTasks = tasks;

    if (filter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const tasksAfterMap = filteredTasks.map(task => {

        const changeTaskTitleHandler = (value: string) => {
            changeTaskTitle(todolistId, task.id, value)
        }

        return (
            <li style={{display: 'flex', alignItems: 'center'}} key={task.id}
                className={task.isDone ? 'isDone' : undefined}>
                <input type="checkbox" checked={task.isDone}
                       onChange={(e) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked)}/>
                <EditableSpan initialValue={task.title}
                              callback={changeTaskTitleHandler}
                              render={(text, onDoubleClick) => <span onDoubleClick={onDoubleClick}>{text}</span>}/>
                <Button onClick={() => removeTask(todolistId, task.id)}>x</Button>
            </li>
        )
    })

    const addTaskHandler = (value: string) => {
        addTask(todolistId, value)
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
                              callback={changeTodolistTitleHandler}/>
                <Button onClick={() => removeTodolist(todolistId)}>x</Button>
            </div>
            <CreateItemForm onCreateItem={addTaskHandler}/>
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
