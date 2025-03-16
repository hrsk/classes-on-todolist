import {createAction, createReducer} from "@reduxjs/toolkit";
import {ThemeMode} from "@/common/types";

const initialState = {
    themeMode: 'light' as ThemeMode
}

export const switchAppTheme = createAction<{ themeMode: ThemeMode }>('app/switch_app_theme')

export const appReducer = createReducer(initialState, builder => {
    builder.addCase(switchAppTheme, (state, action) => {
        state.themeMode = action.payload.themeMode
    })
})