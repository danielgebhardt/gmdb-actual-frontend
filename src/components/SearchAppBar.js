import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Button, Container, Menu, MenuItem} from "@mui/material";
import theme from '../css'
import {useState} from "react";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const SearchAppBar = ({showTheLoginForm, showHomePage, showSearchResults}) => {

    const [searchText, setSearchText] = useState("");

    const searchBoxHandler = (event) => {
        if(event.key === 'Enter') {
            showSearchResults(searchText.toLowerCase());
        }
    };

    const updateSearchText = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">

                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block', paddingLeft: '2%', paddingRight: '2%'}}}
                    >
                        GMDB
                    </Typography>

                    <Box sx={{flexGrow: 1}}>
                        <Button variant="text" color={"secondary"} onClick={showHomePage}>Home</Button>
                        <Button variant="text" color={"secondary"} onClick={() => showTheLoginForm(true)}>Login</Button>
                    </Box>


                    <Box sx={{paddingRight: '2%'}}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{'aria-label': 'search'}}
                                onKeyPress={(event) => {searchBoxHandler(event)}}
                                onChange={(event) => {updateSearchText(event)}}
                                value={searchText}
                            />
                        </Search>
                    </Box>
                </Toolbar>

            </AppBar>
        </Box>
    );
}

export default SearchAppBar;