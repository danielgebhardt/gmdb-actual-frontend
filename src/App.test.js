import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import App from './App';
import SearchAppBar from "./components/SearchAppBar";
import dummymoviedata from "./testdata/dummymoviedata";
import MovieDetails from "./components/MovieDetails";
import LoginForm from "./components/LoginForm";
import {type} from "@testing-library/user-event/dist/type";


describe('Navbar should have GMDB, Home, Login, and Search Box', () => {
    test('Navbar has GMDB, Home, and Login Buttons', () => {
        render(<SearchAppBar/>);
        const gmdbElement = screen.getByText(/GMDB/i);
        expect(gmdbElement).toBeInTheDocument();

        const homeLinkElement = screen.getByText(/Home/i);
        expect(homeLinkElement).toBeInTheDocument();

        const loginElement = screen.getByText(/Login/i);
        expect(loginElement).toBeInTheDocument();
    });

    test('Navbar has Search Box', () => {
        render(<SearchAppBar/>);

        const searchElement = screen.getByPlaceholderText(/Search/i);
        expect(searchElement).toBeInTheDocument();
    });
});

describe('application displays movie title', () => {
    test('contains img', () => {
        render(<MovieDetails movie={dummymoviedata[0]}/>);
        const searchElement = screen.getByAltText(/Guardians of the Galaxy Vol. 2/i);
        expect(searchElement).toBeInTheDocument();
    });

    test('contains title', () => {
        render(<MovieDetails movie={dummymoviedata[0]}/>);
        const searchElement = screen.getByText(/Guardians of the Galaxy Vol. 2/i);
        expect(searchElement).toBeInTheDocument();
    })

    test('contains release date', () => {
        render(<MovieDetails movie={dummymoviedata[0]}/>);
        const searchElement = screen.getByText(/05 May 2017/i);
        expect(searchElement).toBeInTheDocument();
    })

    test('contains genre', () => {
        render(<MovieDetails movie={dummymoviedata[0]}/>);
        const searchElement = screen.getByText(/Action, Adventure, Comedy, Sci-Fi/i);
        expect(searchElement).toBeInTheDocument();
    })

    test('contains plot', () =>{
        render(<MovieDetails movie={dummymoviedata[0]}/>);
        const searchElement = screen.getByText(/The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego./i);
        expect(searchElement).toBeInTheDocument();
    })

    test('displays comment box', () =>{
        render(<MovieDetails movie={dummymoviedata[0]}/>);
        const searchElement = screen.getByRole('textbox');
        expect(searchElement).toBeInTheDocument();

    })

    test('displays submit button', () =>{
        render(<MovieDetails movie={dummymoviedata[0]}/>);
        //const searchElement = screen.getByRole('button');
        const searchElement = screen.getByText(/Submit/i);
        expect(searchElement).toBeInTheDocument();
    })

    test('submit comment', async () =>{
        render(<MovieDetails movie={dummymoviedata[0]}/>);
        const searchElement = screen.getByRole('textbox');
        const reviewComment = "Great";
        await userEvent.type(searchElement, reviewComment);
        const searchButton = screen.getByText(/^Submit$/i);
        await userEvent.click(searchButton);
        expect(screen.getByText(/Comment submitted./i)).toBeInTheDocument();
        expect(screen.queryByText(/^Submit$/i)).toBeNull();
        expect(screen.queryByText('textbox')).toBeNull();
    })
})

describe('login form has login and password text fields with submit button. When submitted, shows Logged in', function () {
    test('login form has login and password text fields with submit button', () => {
        render(<LoginForm />);
        expect(screen.getByText('Email:')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('enter username')).toBeInTheDocument();
        expect(screen.getByText('Password:')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('enter password')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('When form is submitted, shows Logged in', async () => {
        render(<LoginForm />);
        await userEvent.type(screen.getByPlaceholderText('enter username'), "Jack");
        await userEvent.type(screen.getByPlaceholderText('enter password'), "pwd");
        await userEvent.click(screen.getByRole('button'));

        expect(screen.getByText('Logged in.')).toBeInTheDocument();

        expect(screen.queryByText('Email:')).toBeNull();
        expect(screen.queryByPlaceholderText('enter username')).toBeNull();
        expect(screen.queryByText('Password:')).toBeNull();
        expect(screen.queryByPlaceholderText('enter password')).toBeNull();
        expect(screen.queryByRole('button')).toBeNull();
    });
});



