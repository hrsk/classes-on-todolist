import {instanceAxios} from "@/common";
import {Todolist, ResponseData} from "@/common/api";

export const todolistsApi = {
    getTodolists() {
        return instanceAxios.get<Todolist[]>(`/todo-lists`).then(response => response)
    },
    createTodolist(title: string) {
        return instanceAxios.post<ResponseData<{ item: Todolist }>>(`/todo-lists`, {title}).then(response => response)
    },
    deleteTodolist(todolistId: string) {
        return instanceAxios.delete<ResponseData>(`/todo-lists/${todolistId}`).then(response => response)
    },
    changeTodolistTitle(todolistId: string, title: string) {
        return instanceAxios.put<ResponseData>(`/todo-lists/${todolistId}`, {title}).then(response => response)
    },
}
