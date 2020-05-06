import '../component/movie-list.js';
import '../component/search-bar.js';
import DataSource from '../data/data-source.js';

const main = () => {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    
    const searchElement = document.createElement("search-bar");
    const movieListElement = document.createElement("movie-list");
    mainElement.appendChild(searchElement);
    mainElement.appendChild(movieListElement);

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

export default main;