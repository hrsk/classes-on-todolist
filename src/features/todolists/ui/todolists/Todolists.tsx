import {Grid2, Paper} from "@mui/material";
import {TodolistItem} from "@/features/todolists/ui/todolists/todolist-item/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks";
import {todolistsSelector} from "@/features/todolists/model/selectors";

export const Todolists = () => {

    const todolists = useAppSelector(todolistsSelector)

    return todolists.map(todolist => {
        return (
            <Grid2 key={todolist.id}>
                <Paper sx={{p: '0 20px 20px 20px'}}>
                    <TodolistItem todolist={todolist}/>
                </Paper>
            </Grid2>
        )
    })
}
