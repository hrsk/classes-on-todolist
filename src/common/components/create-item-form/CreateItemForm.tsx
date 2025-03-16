import {ChangeEvent, KeyboardEvent, useRef, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Box from "@mui/material/Box";

type Props = {
    onCreateItem: (value: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const removeInputFocus = () => inputRef.current?.blur();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const callbackHandler = () => {
        const trimmedValue = value.trim()
        if (trimmedValue !== '') {
            onCreateItem(trimmedValue)
        } else {
            setError('Title is required!')
            removeInputFocus()
        }

        if (value === '') {
            setError('Title is required!')
            removeInputFocus()
        }
        setValue('')
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        const key = e.key
        if (key === 'Enter' && e.metaKey) {
            callbackHandler()
        }
        if (error !== null) {
            setError(null)
        }
    }

    const onBlurHandler = () => {
        if (value === '' && error === null) {
            removeInputFocus()
        }
        const trimmedValue = value.trim()
        if (trimmedValue !== '') {
            onCreateItem(trimmedValue)
            setValue('')
        }
    }

    return (
        <Box>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       inputRef={inputRef}
                       value={value}
                       size={'small'}
                       error={!!error}
                       helperText={error}
                       onBlur={onBlurHandler}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
            <IconButton onClick={callbackHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </Box>
    )
}
