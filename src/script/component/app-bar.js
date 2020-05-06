class AppBar extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    set menuClickEvent(event) {
        this._menuClickEvent = event;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            :host {
                display: block;
                width: 100%;
                background-color: cornflowerblue;
                color: white;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            }
            h2 {
                padding: 16px;
            }
            #menuButton {
                cursor: pointer;
            }
        </style>
        <h2><span id="menuButton">☰ </span>Movie Finder</h2>`;

        this.shadowDOM.querySelector("#menuButton").addEventListener("click", this._menuClickEvent);
    }
}

customElements.define("app-bar", AppBar);