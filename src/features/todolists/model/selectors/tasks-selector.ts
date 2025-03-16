import {RootState} from "@/app/store.ts";
import {Tasks} from "@/features/todolists/model/tasks-reducer.ts";


export const tasksSelector = (state: RootState): Tasks => state.tasks