import React from "react";

const Navbar = () => {
  return (
    <nav class="navbar navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div class=" container bg-light">
        <div class="row container justify-content-between">
          <div class="col">
            <a class="navbar-brand" href="/">
              IleNLA
            </a>
          </div>
          <div class=" col d-flex justify-content-end">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/properties">
                    All Properties
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    About Us
                  </a>
                </li>
               
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
