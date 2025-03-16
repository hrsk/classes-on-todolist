import Box from "@mui/material/Box";
import {MaterialButton} from "@/common/components/button/MaterialButton.ts";
import {changeTodolistFilterAC, FilterValues} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks";
import {containerSx} from "@/common/styles/container.styles.ts";

type Props = {
    filter: FilterValues
    todolistId: string
}

export const FilterButtons = ({todolistId, filter}: Props) => {

    const dispatch = useAppDispatch()

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({todolistId, filter}))
    }

    return (
        <Box sx={containerSx}>
            <MaterialButton variant={filter === 'All' ? 'contained' : 'outlined'}
                            color={'primary'}
                            onClick={() => changeFilter('All')}>
                All
            </MaterialButton>
            <MaterialButton variant={filter === 'Active' ? 'contained' : 'outlined'}
                            color={'secondary'}
                            onClick={() => changeFilter('Active')}>
                Active
            </MaterialButton>
            <MaterialButton variant={filter === 'Completed' ? 'contained' : 'outlined'}
                            color={'success'}
                            onClick={() => changeFilter('Completed')}>
                Completed
            </MaterialButton>
        </Box>
    )
}
