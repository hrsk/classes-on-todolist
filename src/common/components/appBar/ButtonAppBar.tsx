import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container} from "@mui/material";
import {containerSx} from "../../../features/todolists/TodolistItem.styles.ts";
import {NavButton} from "../navButton/NavButton.ts";
import {CustomizedSwitch} from "../ThemeSwitch.tsx";

type Props = {
    changeThemeMode: () => void
}

export default function ButtonAppBar({changeThemeMode}: Props) {
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
