import { Grid } from "@mui/material";
import moment from "moment";
import React from "react";
import { useState } from "react";
import FileUpload from "../../Components/FileUpload";
import Overlay from "../../Components/Overlay";
import { user } from "../../constants/data";
import ShareIcon from "@mui/icons-material/Share";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import "./styles.css";
import TooltipWrapper from "../../Components/Tooltip";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useLocation, useParams } from "react-router-dom";
import AccountMenu from "../../Components/AccountMenu";
import Header from "../../Components/Header";




const Account = () => {
  const [show, setShow] = useState();
  const [altShow, setAltShow] = useState();
  const [toggleShow, setToggleShow] = useState(false);
  const [clicked, setClicked] = useState();
  
  const { id } = useParams();
  
  //   const user = JSON.parse(localStorage.getItem('profile'))
  const text = 'check out this account on IleNla'
  const url = `https://ilenla.io/${user?.id}`

  
  const handleShowOverlay = () => {
    setShow(true);
  };
  const handleHideOverlay = () => {
    setShow(false);
  };
  const handlePhotoShowOverlay = () => {
    setAltShow(true);
    setShow(false);
  };
  const handlePhotoHideOverlay = () => {
    setAltShow(false);
    setShow(true);
  };
  const handleToggle = (index) => {
    if (clicked == index) {
      setToggleShow(!toggleShow);
      setClicked(index);
    } else {
      setToggleShow(true);
      setClicked(index);
    }
  };

  console.log(toggleShow);
  return (
    <div>
      <Header/>
      <Grid
        sm={12}
        className="accountBanner"
        onMouseEnter={handleShowOverlay}
        onMouseLeave={handleHideOverlay}
      >
        <FileUpload />
        {show}
        {show && <Overlay />}
        <Grid
          className="accountPhoto"
          onMouseEnter={handlePhotoShowOverlay}
          onMouseLeave={handlePhotoHideOverlay}
        >
          <FileUpload />
          {altShow && <Overlay />}
        </Grid>
      </Grid>
      <Grid p={5} className='accountContainer'>
        <Grid container sm={12} pt={5} className='accountHeadlineRow'>
          <Grid container flexDirection="column" sm={6}>
            <h2>{user.username || "Unnamed"}</h2>
            {/* MMM MMMM */}
            Joined {moment(user?.createdAt).format("MMMM  YYYY")}
          </Grid>
          <Grid container sm={6} justifyContent="flex-end">
            <Grid className="socialIcon">
              <TooltipWrapper value="Twitter">
                <a href={user?.socialHandle?.twitter} target="_blank">
                  <TwitterIcon />
                </a>
              </TooltipWrapper>
            </Grid>
            
            <Grid ml={5} className="socialIcon">
              <TooltipWrapper value="Instagram">
                <a href={user?.socialHandle?.instagram} target="_blank">
                  <InstagramIcon />
                </a>

                {/* <a href={user?.socialHandle[0]?.facebook} target="_blank">
                </a> */}
              </TooltipWrapper>
            </Grid>

            <Grid
              ml={5}
              className="accountShareIcon"
              onClick={() => handleToggle(1)}
            >
              <TooltipWrapper value="Share">
                <ShareIcon />
              </TooltipWrapper>
              {toggleShow && clicked == 1 && (
                <Grid className="toggleMenu">
                  <ul>
                    <li>
                      <LinkIcon />
                      &nbsp; Copy Link
                    </li>
                    <li>
                      {/* <a target='_blank' href='https://twitter.com/intent/tweet?text=Check%20out%20this%20account%20on%20OpenSea&url=https%3A%2F%2Fopensea.io%2F0x60c5619FEB40276e78cCCdb099C5c2908E62b998&via=opensea&original_referer=https://opensea.io/account?tab=collected'> */}
                      
                      <a
                        target="_blank"
                        href={`https://www.facebook.com/sharer/sharer.php?u=https://ilenla.io/${user?.id}`}
                      >
                        <FacebookIcon />
                        &nbsp; Share on Facebook
                      </a>
                    </li>
                    <li>
                    <a
                        target="_blank"
                        href={`https://twitter.com/intent/tweet?text=${text}&url=${url}&via=ilenla&original_referer=https://ilenla.io/account`}
                      >
                      <TwitterIcon />
                      &nbsp; Share on Twitter
                      </a>
                    </li>
                  </ul>
                </Grid>
              )}
            </Grid>
            <Grid ml={5} className="moreIcon" onClick={() => handleToggle(2)}>
              <MoreHoriz />
              {toggleShow && clicked == 2 && (
                <Grid className="toggleMenu">
                  <ul>
                    {id ? (
                      <>
                        {user?.id !== id ? (
                          <li>
                            <TwitterIcon /> &nbsp; Rate
                          </li>
                        ) : (
                          <li>
                            <a href="/account/settings">
                              <SettingsIcon />
                              &nbsp; Settings
                            </a>
                          </li>
                        )}
                      </>
                    ) : (
                      <>
                        {user && (
                          <li>
                            <a href="/settings">
                              <SettingsIcon />
                              &nbsp; Settings
                            </a>
                          </li>
                        )}
                      </>
                    )}
                    <li>
                    <a href="/report">

                      <FlagIcon /> &nbsp;Report
                      </a>
                    </li>
                  </ul>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AccountMenu/>
     
    </div>
  );
};

export default Account;
