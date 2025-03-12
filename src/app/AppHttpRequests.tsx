import {ChangeEvent, CSSProperties, useEffect, useState} from "react";
import {CreateItemForm} from "../CreateItemForm";
import {EditableSpan} from "../EditableSpan.tsx";
import {instanceAxios} from "../common";

export const AppHttpRequests = () => {

    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<any>({})

    const token = '459d1d3c-5bee-41b8-a461-4583f1701a88'
    // const API_KEY = '60f832d0-b06e-4e32-a7fd-f271ef9cdfdd'

    const BASE_URL = `https://social-network.samuraijs.com/api/1.1`


    function getTodolists() {
        fetch(`${BASE_URL}/todo-lists`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            response.json()
                .then(
                    (data: Todolist[]) => {
                        setTodolists(data)
                    }
                )
        })
    }


    useEffect(() => {
        getTodolists()

        // axios.get<Todolist[]>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {headers: {
        //         Authorization: `Bearer ${token}`,
        //     }}).then(
        //     response => {
        //         setTodolists(response.data)
        //     }
        // )
        //

    }, [])

    const createTodolist = (title: string) => {
        instanceAxios.post<ResponseData<{ item: Todolist }>>(`/todo-lists`, {title}).then(response => {
            setTodolists([response.data.data.item, ...todolists])
            // console.log(response.data)
        })
    }

    const deleteTodolist = (todolistId: string) => {
        instanceAxios.delete<ResponseData>(`/todo-lists/${todolistId}`).then(
            () => {
                setTodolists(todolists.filter(td => td.id !== todolistId))
            }
        )
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        instanceAxios.put<ResponseData>(`/todo-lists/${todolistId}`, {title}).then(
            () => {
                setTodolists(todolists.map(td => td.id === todolistId ? {...td, title} : td))
            }
        )
    }

    const createTask = (todolistId: string, title: string) => {
    }

    const deleteTask = (todolistId: string, taskId: string) => {
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {
    }

    const changeTaskTitle = (task: any, title: string) => {
    }

    return (
        <div style={{margin: '20px'}}>
            <CreateItemForm onCreateItem={createTodolist}/>
            {todolists.map(todolist => (
                <div key={todolist.id} style={container}>
                    <div>
                        <EditableSpan initialValue={todolist.title}
                                      callback={title => changeTodolistTitle(todolist.id, title)}
                                      render={(text, onDoubleClick) => <h3 onDoubleClick={onDoubleClick}>{text}</h3>}/>
                        {/*<EditableSpan value={todolist.title}*/}
                        {/*              onChange={title => changeTodolistTitle(todolist.id, title)}/>*/}
                        <button onClick={() => deleteTodolist(todolist.id)}>x</button>
                    </div>
                    <CreateItemForm onCreateItem={title => createTask(todolist.id, title)}/>
                    {tasks[todolist.id]?.map((task: any) => (
                        <div key={task.id}>
                            <input checked={task.isDone}
                                   onChange={e => changeTaskStatus(e, task)}/>
                            <EditableSpan initialValue={task.title}
                                          callback={title => changeTaskTitle(task, title)}
                                          render={(text, onDoubleClick) => <span
                                              onDoubleClick={onDoubleClick}>{text}</span>}/>
                            {/*<EditableSpan value={task.title}*/}
                            {/*              onChange={title => changeTaskTitle(task, title)}/>*/}
                            <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const container: CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}

type Todolist = {
    id: string
    addedDate: string
    order: number
    title: string
}

type FieldError = {
    error: string
    field: string
}

type ResponseData<T = {}> = {
    data: T
    fieldsErrors: FieldError[]
    messages: string[]
    resultCode: number
}