import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Layout from "../../Components/Layout";
import Input from "../../Components/CustomInput/Input";
import Loader from "../../Components/Loader";
import "./styles.css";
const initialState = {
  name: "",
  phone: "",
  password: "",
  confirmPassword: "",
  email: "",
  referrer: "",
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const location = useLocation();

  const query = useQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ ...formData, referrer: query.get("user") });
  }, []);

  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsSignup(true);
    } else setIsSignup(false);
  }, [location]);

  console.log(isLoading);

  const handleSubmit = (e) => {
    e.preventDefault();

    //   if (isSignup) {
    //     dispatch(usersignup(formData, navigate));
    //   } else {
    //     dispatch(usersignin(formData, navigate));
    //   }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignup = () => {
    setIsSignup(true);
  };
  const handleLogin = () => {
    setIsSignup(false);
  };
  return (
    <Layout>
      <Grid className="pageOffset" pb={5}>
        <Grid
          p={5}
          md={4}
          className="loginContainer"
          textAlign="center"
          m="0 auto"
        >
          <Grid container md={12} fullWidth>
            <Grid
              item
              xs={6}
              textAlign="center"
              className={!isSignup ? "colorBg" : ""}
            >
              <Button onClick={handleLogin}>
                <Link to={"/login"}> Login</Link>
              </Button>
            </Grid>
            <Grid
              xs={6}
              textAlign="center"
              className={isSignup ? "colorBg" : ""}
            >
              <Button onClick={handleSignup}>
                <Link to={"/signup"}> Sign up</Link>
              </Button>
            </Grid>
          </Grid>
          <Grid py={2}>
            <Avatar style={{ textAlign: "center", margin: "0 auto" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">
              {isSignup ? "User Sign Up" : "User Sign In"}
            </Typography>
          </Grid>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                name="email"
                label="Email"
                handleChange={handleChange}
                type="email"
                required={true}
              />
              {isSignup && (
                <>
                  {" "}
                  <Input
                    name="phone"
                    label="Mobile Phone"
                    onChange={handleChange}
                    type="tel"
                 
                    quarter
                  />
                  <Input
                    name="name"
                    label="Name"
                    handleChange={handleChange}
                    twothird
                  />
                </>
              )}

              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                required={true}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                  required
                />
              )}
              {isSignup && (
                <Input
                  name="referrer"
                  label="Referrer Code (optional)"
                  handleChange={handleChange}
                  type="text"
                  value={formData.referrer}
                />
              )}
            </Grid>
            <Grid pt={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {isSignup ? (
                  isLoading ? (
                    <Loader />
                  ) : (
                    "Sign Up"
                  )
                ) : isLoading ? (
                  <Loader />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Grid>

            {/* <GoogleLogin
            clientId="57511145551-jofdo3npaipgfj4u8nkeh496jf526gbf.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
            <Grid container justifyContent="space-between" className='loginControl'>
              <Grid item>
                <Button onClick={switchMode}>
                  <Link to={`/${isSignup ? "login" : "signup"}`}>
                    {isSignup
                      ? "Already have an account? SIgn In"
                      : "Don't have an account? Sign Up"}
                  </Link>
                </Button>
              </Grid>
              {!isSignup && (
                <Grid item>
                  <Button onClick={switchMode}>
                    <Link to="/forgot-password">Forgot Password</Link>
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
