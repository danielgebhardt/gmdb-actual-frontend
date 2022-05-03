import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, TextField} from "@mui/material";
import {useState} from "react";

const MovieDetails = (props) => {

    const [showCommentsBox, setShowCommentsBox] = useState(true);

    const hideCommentBox = () => {
          setShowCommentsBox(false);
    };

    return (
        <>
        <Box sx={{flexGrow: 1, marginTop: '20px'}}>
            <AppBar position="static">
                <Toolbar>
                    <Button variant={"text"} color="secondary" onClick={() => {props.showSingleMovie(false)}}>Back to results</Button>
                </Toolbar>
            </AppBar>
        </Box>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={4} md={4}>
                     <img src={props.movie.poster} alt={props.movie.title} />
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <Typography variant={"h4"}>{props.movie.title}</Typography>
                        <Typography variant={"h6"}>{props.movie.released}</Typography>
                        <Typography variant={"h6"}>{props.movie.genre}</Typography>
                        <Typography variant={"h6"}>{props.movie.plot}</Typography>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        {showCommentsBox && <TextField id="outlined-basic" label="Comment" variant="outlined"
                                    placeholder={"Add a comment"}/>}
                        <br/>
                        {!showCommentsBox && "Comment submitted."}
                        <br/>
                        {showCommentsBox && <Button variant="contained" onClick={hideCommentBox}>Submit</Button>}
                    </Grid>

                </Grid>
            </Container>

        </>
    );
};

export default MovieDetails;