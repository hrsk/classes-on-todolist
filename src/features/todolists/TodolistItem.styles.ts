import { SxProps } from '@mui/material'

export const containerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
}
export const getListItemSx = (isDone: boolean): SxProps => ({
    p: 0,
    justifyContent: 'space-between',
    opacity: isDone ? 0.5 : 1,
})