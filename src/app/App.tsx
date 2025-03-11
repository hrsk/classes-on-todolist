import './App.css'
import {TodolistItem} from "../TodolistItem.tsx";
import {CreateItemForm} from "../CreateItemForm.tsx";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    removeTodolistAC
} from "../model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "../model/tasks-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store.ts";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Tasks = Record<string, Task[]>

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'All' | 'Active' | 'Completed'

export const App = () => {

    const todolists = useSelector<RootState, Todolist[]>(state => state.todolists)
    const tasks = useSelector<RootState, Tasks>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
        console.log('taskId:', taskId)
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({todolistId, filter}))
        console.log('button:', filter)
    }

    const addTask = (todolistId: string, value: string) => {
        dispatch(createTaskAC({todolistId, title: value}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
        console.log('taskId:', taskId)
        console.log('checked:', isDone)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC({todolistId})
        dispatch(action)
        console.log('todolists:', todolists)
        console.log('tasks:', tasks)
    }

    const changeTodolistTitle = (todolistId: string, value: string) => {
        dispatch(changeTodolistTitleAC({todolistId, title: value}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, value: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title: value}))
    }

    const createTodolist = (value: string) => {
        const action = createTodolistAC({title: value})
        dispatch(action)
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
