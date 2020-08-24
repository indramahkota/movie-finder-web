import DataSource from "./data/data-source.js";

const movieList = document.querySelector("movie-list");
const renderResult = results => {
    movieList.movies = results;
};
const fallbackResult = message => {
    movieList.renderError(message);
};

const isValidQuery = query => query !== "";
const prosesQuery = query => {
    isValidQuery(query) ? searchMovieWithQuery(query) : fallbackResult("Please type query!");
}
const searchMovieWithQuery = async value => {
    try {
        const result = await DataSource.searchMovie(value);
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
}

const App = async () => {
    const searchBar = document.querySelector("search-bar");
    searchBar.clickEvent = () => prosesQuery(searchBar.searchQuery);
    searchBar.keyUpEvent = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            prosesQuery(searchBar.searchQuery);
        }
    };

    try {
        const result = await DataSource.discoverMovie();
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
}

export default App;