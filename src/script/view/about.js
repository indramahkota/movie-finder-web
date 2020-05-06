import '../component/card-item.js';

const about = () => {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    const cardElement = document.createElement("card-item");
    cardElement.data = {
        title: "Tentang",
        overview: "Fitur belum tersedia"
    }
    mainElement.appendChild(cardElement);
}

export default about;