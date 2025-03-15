import './App.css'
import {TodolistItem} from "../TodolistItem.tsx";
import {CreateItemForm} from "../common/components/create-item-form/CreateItemForm.tsx";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    removeTodolistAC
} from "../model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "../model/tasks-reducer.ts";
import {useAppDispatch, useAppSelector} from "../common/hooks";
import {tasksSelector, todolistsSelector} from "../model/selectors";
import ButtonAppBar from "../common/components/appBar/ButtonAppBar.tsx";
import {Container, createTheme, CssBaseline, Grid2, Paper, ThemeProvider} from '@mui/material';
import {useState} from "react";
import {ThemeMode} from "../common/types";

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

    const todolists = useAppSelector(todolistsSelector)
    const tasks = useAppSelector(tasksSelector)
    const dispatch = useAppDispatch()
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

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
        dispatch(removeTodolistAC({todolistId}))
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
        dispatch(createTodolistAC(value))
    }

    const changeThemeMode = () => {
        console.log('theme:', themeMode === 'light' ? 'dark' : 'light')
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <ButtonAppBar changeThemeMode={changeThemeMode}/>
                <Container maxWidth={'lg'}>
                    <Grid2 container sx={{mb: '30px'}}>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid2>
                    <Grid2 container spacing={4}>
                        {
                            todolists.map(todolist => {
                                return (
                                    <Grid2 key={todolist.id}>
                                        <Paper sx={{p: '0 20px 20px 20px'}}>

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
                                        </Paper>
                                    </Grid2>
                                )
                            })
                        }
                    </Grid2>
                </Container>
            </div>
        </ThemeProvider>
    )
}
