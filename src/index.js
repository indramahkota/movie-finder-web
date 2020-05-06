import "regenerator-runtime";
import "./styles/style.css";
import "./script/component/app-bar.js";
import "./script/component/side-bar.js";
import main from "./script/view/main.js";
import settings from "./script/view/settings.js";
import about from "./script/view/about.js";

const sideBarElement = document.querySelector("side-bar");
const appBarElement = document.querySelector("app-bar");
appBarElement.menuClickEvent = () => {
    sideBarElement.openSideBar();
};

const target1 = sideBarElement.target1;
const target2 = sideBarElement.target2;
const target3 = sideBarElement.target3;
const target4 = sideBarElement.target4;

target1.addEventListener("click", () => {
    main();
    sideBarElement.closeSideBar();
    appBarElement.textMenu = "Movie Finder";
    setClasNameForTargetButton(target1);
});

target2.addEventListener("click", () => {
    settings();
    sideBarElement.closeSideBar();
    appBarElement.textMenu = "Pengaturan";
    setClasNameForTargetButton(target2);
});

target3.addEventListener("click", () => {
    about();
    sideBarElement.closeSideBar();
    appBarElement.textMenu = "Tentang";
    setClasNameForTargetButton(target3);
});

target4.addEventListener("click", () => {
    alert("Hanya contoh");
});

const setClasNameForTargetButton = target => {
    target1.classList.remove("aktif");
    target2.classList.remove("aktif");
    target3.classList.remove("aktif");

    if (target.className.split(" ").indexOf("aktif") == -1) {
        target.className += " aktif";
    }
};

document.addEventListener("DOMContentLoaded", main);