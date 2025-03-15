import {FilterValues, Task, Todolist} from "./app/App.tsx";
import {EditableSpan} from "./common/components/editable-span/EditableSpan.tsx";
import {CreateItemForm} from "./common/components/create-item-form/CreateItemForm.tsx";
import {DeleteButton} from "./common/components/button/DeleteButton.tsx";
import {MaterialButton} from "./common/components/button/MaterialButton.ts";
import {Checkbox, List, ListItem} from "@mui/material";
import {ChangeEvent} from "react";
import Box from "@mui/material/Box";
import {containerSx, getListItemSx} from "./features/todolists/TodolistItem.styles.ts";

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

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolistId, task.id, e.currentTarget.checked)
        }

        return (
            <ListItem sx={getListItemSx(task.isDone)} key={task.id}>
                {/*className={task.isDone ? 'isDone' : undefined}>*/}
                <Box sx={containerSx}>
                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                    {/*<input type="checkbox" checked={task.isDone}*/}
                    {/*       onChange={(e) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked)}/>*/}
                    <EditableSpan initialValue={task.title}
                                  callback={changeTaskTitleHandler}
                                  render={(text, onDoubleClick) => <span onDoubleClick={onDoubleClick}>{text}</span>}/>
                </Box>
                <DeleteButton callback={() => removeTask(todolistId, task.id)}/>
                {/*<Button onClick={() => removeTask(todolistId, task.id)}>x</Button>*/}
            </ListItem>
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
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <EditableSpan initialValue={title}
                              render={(text, onDoubleClick) => <h3 onDoubleClick={onDoubleClick}>{text}</h3>}
                              callback={changeTodolistTitleHandler}/>
                <DeleteButton callback={() => removeTodolist(todolistId)}/>
                {/*<Button onClick={() => removeTodolist(todolistId)}>x</Button>*/}
            </Box>
            <CreateItemForm onCreateItem={addTaskHandler}/>
            <List style={{listStyle: 'none', padding: 0}}>
                {
                    !tasks.length
                        ? <span style={{color: 'crimson'}}>List is empty</span>
                        : tasksAfterMap
                }
            </List>
            <Box sx={containerSx}>
                <MaterialButton variant={filter === 'All' ? 'contained' : 'outlined'}
                                color={'primary'}
                                onClick={() => changeFilterHandler('All')}>
                    All
                </MaterialButton>
                <MaterialButton variant={filter === 'Active' ? 'contained' : 'outlined'}
                                color={'secondary'}
                                onClick={() => changeFilterHandler('Active')}>
                    Active
                </MaterialButton>
                <MaterialButton variant={filter === 'Completed' ? 'contained' : 'outlined'}
                                color={'success'}
                                onClick={() => changeFilterHandler('Completed')}>
                    Completed
                </MaterialButton>
            </Box>
            {/*<div>*/}
            {/*    <Button className={filter === 'All' ? 'isActive' : undefined}*/}
            {/*            onClick={() => changeFilterHandler('All')}>All</Button>*/}
            {/*    <Button className={filter === 'Active' ? 'isActive' : undefined}*/}
            {/*            onClick={() => changeFilterHandler('Active')}>Active</Button>*/}
            {/*    <Button className={filter === 'Completed' ? 'isActive' : undefined}*/}
            {/*            onClick={() => changeFilterHandler('Completed')}>Completed</Button>*/}
            {/*</div>*/}
        </div>
    )
}
