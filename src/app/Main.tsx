import {Container, Grid2} from "@mui/material";
import {CreateItemForm} from "@/common/components";
import {createTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks";
import {Todolists} from "@/features/todolists/ui/todolists/Todolists.tsx";

export const Main = () => {

    const dispatch = useAppDispatch()

    const createTodolist = (value: string) => {
        dispatch(createTodolistAC(value))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid2 container sx={{mb: '30px'}}>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid2>
            <Grid2 container spacing={4}>
                <Todolists/>
            </Grid2>
        </Container>
    )
}
