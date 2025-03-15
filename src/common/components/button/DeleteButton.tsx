import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    callback: () => void
}
export const DeleteButton = ({callback}: Props) => {
    return (
        <IconButton onClick={callback}>
            <DeleteIcon/>
        </IconButton>
    )
}
