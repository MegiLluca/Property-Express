class Header extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between px-3 mb-4 border-bottom bg-dark text-warning" style="background-color: black!important;">
            <a href="index.html" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-warning text-decoration-none">
                <img src="image/express.png" alt="Property-Express" style="width: 100px; height: 100px;">
            </a>

            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="index.html" class="nav-link px-2 link-warning">Home</a></li>
                <li><a href="#" class="nav-link px-2 link-warning">Search</a></li>
                <li><a href="#" class="nav-link px-2 link-warning">FAQs</a></li>
                <li><a href="profile.html" class="nav-link px-2 link-warning">Profile</a></li>
            </ul>

            <div class="col-md-3 text-end">
                <button type="button" class="btn btn-outline-warning me-2">
                    <a href="login.html" class="text-warning">Login</a>
                </button>
                <button type="button" class="btn btn-warning">
                    <a href="register.html" class="text-white">Sign-up</a>
                </button>
            </div>
        </header>
        `;
    }
}
customElements.define('header-component', Header);