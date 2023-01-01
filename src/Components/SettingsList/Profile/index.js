import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import InfoIcon from "@mui/icons-material/Info";
import Input from "../../CustomInput/Input";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileUpload from "../../FileUpload";
import Overlay from "../../Overlay";

import "./styles.css";
import TooltipWrapper from "../../Tooltip";
const initialState = {
  name: "",
  phone: "",
  password: "",
  confirmPassword: "",
  email: "",
  referrer: "",
};

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [altShow, setAltShow] = useState();
  const [toggleShow, setToggleShow] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const handleSubmit = () => {};

  const handleChange = () => {};
  const handleShowPassword = () => {};
  const handleWalletCopy = () => {
    console.log("wallet");
  };

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
  return (
    <Grid>
      <h1>Profile Details</h1>

      <form onSubmit={handleSubmit}>
        <Grid
          pt={5}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid sm={6}>
            <Grid spacing={2}>
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <br />
              <Input
                name="username"
                label="Enter Username"
                handleChange={handleChange}
              />
              <br />

              <>
                {" "}
                <Input
                  name="phone"
                  label="Mobile Phone"
                  onChange={handleChange}
                  type="tel"
                />
                <br />
              </>
              <Input
                name="Bio"
                label="Enter Bio"
                rows={4}
                handleChange={handleChange}
                multiline
              />
              <br />

              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                required={true}
              />
            </Grid>
            <Grid py={2}>
              <Grid className="bold">Social Media Connections</Grid>
              <span style={{ display: "block" }}>
                {" "}
                Help buyers verify your account by connecting Twitter
              </span>

              <br />

              <Grid container justifyContent="space-between">
                <Grid xs={6} container alignItems="center">
                  <TwitterIcon /> &nbsp; twitter
                </Grid>
                <Grid xs={6}>
                  <Button type="submit" variant="contained" color="primary">
                    Connect
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid py={2}>
              <Grid className="bold">Links</Grid>
              {/* <span style={{display:'block'}}> Help buyers verify your account by connecting Twitter</span> */}

              <br />

              <Grid container alignItems="center">
                <Input
                  name="social"
                  label="Instagram Handle"
                  handleChange={handleChange}
                />
              </Grid>
              <Grid py={1}>
                <Input
                  name="website"
                  label="Website"
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid pb={2}>
              <Grid className="bold">Wallet Address</Grid>
              {/* <span style={{display:'block'}}> Help buyers verify your account by connecting Twitter</span> */}

              <br />

              <Grid
                container
                alignItems="center"
                style={{ cursor: "pointer !Important" }}
              >
                <TextField
                  name="wallet"
                  id="standard-read-only-input"
                  type="button"
                  variant="outlined"
                  onClick={handleWalletCopy}
                  className="wallet"
                  defaultValue="0x..."
                  style={{ cursor: "pointer !Important" }}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <ContentCopyIcon />
                      </InputAdornment>
                    ),
                  }}
                  //   onClick={handleCopy}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid sm={4}>
            <Grid className="bold" pt={4} pb={1}>
              Profile Banner{" "}
              <TooltipWrapper
                value={`Recommended 1400px by 350px` + " " + "MaxSize:10MB"}
              >
                <InfoIcon />
              </TooltipWrapper>
            </Grid>

            <Grid
              className="profile"
              onMouseEnter={handleShowOverlay}
              onMouseLeave={handleHideOverlay}
            >
              <FileUpload />
              {show}
              {show && <Overlay />}
            </Grid>
            <Grid>
              <Grid className="bold" pt={4} pb={1}>
                Profile Photo{" "}
                <TooltipWrapper
                  value={`Recommended 1400px by 350px` + " " + "MaxSize:10MB"}
                >
                  <InfoIcon />
                </TooltipWrapper>
              </Grid>

              <Grid
                className="photo"
                onMouseEnter={handlePhotoShowOverlay}
                onMouseLeave={handlePhotoHideOverlay}
              >
                <FileUpload />
                {altShow && <Overlay />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid pt={3} mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Grid>

        <Grid
          container
          justifyContent="space-between"
          className="loginControl"
        ></Grid>
      </form>
    </Grid>
  );
};

export default Profile;
