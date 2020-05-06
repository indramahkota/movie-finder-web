const settings = () => {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    const cardElement = document.createElement("card-item");
    cardElement.data = {
        title: "Pengaturan",
        overview: "Fitur belum tersedia"
    }
    mainElement.appendChild(cardElement);
}

export default settings;