import {RootState} from "../../app/store.ts";
import {Todolist} from "../../app/App.tsx";

export const todolistsSelector = (state: RootState): Todolist[] => state.todolists