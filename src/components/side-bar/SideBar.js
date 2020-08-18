import bgProfileImg from '../../assets/images/bg_profile.png';
import indraImg from '../../assets/images/indra.png';
import homeImg from '../../assets/images/home.png';
import infoImg from '../../assets/images/info.png';
import logoutImg from '../../assets/images/logout.png';
import settingsImg from '../../assets/images/settings.png';
import css from "./SideBar.css";
import html from "./SideBar.html";
import templateFactory from "../templateFactory";

const template = templateFactory(html, css);

class SideBar extends HTMLElement {

    constructor() {
        super();
        this._clientX = 0;
        this._closeSide = true;
    }

    get boolCloseSide() {
        return this._closeSide;
    }

    get target1() {
        return this._target1;
    }

    get target2() {
        return this._target2;
    }

    get target3() {
        return this._target3;
    }

    get target4() {
        return this._target4;
    }

    openSideBar() {
        this._closeSide = false;
        if (this._sideBar.className.split(" ").indexOf("active") === -1) {
            this._sideBar.style.left = "0";
            this._sideBar.className += " active";
            this._overlay.className += " active";
        }
    }

    closeSideBar() {
        this._closeSide = true;
        if (this._sideBar.className.split(" ").indexOf("active") > -1) {
            this._sideBar.style.left = "-250px";
            setTimeout(() => this.removeOverlay(), 350);
        }
    }

    removeOverlay() {
        this._overlay.classList.remove("active");
        this._sideBar.classList.remove("active");
    };

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.render();
    }

    render() {
        this._sideBar = this.shadowRoot.querySelector("#sidebar");
        this._overlay = this.shadowRoot.querySelector("#overlay");
        this._target1 = this.shadowRoot.querySelector("#target1");
        this._target2 = this.shadowRoot.querySelector("#target2");
        this._target3 = this.shadowRoot.querySelector("#target3");
        this._target4 = this.shadowRoot.querySelector("#target4");

        this._overlay.addEventListener("click", () => {
            this._closeSide = true;
            if (this._sideBar.className.split(" ").indexOf("active") > -1) {
                this._sideBar.style.left = "-250px";
                setTimeout(() => this.removeOverlay(), 350);
            }
        });

        this._overlay.addEventListener("touchstart", e => {
            this._closeSide = false;
            this._sideBar.style.transition = "0s";
            this._clientX = e.touches[0].clientX;
        }, {
            passive: true
        });

        this._overlay.addEventListener("touchmove", e => {
            let delta = e.changedTouches[0].clientX - this._clientX;
            if (delta <= 0) this._sideBar.style.left = delta + "px";
        }, {
            passive: true
        });

        this._overlay.addEventListener("touchend", () => {
            this._closeSide = true;
            this._sideBar.style.transition = "all 0.3s";
            const num = parseFloat(this._sideBar.style.left);
            if (this._sideBar.className.split(" ").indexOf("active") > -1) {
                if (num > -125 && num < 0) this._sideBar.style.left = "0";
                else {
                    this._sideBar.style.left = "-250px";
                    setTimeout(() => this.removeOverlay(), 350);
                }
            }
        }, {
            passive: true
        });

        this.shadowRoot.querySelector(".sidebar-header").style.backgroundImage = `url(${bgProfileImg})`;
        this.shadowRoot.querySelector(".sidebar-image > img").src = indraImg;
        this.shadowRoot.querySelector("#target1 > img").src = homeImg;
        this.shadowRoot.querySelector("#target2 > img").src = settingsImg;
        this.shadowRoot.querySelector("#target3 > img").src = infoImg;
        this.shadowRoot.querySelector("#target4 > a > img").src = logoutImg;
    }
}

customElements.define("side-bar", SideBar);