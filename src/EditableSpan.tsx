import {ChangeEvent, Fragment, JSX, KeyboardEvent, ReactNode, useState} from "react";
import './App.css'

type Props = {
    initialValue: string
    callback: (value: string) => void
    render: (text: string, onDoubleClick: () => void) => JSX.Element
}

export const EditableSpan = ({initialValue, callback, render}: Props) => {

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState<string | undefined>(() => initialValue)
    const [error, setError] = useState<string | null>(null)

    const callbackHandler = () => {
        if (value) {
            const trimmedValue = value.trim()
            if (trimmedValue !== '') {
                callback(trimmedValue)
                setEditMode(false)
            } else {
                setError('Title is required!')
            }
        }
        if (value === '') {
            setError('Title is required!')
        }
    }

    const activateEditMode = () => {
        setValue(initialValue)
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        callbackHandler()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        if (error !== null) {
            setError(null)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        const {key} = e
        if (key === 'Enter' && e.metaKey) {
            deactivateEditMode()
        }
    }

    return (
        <div className={'box'}> {
            editMode
                ? <input value={value}
                         autoFocus={true}
                         onChange={onChangeHandler}
                         onKeyDown={onKeyPressHandler}
                         onBlur={deactivateEditMode}
                         className={error ? 'isError' : undefined}/>
                : <Children>{render(initialValue, () => activateEditMode())}</Children>
        }
            {
                error && <span style={{display: "block"}} className={error ? 'errorMessage' : undefined}>{error}</span>
            }
        </div>
    )
}

type ChildrenProps = {
    children: ReactNode
}

const Children = ({children}: ChildrenProps) => {
    return <Fragment>{children}</Fragment>
}