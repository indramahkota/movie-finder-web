import '../component/movie-list.js';
import '../component/search-bar.js';
import DataSource from '../data/data-source.js';

const main = () => {
    const searchElement = document.querySelector("search-bar");
    const movieListElement = document.querySelector("movie-list");

    const checkQuery = (value) => {
        if(value === null || value === "") {
            fallbackResult("Please type query");
        } else {
            getMovieData(value)
        }
    }

    const getMovieData = async (value) => {
        try {
            const result = await DataSource.searchMovie(value);
            renderResult(result);
        } catch (message) {
            fallbackResult(message);
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
};

export default main;