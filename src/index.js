import "regenerator-runtime";
import "./styles/style.css";

import "./components/app-bar/AppBar.js";
import "./components/card-item/CardItem.js";
import "./components/side-bar/SideBar.js";

import main from "./views/main.js";
import settings from "./views/settings.js";
import about from "./views/about.js";

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