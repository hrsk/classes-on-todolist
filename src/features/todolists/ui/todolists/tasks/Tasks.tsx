import {List} from "@mui/material";
import {useAppSelector} from "@/common/hooks";
import {tasksSelector} from "@/features/todolists/model/selectors";
import {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {TaskItem} from "@/features/todolists/ui/todolists/tasks/task-item/TaskItem.tsx";

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist}: Props) => {

    const tasks = useAppSelector(tasksSelector)

    const {id: todolistId, filter} = todolist

    let filteredTasks = tasks[todolistId];

    if (filter === 'Active') {
        filteredTasks = tasks[todolistId].filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks[todolistId].filter(task => task.isDone)
    }

    return (
        <List style={{listStyle: 'none', padding: 0}}>
            {
                !filteredTasks.length
                    ? <span style={{color: 'crimson'}}>List is empty</span>
                    : filteredTasks.map(task => <TaskItem todolistId={todolistId} task={task}/>)
            }
        </List>
    )
}
