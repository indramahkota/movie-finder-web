import "regenerator-runtime";
import "./styles/style.css";

// app-bar component
import "./script/component/app-bar";

// card-item component
import "./script/component/card-item";

// side-bar component
import "./script/component/side-bar";

import main from "./script/view/main.js";
import settings from "./script/view/settings.js";
import about from "./script/view/about.js";

const sidebar = document.querySelector("side-bar");
const appbar = document.querySelector("app-bar");
appbar.menuClickEvent = () => {
    sidebar.openSideBar();
};

const dashboardBtn = sidebar.target1;
const settingBtn = sidebar.target2;
const aboutBtn = sidebar.target3;
const exitBtn = sidebar.target4;

dashboardBtn.addEventListener("click", () => {
    main();
    sidebar.closeSideBar();
    appbar.textMenu = "Movie Finder";
    setClasNameForTargetButton(dashboardBtn);
});

settingBtn.addEventListener("click", () => {
    settings();
    sidebar.closeSideBar();
    appbar.textMenu = "Pengaturan";
    setClasNameForTargetButton(settingBtn);
});

aboutBtn.addEventListener("click", () => {
    about();
    sidebar.closeSideBar();
    appbar.textMenu = "Tentang";
    setClasNameForTargetButton(aboutBtn);
});

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

document.addEventListener("DOMContentLoaded", main);