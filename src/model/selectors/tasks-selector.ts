import {RootState} from "../../app/store.ts";
import {Tasks} from "../../app/App.tsx";

export const tasksSelector = (state: RootState): Tasks => state.tasks