import bgprofileImg from '../../images/bgprofile.png';
import homeImg from '../../images/home.png';
import indraImg from '../../images/indra.png';
import infoImg from '../../images/info.png';
import logoutImg from '../../images/logout.png';
import settingsImg from '../../images/settings.png';
class SideBar extends HTMLElement {

  constructor() {
    super();
    this._clientX = 0;
    this._closeSide = true;
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  get boolCloseSide() {
    return this._closeSide;
  }

  openSideBar() {
    this._closeSide = false;
    if (this._sideBar.className.split(" ").indexOf("active") == -1) {
      this._sideBar.style.left = "0px";
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
        <div id="overlay"></div>
        <div id="sidebar">
            <div class="sidebar-header" style="background-image: url(${bgprofileImg})">
            <div class="sidebar-image">
                <img src="${indraImg}" alt="profile" height="50" width="50">
                <p id="profil_nama" class="nama">Indra Mahkota</p>
                <p id="profil_email" class="email">indramahkota1@gmail.com</p>
            </div>
            </div>
            <div class="menusatu">
            <a id="target1" class="aktif">
                <img src="${homeImg}" alt="home" height="20" width="20">
                Halaman Utama
            </a>
            <a id="target2">
                <img src="${settingsImg}" alt="settings" height="20" width="20">
                Pengaturan
            </a>
            <a id="target3">
                <img src="${infoImg}" alt="info" height="20" width="20">
                Tentang
            </a>
            </div>
            <div id="tombolkeluar" class="menudua">
            <a class="aktif">
                <img src="${logoutImg}" alt="logout" height="20" width="20">
                Keluar
            </a>
            </div>
        </div>`;

    this._sideBar = this.shadowDOM.querySelector("#sidebar");
    this._overlay = this.shadowDOM.querySelector("#overlay");

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
        if (num > -125 && num < 0) this._sideBar.style.left = "0px";
        else {
          this._sideBar.style.left = "-250px";
          setTimeout(() => this.removeOverlay(), 350);
        }
      }
    }, {
      passive: true
    });
  }
}

customElements.define("side-bar", SideBar);