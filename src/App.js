import "./components/card-item/CardItem.js";
import "./components/movie-item/MovieItem.js";
import "./components/movie-list/MovieList.js";
import "./components/search-bar/SearchBar.js";
import DataSource from "./data/data-source.js";

const main = document.querySelector("main");

const dashboard = () => {
    main.innerHTML = "";
    const searchBar = document.createElement("search-bar");
    main.appendChild(searchBar);

    const movieList = document.createElement("movie-list");
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
}

const settings = () => {
    main.innerHTML = "";
    const cardElement = document.createElement("card-item");
    main.appendChild(cardElement);
    
    cardElement.data = {
        title: "Pengaturan",
        overview: "Fitur belum tersedia"
    }
}

const about = () => {
    main.innerHTML = "";
    const cardElement = document.createElement("card-item");
    main.appendChild(cardElement);
    
    cardElement.data = {
        title: "Tentang",
        overview: "Fitur belum tersedia"
    }
}

const App = () => {
    const sidebar = document.querySelector("side-bar");

    const appbar = document.querySelector("app-bar");
    appbar.menuClickEvent = () => {
        sidebar.openSideBar();
    };

    const dashboardBtn = sidebar.target1;
    dashboardBtn.addEventListener("click", () => {
        dashboard();
        sidebar.closeSideBar();
        appbar.textMenu = "Movie Finder";
        setClasNameForTargetButton(dashboardBtn);
    });

    const settingBtn = sidebar.target2;
    settingBtn.addEventListener("click", () => {
        settings();
        sidebar.closeSideBar();
        appbar.textMenu = "Pengaturan";
        setClasNameForTargetButton(settingBtn);
    });

    const aboutBtn = sidebar.target3;
    aboutBtn.addEventListener("click", () => {
        about();
        sidebar.closeSideBar();
        appbar.textMenu = "Tentang";
        setClasNameForTargetButton(aboutBtn);
    });

    const exitBtn = sidebar.target4;
    exitBtn.addEventListener("click", () => {
        alert("Keluar");
    });

    const setClasNameForTargetButton = target => {
        dashboardBtn.classList.remove("aktif");
        settingBtn.classList.remove("aktif");
        aboutBtn.classList.remove("aktif");

        if (target.className.split(" ").indexOf("aktif") === -1) {
            target.className += " aktif";
        }
    };

    dashboard();
}

export default App;