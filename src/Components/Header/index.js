import React from "react";
import { Grid } from "@mui/material";
import "./styles.css";
import HeaderMenu from "./HeaderMenu";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useEffect } from "react";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UndoIcon from '@mui/icons-material/Undo';
import { LOG_OUT } from "../../constants/actionTypes";

import {
  useMenuContext,
  showMenu,
  hideMenu,
  clearAll
} from "../../Contexts/MenuContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const [respScreen, setRespScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [show, setShow] = useState(false);
  const { items,  dispatch } = useMenuContext();
  const navigate = useNavigate()
  // const [settingsMenu, setSettingsMenu] = useState("");
  const handleShowProfileMenu = () => {
    setShow(true);
  };
  const handleHideProfileMenu = () => {
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  useEffect(() => {
    if (screenSize.dynamicWidth < 600) {
      setRespScreen(true);
    } else {
      return;
    }
  }, [screenSize]);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSettingsMenu = (e) => {
    e.preventDefault()
    setIsSettingsOpen(true);
  };
  const handleMainMenu = (e) => {
    e.preventDefault()
    setIsSettingsOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: LOG_OUT });
    navigate(-1);
  };
console.log("set",items)
  return (
    <Grid className="headerContainer">
      <Grid
        py={2}
        pr={3}
        pl={5}
        className="headerContainer"
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid sm={3} xs={3}>
          <a href='/'>
          IleNla

          </a>
        </Grid>
        <Grid
          md={6}
          xs={9}
          container
          alignItems="end"
          justifyContent="flex-end"
        >
          <>
            {respScreen ? (
              <>
                {user ? (
                  <>
                    {/* <a href="/account" style={{ color: "white" }}>
                      <MoreHorizIcon />
                    </a>{" "} */}
                    <Grid
                // className="profileIcon"
                style={{ position: "relative", width:'30px' }}
                    container 
                    justifyContent='center'
                    alignItems='center'
                     onMouseLeave={handleHideProfileMenu}
                     onMouseEnter={handleShowProfileMenu}
                   
                    >
                    <a
                      className={`profileSvg ${show ? "profileSvgBorder" : ""}`}
                      href="#"
                     
                     
                    >
                      <AccountCircleIcon />
                    </a>
                    {show && (
                      <>
                    
                      {items.settingsMenu ?  
                      <Grid
                    className="profileMenu"
                   
                    // onMouseLeave={handleHideProfileMenu}
                    onMouseEnter={handleShowProfileMenu}
                  >
                    <ul className="profileList">
                      {" "}
                      <li>
                        <Grid style={{cursor:'pointer'}}
                        //  onClick={handleMainMenu}
                        onClick={() => dispatch(hideMenu())}

                         >
                        <UndoIcon/> Back To Main Menu 

                        </Grid>
                        <br/>
                        <br/>
                        SETTINGS
                    
                      </li>

                      <li>
                        
                        <a href="/settings?tab=profile" style={{borderTop:'1px solid gray'}}>
                          <PersonIcon /> Profile
                        </a>
                      </li>
                      <li>
                        <a href="/settings?tab=notifications">
                          <FavoriteIcon /> Notifications
                        </a>
                      </li>
                      <li>
                        <a href="/settings?tab=offers">
                          <HomeIcon />
                         Offers
                        </a>
                      </li>
                      <li >
                        <a href="settings?tab=verifications">
                          <SettingsIcon />
                          Verifications 
                        </a>
                      </li>
                      <li >
                        <a href="settings?tab=account-support">
                          <SettingsIcon />
                          Account Support 
                        </a>
                      </li>
                      <li >
                        <a href="settings?tab=earnings">
                          <SettingsIcon />
                          Earnings 
                        </a>
                      </li>
                    
                    </ul>
                  </Grid> : 
                    
                      
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
                      <li >
                        <a href="#" 
                        // onClick={handleSettingsMenu}
                        onClick={(e) => dispatch(showMenu(e))}
                        >
                          <SettingsIcon />
                          Settings <NavigateNextIcon/>
                        </a>
                      </li>
                      <li>
                        <a href="#"  className='logout'
                          onClick={handleLogout}
                        >
                          <LoginIcon /> Logout
                        </a>
                      </li>
                    </ul>
                  </Grid>}
                  </>
                )}
                    </Grid>
             
                    &nbsp;&nbsp;
                    <a href="#" style={{ color: "#f7996ce3" }}  onClick={handleLogout}>
                      Logout <LoginIcon />
                    </a>
                  </>
                ) : (
                  <>
                    <a>
                      Login <LoginIcon />
                    </a>
                    &nbsp;&nbsp;
                  </>
                )}{" "}&nbsp;&nbsp;
                {!isOpen ? (
                  <MenuIcon className="headerIcon" onClick={handleOpen} />
                ) : (
                  <CloseIcon className="headerIcon" onClick={handleClose} />
                )}
              </>
            ) : (
              <HeaderMenu />
            )}
          </>
        </Grid>
      </Grid>
      {isOpen && (
        <Grid className="headerRespMenuContainer">
          <HeaderMenu respScreen={respScreen} />
        </Grid>
      )}
    </Grid>
  );
};

export default Header;
