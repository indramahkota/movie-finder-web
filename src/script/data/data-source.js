const base_url = "https://api.themoviedb.org/3/";
const api_key = "0baf2c567988149d686a1289304f46cb";
class DataSource {
    static searchMovie(keyword) {
        return fetch(`${base_url}search/movie?api_key=${api_key}&query=${keyword}`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if(responseJson.results) {
                return Promise.resolve(responseJson.results);
            } else {
                return Promise.reject(`${keyword} is not found`);
            }
        })
    }

    static discoverMovie() {
        return fetch(`${base_url}discover/movie?api_key=${api_key}&page=1`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if(responseJson.results) {
                return Promise.resolve(responseJson.results);
            } else {
                return Promise.reject(`something error`);
            }
        })
    }
 }

export default DataSource;