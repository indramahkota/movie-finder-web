class SideBar extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
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
          #sidebar {
            position: fixed;
            top: 0;
            left: -250px;
            width: 250px;
            height: 100vh;
            z-index: 999;
            background: white;
            transition: all 0.3s;
            overflow-y: scroll;
            box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
          }
          #sidebar.active {
            left: 0px;
          }
          #sidebar a {
            display: flex;
            align-items: center;
            padding-left: 5px;
            line-height: 50px;
            cursor: pointer;
            color: #000000;
          }
          #sidebar a:link,
          a:visited {
            color: #444;
          }
          .menusatu {
            border-bottom: 1px solid #ddd;
          }
          .menusatu a img {
            margin: 15px;
          }
          .menusatu .aktif {
            border-left: 2px solid red;
            background-color: rgba(255, 133, 50, 0.12);
          }
          .menudua a img {
            margin: 15px;
          }
          .sidebar-header {
            height: 145px;
            background-repeat: no-repeat;
            background-position: center center;
          }
          .sidebar-image .nama {
            position: absolute;
            top: 80px;
            left: 10px;
            color: white;
          }
          .sidebar-image .email {
            position: absolute;
            top: 100px;
            left: 10px;
            color: white;
          }
          .sidebar-header img {
            position: absolute;
            top: 20px;
            left: 10px;
          }
          #content {
            max-width: 600px;
          }
          #asideprofile {
            max-width: 400px;
          }
          #overlay {
            display: none;
            position: fixed;
            top: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.7);
            z-index: 998;
            opacity: 0;
          }
          #overlay.active {
            display: block;
            opacity: 1;
          }
          #loader-overlay {
            display: none;
            position: fixed;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.25);
            z-index: 1004;
            opacity: 0;
          }          
        </style>
        <div id="overlay" class="active"></div>
        <div id="sidebar" class="active">
            <div class="sidebar-header" style="background-image: url(../images/bgprofile.webp)">
            <div class="sidebar-image">
                <img src="../images/indra.webp" alt="profile" height="50" width="50">
                <p id="profil_nama" class="nama">Indra Mahkota</p>
                <p id="profil_email" class="email">indramahkota1@gmail.com</p>
            </div>
            </div>
            <div class="menusatu">
            <a id="target1" class="aktif">
                <img src="../images/home.webp" alt="home" height="20" width="20">
                Halaman Utama
            </a>
            <a id="target2">
                <img src="../images/settings.webp" alt="settings" height="20" width="20">
                Pengaturan
            </a>
            <a id="target3">
                <img src="../images/info.webp" alt="info" height="20" width="20">
                Tentang
            </a>
            </div>
            <div id="tombolkeluar" class="menudua">
            <a class="aktif">
                <img src="../images/logout.webp" alt="logout" height="20" width="20">
                Keluar
            </a>
            </div>
        </div>`;
    }
}

customElements.define("side-bar", SideBar);