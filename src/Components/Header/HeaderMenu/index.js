import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { useRef } from "react";
import { LOG_OUT } from "../../../constants/actionTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const HeaderMenu = ({ respScreen }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [show, setShow] = useState(false);
  const menuRef = useRef();

  const navigate = useNavigate()
  const dispatch = useDispatch();


  const handleShowProfileMenu = () => {
    setShow(true);
  };
  const handleHideProfileMenu = () => {
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: LOG_OUT });
    // navigate(-1);
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
                        <Button  className='logout'  onClick={handleLogout}>
                          <LoginIcon /> Logout
                        </Button>
                      </li>
                    </ul>
                  </Grid>
                )}
              </li>
              <li>
                <a href="#" style={{color:'#f7996ce3'}}  onClick={handleLogout}>
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
