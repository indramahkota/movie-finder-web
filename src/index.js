import "regenerator-runtime";
import "./styles/style.css";
import "./script/component/app-bar.js";
import "./script/component/side-bar.js";

const sideBarElement = document.querySelector("side-bar");
const appBarElement = document.querySelector("app-bar");
appBarElement.menuClickEvent = () => {
    sideBarElement.openSideBar()
};