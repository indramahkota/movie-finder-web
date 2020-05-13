const settings = () => {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";

    const cardElement = document.createElement("card-item");
    mainElement.appendChild(cardElement);
    
    cardElement.data = {
        title: "Pengaturan",
        overview: "Fitur belum tersedia"
    }
}

export default settings;