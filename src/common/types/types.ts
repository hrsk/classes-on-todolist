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
