import './App.css';
import theme from './css'
import {Container, CssBaseline, Grid, ThemeProvider} from "@mui/material";
import SearchAppBar from "./components/SearchAppBar";
import dummymoviedata from "./testdata/dummymoviedata";
import {useEffect, useState} from "react";
import MovieDetails from "./components/MovieDetails";
import LoginForm from './components/LoginForm';
import MovieList from "./components/MovieList";

function App() {
    const [movieList, setMovieList] = useState(dummymoviedata);
    const [showMovieDetails, setShowMovieDetails] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [searchResults, setSearchResults] = useState(null);

    const showSearchResults = (searchText) => {
        setSearchResults(movieList.filter((movie, currentIndex) => {
            if(movie.title.toLowerCase().includes(searchText)) {
                //console.log('found: ' + movie.title, searchText);
                return true;
            } else {
                //console.log('NOT found: ' + movie.title, searchText);
                return false;
            }
        }));
    };

    const getAllMoviesFromAPI = async () => {
        await fetch("http://localhost:3001/movies")
            .then(response => response.json())
            .then(data => setMovieList(data))
    }


    useEffect( () => {
        getAllMoviesFromAPI();
    }, []);


    let shownComponents = '';

    const showLogin = () => {
        setShowLoginForm(true);
        setShowMovieDetails(false);
        setCurrentMovie(null);
        setSearchResults(null);
    }

    const showSingleMovie = (movie) => {
        setCurrentMovie(movie);
        setShowMovieDetails(true);
        setSearchResults(null);
    };

    const showHomePage = () => {
        setShowLoginForm(false);
        setShowMovieDetails(false);
        setCurrentMovie(null);
        setSearchResults(null);
    };

    if(searchResults) {
        shownComponents = <MovieList movieList={searchResults} showSingleMovie={showSingleMovie} />;
    } else if(showLoginForm) {
        shownComponents = <LoginForm />
    } else if (showMovieDetails) {
        shownComponents = <MovieDetails movie={currentMovie} showSingleMovie={setShowMovieDetails} />;
    } else {
        shownComponents = <MovieList movieList={movieList} showSingleMovie={showSingleMovie} />;
    }

    return (
        <>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <SearchAppBar showSearchResults={showSearchResults} showHomePage={showHomePage} showTheLoginForm={showLogin} />
                {shownComponents}
            </ThemeProvider>
        </>
    );
}

export default App;
