import {RootState} from "./store.ts";
import {ThemeMode} from "../common/types";

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode