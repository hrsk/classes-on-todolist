export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type FieldError = {
    error: string
    field: string
}

export type ResponseData<T = {}> = {
    data: T
    fieldsErrors: FieldError[]
    messages: string[]
    resultCode: number
}