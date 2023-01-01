import React, { useState, useEffect } from "react";
import LekkiApartment from "../../../images/lekki.jpg";
import LagosApartment from "../../../images/lagos.jpg";
import Apartment from "../../../images/apartment.jfif";
import Typewriter from "typewriter-effect";

import { Link, Navigate, useNavigate } from "react-router-dom";
import "./styles.css";
import { setListing } from "../../../Contexts/SearchContext";
import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { createProperty } from "../../../actions/property";

const Banner = () => {
  const [location, setLocation] = useState("");
  const [room, setRoom] = useState("");
  const [property, setProperty] = useState("");
  const [tab, setTab] = useState(0);
  const [listing, setListing] = useState("");
  let [count, setCount] = useState(0);
  const navigate = useNavigate();
  let [nav, setNav] = useState([]);
  const dispatch = useDispatch()

  var typewriter = new Typewriter(null, {
    loop: true,
    delay: 75,
  });

  const handleLocation = () => {
    return <h1 className="animated fadeInUp text-white">{count}</h1>;
  };
  useEffect(() => {
    handleLocation();
  }, [count]);
  useEffect(() => {
    if (tab === 0) {
      setListing("sale");
    } else {
      setListing("rent");
    }
  }, [tab]);

  const handleTab = (tab) => {
    setTab(tab);
  };

  const handleLocationChange = (e) => {
    if (e.target.value === "default") {
      setLocation("");
    } else {
      setLocation(e.target.value);
    }
  };
  const handleRoomChange = (e) => {
    if (e.target.value === "default") {
      setRoom("");
    } else {
      setRoom(e.target.value);
    }
  };
  const handlePropertyChange = (e) => {
    if (e.target.value === "default") {
      setProperty("");
    } else {
      setProperty(e.target.value);
    }
  };
  let [pathArr, setPathArr] = useState([]);

  const handleGoBtn = () => {
    let path = "/properties?sortBy=PRICE&sortAscending=true";
    let pathExt =
      `&listing=${listing}` +
      (`${location && `&location=${location}`}` || "") +
      (`${property && `&type=${property}`}` || "") +
      (`${room && `&room=${room}`}` || "");

    navigate(`${path} + ${pathExt}`);
  };

  useEffect(() => {
    let path = [];

    path =
      `&listing=${listing}` +
      (`${location && `&location=${location}`}` || "") +
      (`${property && `&type=${property}`}` || "") +
      (`${room && `&room=${room}`}` || "");

    console.log("path", path);
  }, [location, property, room, listing]);

  // http://localhost:3000/properties?
  // sortBy=PRICE&
  // sortAscending=true&
  // room=1%20bedroom&
  // listing=rent
  // &type=apartment
  // &location=ibadan

  console.log("select", location, room, property, listing);

  const handleProperty = () => {
    dispatch(createProperty())
  }

  return (
    <div
      id="carouselExampleCaptions"
      class="carousel slide banner"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleCaptions"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item card active text-white">
          <img src={LekkiApartment} class="card-img d-block w-100" alt="..." />

          {/* <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div> */}
        </div>
        <div class="carousel-item">
          <img src={LagosApartment} class="d-block w-100" alt="..." />

          {/* <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div> */}
        </div>
        <div class="carousel-item ">
          <img src={Apartment} class="d-block w-100" alt="..." />

          {/* <div class="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div> */}
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-target="#carouselExampleCaptions"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-target="#carouselExampleCaptions"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </button>
      <div class="card-img-overlay d-flex justify-content-center flex-column align-items-center text-black px-2">
   
        <Grid container sm={6} xs={12} mb={3}>
            <Grid sm={6} xs={12} container alignItems="center" pb={2}>
              <p class="mb-1 " style={{ whiteSpace: "nowrap", color:'#cbe36b' }}>
                Get??
              </p>
&nbsp;
              <div>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("<h1>Land</h1>")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("<h1 style={{display:'block'}}>Property</h1>")
                      .start();
                  }}
                />
              </div>
            </Grid>
            <Grid sm={6} xs={12} container alignItems="center">
              &nbsp;
              <p class="mb-1 " md={12} style={{ whiteSpace: "nowrap", color:'#cbe36b' }}>
                Where??
              </p>
              &nbsp;
              <Typewriter
                style={{ display: "inline-block" }}
                options={{
                  strings: [
                    "<h1 >Lagos</h1>",
                    "<h1>Abuja</h1>",
                    "<h1>Ibadan</h1>",
                    "<h1>Anywhere In Nigeria</h1>",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 375,
                }}
              />
            </Grid>
          </Grid>
        <div className="pb-3">
          <p className="text-white">
            We bring you the most affordable housing deals in the best locations
            within Nigeria{" "}
          </p>
          <p className="text-white" style={{ zIndex: "10" }}>
            Find Your Match Below OR{" "}
            <Link to="/" style={{ color: "yellow", zIndex: "10" }}>
              Learn More{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-up-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
                />
              </svg>
            </Link>
          </p>
        </div>

        <div class="card banner-card mt-2 p-4">
          {/* <h5 class="card-title">Card title</h5> */}
          <ul class="nav nav-pills pb-2">
            <li class="nav-item">
              <a
                class={`nav-link ${tab === 0 ? "active" : ""}`}
                onClick={() => handleTab(0)}
                aria-current="page"
                href="#"
              >
                Buy
              </a>
            </li>
            <li class="nav-item">
              <a
                onClick={() => handleTab(1)}
                class={`nav-link ${tab === 1 ? "active" : ""}`}
                href="#"
              >
                Rent
              </a>
            </li>
          </ul>
          <hr />


          <form class="row gx-3 gy-2 align-items-end">
            <div class="col-md-3 col-xs-12 col-sm-6  banner-search-input">
              <label class="visually-hidden" for="specificSizeSelect">
                Location
              </label>
              <div class="input-group banner-select">
                <div class="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-geo-alt"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </div>

                <select
                  onChange={handleLocationChange}
                  class="form-select col-xs-12"
                  id="specificSizeSelect"
                >
                  <option selected value="default">
                    Choose...
                  </option>
                  <option value="lagos">Lagos</option>
                  <option value="ibadan">Ibadan</option>
                  <option value="abuja">Abuja</option>
                </select>
              </div>
            </div>
            <div class="col-md-3 col-sm-6 banner-search-input">
              <label class="visually-hidden" for="specificSizeSelect">
                No of Rooms
              </label>
              <div class="input-group banner-select">
                <div class="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-door-open"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                    <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
                  </svg>
                </div>

                <select
                  onChange={handleRoomChange}
                  class="form-select col-xs-12"
                  id="specificSizeSelect"
                >
                  <option selected value="default">
                    Choose..
                  </option>

                  <option value="1%20bedroom">1 Bedroom</option>
                  <option value="2%20bedroom">2 Bedroom</option>
                  <option value="3%20bedroom">3 Bedroom</option>
                  <option value="4%20bedroom">4 Bedroom</option>
                  <option value="mini%20flat">Mini Flat</option>
                </select>
              </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12 banner-search-input">
              <label class="visually-hidden" for="specificSizeSelect">
                Property
              </label>
              <div class="input-group banner-select col-xs-12">
                <div class="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-house-door"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                  </svg>
                </div>

                <select
                  onChange={handlePropertyChange}
                  class="form-select"
                  id="specificSizeSelect"
                >
                  <option selected value="default">
                    Choose...
                  </option>
                  <option value="apartment">Apartment</option>
                  <option value="land">Land</option>
                </select>
              </div>
            </div>

            <div class="col-md-3 col-sm-6 col-12 ml-0 banner-search-input">
              <button
                type="submit"
                class="btn btn-primary btn-go"
                onClick={handleGoBtn}
                disabled={
                  !location &&
                  !room &&
                  !property
                    ? true
                    : false
                }
              >
                GO
              </button>
            </div>
          </form>
        </div>

      </div>
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Banner;
