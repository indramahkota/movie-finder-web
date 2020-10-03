import "./styles/style.css";
import 'regenerator-runtime';
import "./components/app-bar/AppBar.js";
import "./components/movie-item/MovieItem.js";
import "./components/movie-list/MovieList.js";
import "./components/search-bar/SearchBar.js";

import App from "./App.js";

if(window.localStorage.getItem("app-dark-mode") === 'dark') {
    window.document.body.classList.add('dark');
} else {
    window.document.body.classList.remove('dark');
}

document.addEventListener("DOMContentLoaded", App);