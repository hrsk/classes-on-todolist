import Box from "@mui/material/Box";
import {EditableSpan} from "@/common/components";
import {DeleteButton} from "@/common/components/button/DeleteButton.tsx";
import {changeTodolistTitleAC, removeTodolistAC, Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks";

type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({todolist}: Props) => {

    const dispatch = useAppDispatch()

    const {id: todolistId, title} = todolist

    const changeTodolistTitle = (value: string) => {
        dispatch(changeTodolistTitleAC({todolistId, title: value}))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC({todolistId}))
    }

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <EditableSpan initialValue={title}
                          render={(text, onDoubleClick) => <h3 onDoubleClick={onDoubleClick}>{text}</h3>}
                          callback={changeTodolistTitle}/>
            <DeleteButton callback={removeTodolist}/>
        </Box>
    )

}
