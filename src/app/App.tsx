import './App.css'
import {Header} from "../common/components/header/Header.tsx";
import {CssBaseline, ThemeProvider} from '@mui/material';
import {selectThemeMode} from "../app/app-selectors.ts";
import {Main} from "@/app/Main.tsx";
import {getTheme} from "@/common/theme";
import {useAppSelector} from "@/common/hooks";

export const App = () => {

    const theme = getTheme(useAppSelector(selectThemeMode))

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    )
}
