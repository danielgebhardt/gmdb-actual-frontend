import {Grid} from "@mui/material";

const Movie = ({movie, showSingleMovie}) => {
    return (
        <Grid key={movie.movieId} item sm={4} md={4} lg={3} ><img width={"300"} height={"444"} src={movie.poster}
                                                                  alt={movie.title} onClick={() => showSingleMovie(movie)} /></Grid>
    );
}

export default Movie;