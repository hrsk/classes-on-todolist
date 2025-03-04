import {expect, test} from 'vitest'
import {v1} from "uuid";
import {Todolist} from "../App.tsx";
import {RemoveTodolist, todolistsReducer} from "./todolists-reducer.ts";

test('correct todolist should be deleted', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const action = RemoveTodolist({todolistId: todolistId1})

    const endState = todolistsReducer(startState, action)


    expect(endState.length).toBe(1)
    if (action.payload.todolistId === todolistId1) {
        expect(endState[0].title).toBe('What to buy')
    }
    if (action.payload.todolistId === todolistId2) {
        expect(endState[0].title).toBe('What to learn')
    }
})