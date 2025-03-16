import {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks";
import {createTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {TodolistTitle} from "@/features/todolists/ui/todolists/todolist-title/TodolistTitle.tsx";
import {FilterButtons} from "@/features/todolists/ui/filter-buttons/FilterButtons.tsx";
import {Tasks} from "@/features/todolists/ui/todolists/tasks/Tasks.tsx";
import {CreateItemForm} from "@/common/components";

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({
                                 todolist,
                             }: Props) => {

    const dispatch = useAppDispatch()

    const {id: todolistId, filter} = todolist

    const createTask = (value: string) => {
        dispatch(createTaskAC({todolistId, title: value}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolistId={todolist.id} filter={filter}/>
        </div>
    )
}
