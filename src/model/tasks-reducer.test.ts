import {beforeEach, expect, test} from 'vitest'
import type {Tasks} from '../App'
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer} from "./tasks-reducer.ts";
import {createTodolistAC, removeTodolistAC} from "./todolists-reducer.ts";

let startState: Tasks = {}

beforeEach(() => {

    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'tea', isDone: false},
        ]
    }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodolistAC({title: 'new todolist'}))

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== 'todolistId1' && key !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(startState, removeTodolistAC({todolistId: 'todolistId2'}))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be deleted', () => {
    const endState = tasksReducer(
        startState,
        deleteTaskAC({todolistId: 'todolistId2', taskId: '2'})
    )

    expect(endState).toEqual({
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
        ],
    })
})

test('correct task should be created at correct array', () => {

    const endState = tasksReducer(
        startState,
        createTaskAC({
            todolistId: 'todolistId2',
            title: 'juice',
        })
    )

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(3)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe('bread')
    expect(endState.todolistId2[0].isDone).toBe(false)
    expect(endState.todolistId2[2].title).toBe('juice')
    expect(endState.todolistId2[2].isDone).toBe(false)
})

test('correct task should change its status', () => {

    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({todolistId: 'todolistId2', taskId: '2', isDone: true})
    )

    expect(endState.todolistId1).toEqual([
        {id: '1', title: 'CSS', isDone: false},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false},

    ])

    expect(endState.todolistId2[1].isDone).toBe(true)
    expect(endState.todolistId2[1].id).toBe('2')
    expect(endState.todolistId2[1].title).toBe('tea')
})

test('correct task should change its title', () => {

    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({todolistId: 'todolistId1', taskId: '3', title: 'React/Redux'})
    )

    expect(endState.todolistId2).toEqual([
        {id: '1', title: 'bread', isDone: false},
        {id: '2', title: 'tea', isDone: false},

    ])

    expect(endState.todolistId1[2].isDone).toBe(false)
    expect(endState.todolistId1[2].id).toBe('3')
    expect(endState.todolistId1[2].title).toBe('React/Redux')
})
