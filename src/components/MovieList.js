import {Container, Grid} from "@mui/material";
import Movie from "./Movie";

const MovieList = ({movieList, showSingleMovie}) => {
    return (
        <Container>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 10 }}>
                {movieList.map((movie) => <Movie key={movie.movieId} movie={movie} showSingleMovie={showSingleMovie} />)}
            </Grid>
        </Container>
    );
}

export default MovieList;