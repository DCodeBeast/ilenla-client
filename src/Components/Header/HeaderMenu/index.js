import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { Grid } from "@mui/material";
import { useRef } from "react";

const HeaderMenu = ({ respScreen }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [show, setShow] = useState(false);
  const menuRef = useRef();

  const handleShowProfileMenu = () => {
    setShow(true);
  };
  const handleHideProfileMenu = () => {
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  return (
    <ul className={respScreen ? "headerRespMenu" : "headerMenu"}>
      <li>
        <a href="/properties">Explore Properties</a>
      </li>
      <li>
        <a href="/property-listing">List Property</a>
      </li>
      {respScreen ? (
        <>
          {user ? (
            <>
              <li>
                <a href="/account">Profile</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login">
                  Login <LoginIcon />
                </a>
              </li>
            </>
          )}
        </>
      ) : (
        <>
          {user ? (
            <>
              <li
                className="profileIcon"
                onMouseLeave={handleHideProfileMenu}
                onMouseEnter={handleShowProfileMenu}
                style={{ position: "relative" }}
              >
                <a
                  className={`profileSvg ${show ? "profileSvgBorder" : ""}`}
                  href="#"
                >
                  <AccountCircleIcon />
                </a>
                {show && (
                  <Grid
                    className="profileMenu"
                    onMouseEnter={handleShowProfileMenu}
                  >
                    <ul className="profileList">
                      {" "}
                      <li>
                        <a href="/account">
                          <PersonIcon /> Profile
                        </a>
                      </li>
                      <li>
                        <a href="/properties">
                          <FavoriteIcon /> Favourites
                        </a>
                      </li>
                      <li>
                        <a href="/properties">
                          <HomeIcon />
                          My Properties
                        </a>
                      </li>
                      <li>
                        <a href="/settings">
                          <SettingsIcon />
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="/logout"  className='logout'>
                          <LoginIcon /> Logout
                        </a>
                      </li>
                    </ul>
                  </Grid>
                )}
              </li>
              <li>
                <a href="/logout" style={{color:'#f7996ce3'}}>
                  Logout <LoginIcon />
                </a>
              </li>
            </>
          ) : (
            <li>
              <a href="/login">
                Login <LoginIcon />
              </a>
            </li>
          )}
        </>
      )}
    </ul>
  );
};

export default HeaderMenu;
