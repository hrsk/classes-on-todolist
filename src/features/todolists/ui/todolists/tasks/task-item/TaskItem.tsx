import {Checkbox, ListItem} from "@mui/material";
import Box from "@mui/material/Box";
import {EditableSpan} from "@/common/components";
import {DeleteButton} from "@/common/components/button/DeleteButton.tsx";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from "@/features/todolists/model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks";
import {getListItemSx} from "@/features/todolists/ui/todolists/tasks/task-item/TaskItem.styles.ts";
import {containerSx} from "@/common/styles/container.styles.ts";

type Props = {
    todolistId: string
    task: Task
}

export const TaskItem = ({todolistId, task}: Props) => {

    const dispatch = useAppDispatch()

    const changeTaskTitle = (value: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title: value}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: e.currentTarget.checked}))
    }

    const removeTask = () => {
        dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    }

    return (
        <ListItem sx={getListItemSx(task.isDone)} key={task.id}>
            <Box sx={containerSx}>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan initialValue={task.title}
                              callback={changeTaskTitle}
                              render={(text, onDoubleClick) => <span onDoubleClick={onDoubleClick}>{text}</span>}/>
            </Box>
            <DeleteButton callback={removeTask}/>
        </ListItem>
    )
}
