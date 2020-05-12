import '../component/movie-list.js';
import '../component/search-bar.js';
import DataSource from '../data/data-source.js';

const main = () => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    
    const searchBar = document.createElement("search-bar");
    const movieList = document.createElement("movie-list");
    main.appendChild(searchBar);
    main.appendChild(movieList);

    const checkQuery = (value) => {
        if (window.navigator.onLine) {
            if (value === null || value === "") {
                fallbackResult("Please type query");
            } else {
                searchMovieWithQuery(value)
            }
        } else {
            fallbackResult("No internet");
        }
    }

    const searchMovieWithQuery = async (value) => {
        if (window.navigator.onLine) {
            try {
                const result = await DataSource.searchMovie(value);
                renderResult(result);
            } catch (message) {
                fallbackResult(message);
            }
        } else {
            fallbackResult("No internet");
        }
    }

    const onButtonSearchClicked = () => checkQuery(searchBar.searchQuery);

    const onButtonSearchEntered = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            checkQuery(searchBar.searchQuery);
        }
    };

    const renderResult = results => {
        movieList.movies = results;
    };

    const fallbackResult = message => {
        movieList.renderError(message);
    };

    searchBar.clickEvent = onButtonSearchClicked;
    searchBar.keyUpEvent = onButtonSearchEntered;

    const getMovieData = async () => {
        if (window.navigator.onLine) {
            try {
                const result = await DataSource.discoverMovie();
                renderResult(result);
            } catch (message) {
                fallbackResult(message);
            }
        } else {
            fallbackResult("No internet");
        }
    }

    getMovieData();
};

export default main;