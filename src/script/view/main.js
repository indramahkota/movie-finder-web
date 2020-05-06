import '../component/movie-list.js';
import '../component/search-bar.js';
import DataSource from '../data/data-source.js';

const main = () => {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "<search-bar></search-bar><movie-list></movie-list>";

    const searchElement = document.querySelector("search-bar");
    const movieListElement = document.querySelector("movie-list");

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

    const onButtonSearchClicked = () => checkQuery(searchElement.searchQuery);

    const onButtonSearchEntered = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            checkQuery(searchElement.searchQuery);
        }
    };

    const renderResult = results => {
        movieListElement.movies = results;
    };

    const fallbackResult = message => {
        movieListElement.renderError(message);
    };

    searchElement.clickEvent = onButtonSearchClicked;
    searchElement.keyUpEvent = onButtonSearchEntered;

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

document.addEventListener("DOMContentLoaded", main);