import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Container} from "@mui/material";
import {containerSx} from "../../../features/todolists/TodolistItem.styles.ts";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import {CustomizedSwitch} from "../ThemeSwitch.tsx";
import {NavButton} from "../navButton/NavButton.ts";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {switchAppTheme} from "../../../app/app-reducer.ts";
import {selectThemeMode} from "../../../app/app-selectors.ts";


export const Header = () => {

    const dispatch = useAppDispatch()
    const themeMode = useAppSelector(selectThemeMode)

    const changeThemeMode = () => {
        console.log('theme:', themeMode === 'light' ? 'dark' : 'light')
        dispatch(switchAppTheme({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Box>
                        <CustomizedSwitch changeThemeMode={changeThemeMode}/>
                        <NavButton color="inherit">Sign in</NavButton>
                        <NavButton color="inherit">Sign up</NavButton>
                        <NavButton color="inherit">Faq</NavButton>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}
