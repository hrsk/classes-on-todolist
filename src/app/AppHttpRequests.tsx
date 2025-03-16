import {ChangeEvent, CSSProperties, useEffect, useState} from "react";
import {CreateItemForm, EditableSpan} from '@/common/components'
import {todolistsApi} from "@/features/todolists/api";
import {Todolist} from "@/common/api";

export const AppHttpRequests = () => {

    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<any>({})


    useEffect(() => {
        todolistsApi.getTodolists().then(
            ({data}) => setTodolists(data)
        )
    }, [])

    const createTodolist = (title: string) => {
        todolistsApi.createTodolist(title).then(
            ({data}) => setTodolists([data.data.item, ...todolists]))
    }

    const deleteTodolist = (todolistId: string) => {
        todolistsApi.deleteTodolist(todolistId).then(
            () => setTodolists(todolists.filter(td => td.id !== todolistId))
        )
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        todolistsApi.changeTodolistTitle(todolistId, title).then(
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
