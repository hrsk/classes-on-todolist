import {Task} from "./App.tsx";
import {Button} from "./Button.tsx";

type Props = {
    title: string
    tasks: Task[]
}

export const TodolistItem = ({title, tasks}: Props) => {

    const tasksAfterMap = tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul style={{listStyle: 'none', padding: 0}}>
                {
                    !tasks.length
                        ? <span style={{color: 'crimson'}}>List is empty</span>
                        : tasksAfterMap
                }
            </ul>
            <div>
                <Button onClick={() => console.log('All')}>All</Button>
                <Button onClick={() => console.log('Active')}>Active</Button>
                <Button onClick={() => console.log('Completed')}>Completed</Button>
            </div>
        </div>
    )
}
