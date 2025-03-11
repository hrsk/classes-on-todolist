import {beforeEach, expect, test} from 'vitest'
import {v1} from "uuid";
import {Todolist} from "../app/App.tsx";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    removeTodolistAC,
    todolistsReducer,
} from "./todolists-reducer.ts";

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {

    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]
})

test('correct todolist should be deleted', () => {

    const action = removeTodolistAC({todolistId: todolistId1})

    const endState = todolistsReducer(startState, action)


    expect(endState.length).toBe(1)
    if (action.payload.todolistId === todolistId1) {
        expect(endState[0].title).toBe('What to buy')
    }
    if (action.payload.todolistId === todolistId2) {
        expect(endState[0].title).toBe('What to learn')
    }
})

test('correct todolist should be created', () => {

    const title = 'New todolist'
    const endState = todolistsReducer(startState, createTodolistAC({title}))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test('correct todolist should change its title', () => {

    const title = 'title has been changed'
    const endState = todolistsReducer(startState, changeTodolistTitleAC({todolistId: todolistId1, title}))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(title)
    expect(endState[1].title).toBe(startState[1].title)
    expect(endState[1].title).toBe('What to buy')
})

test('correct todolist should change its filter', () => {

    const filter = 'Completed'
    const endState = todolistsReducer(startState, changeTodolistFilterAC({todolistId: todolistId1, filter}))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(filter)
    expect(endState[1].filter).toBe(startState[1].filter)
    expect(endState[1].filter).toBe('All')
})