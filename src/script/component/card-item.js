class CardItem extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    set data(data) {
        this._data = data;
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
                    margin-bottom: 18px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                    overflow: hidden;
                }
                .card-data {
                    padding: 24px;
                }
                .card-data > h2 {
                    font-weight: lighter;
                }
                .card-data > p {
                    margin-top: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 10; /* number of lines to show */
                }
            </style>
            <div class="card-data">
                <h2>${this._data.title}</h2>
                <p>${this._data.overview}</p>
            </div>`;
    }
}

customElements.define("card-item", CardItem);