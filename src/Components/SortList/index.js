import React, { useContext } from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./styles.css";
import { POST_SORT_DATA } from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { setSortList, ToggleContext } from "../../Contexts/ToggleContext";
import {
  setSortAscending,
  setSortBy,
  SortContext,
} from "../../Contexts/SortContext";

const SortList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggle } = useContext(ToggleContext);
  const { sort , dispatch} = useContext(SortContext);
  const { sortBy, sortAscending } = sort;
  const sortData = useSelector((state) => state.chipData.sortData);

  console.log('sort', sort)

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const [propertyBarShow, setPropertyBarShow] = useState(true);
  const [value, setValue] = useState("");
  // const dispatch = useDispatch();

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
    if (screenSize.dynamicWidth < 700) {
      setPropertyBarShow(false);
    } else {
      return;
    }
  }, [screenSize]);

  function getParams(url = window.location) {
    let params = {};
    new URL(url).searchParams.forEach(function (val, key) {
      if (params[key] !== undefined) {
        if (!Array.isArray(params[key])) {
          params[key] = [params[key]];
        }
        params[key].push(val);
      } else {
        params[key] = val;
      }
    });
    return params;
  }
  let params = getParams(window.location);

  const [sortVal, setSortVal] = useState("lth");

  console.log('sa', (sortAscending === true ? 'true' : 'false'))
  const handleChange = (event) => {
    setSortVal(event.target.value) || setValue(event.target.value);

    switch (event.target.value) {
      case "lth":
        dispatch(setSortAscending(true));
        dispatch(setSortBy("PRICE"));
        pathFn("PRICE", true);
        break;
      case "htl":
        dispatch(setSortAscending(false));
        dispatch(setSortBy("PRICE"));
        pathFn('PRICE', false);

        break;
      case "createdDate":
        // dispatch(setSortAscending(sortAscending));
        dispatch(setSortBy("CREATED_DATE"));
        pathFn("CREATED_DATE", sortAscending);

        break;
      case "roomsCount":
        // dispatch(setSortAscending(false));
        dispatch(setSortBy("ROOMS_COUNT"));
        pathFn("ROOMS_COUNT", sortAscending);

        break;
      case "viewerCount":
        // dispatch(setSortAscending(false));
        dispatch(setSortBy("VIEWER_COUNT"));
        pathFn("VIEWER_COUNT", sortAscending);

        break;

      case "favoriteCount":
        // dispatch(setSortAscending(false));
        dispatch(setSortBy("FAVORITE_COUNT"));
        pathFn("FAVORITE_COUNT", sortAscending);

        break;

      default:
        break;
    }
  };

  const pathFn = (sortBy, sortAscending) => {
    if (Object.entries(params).length >= 1) {
      if (Object.entries(params).slice(2).length > 0) {
        console.log(Object.entries(params));
        let path = [];
        Object.entries(params)
          .slice(2)
          .map((data, index) => {
            if (Array.isArray(data[1])) {
              data[1].flat(Infinity).map((param, index) => {
                path.push((data[0] = `${param}`));
                console.log(path.join("&"));
              });
            } else {
              path.push(`${data[0]}=${data[1]}`);
              console.log(path);
              console.log(path.join("&"));
              navigate(
                `${
                  location.pathname
                }?sortBy=${sortBy}&sortAscending=${sortAscending}&${path.join(
                  "&"
                )}`
              );
            }
          });
        // navigate(`/properties?sortBy=${sortBy}&sortAscending=${sortAscending}`)
      } else {
        console.log("Not greater than zero");
        navigate(
          `${location.pathname}?sortBy=${sortBy}&sortAscending=${sortAscending}`
        );
      }

      // navigate(`/properties?sortBy=${sortBy}&sortAscending=${sortAscending}`)
    } else {
      console.log("false");

      navigate(
        `${location.pathname}?sortBy=${sortBy}&sortAscending=${sortAscending}`
      );
    }
  };
  const handleSortListClose = () => {
    dispatch(setSortList(false));
  };
  console.log(sortBy);
  console.log("six",sortAscending);
  useEffect(() => {
    let data = Object.entries(params).slice(0, 2);
    dispatch({ type: POST_SORT_DATA, payload: data });
  }, [window.location.href]);

  console.log("sortDatalist", sortData);

  return (
    <>
      {propertyBarShow ? (
        <Grid container sm={3}>
          <Grid container item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="sortInput"
                value={sortVal}
                label="Sort By"
                onChange={handleChange}
              >
                <MenuItem value="lth">Price:Low To High</MenuItem>
                <MenuItem value="htl">Price:High To Low</MenuItem>
                <MenuItem value="createdDate">Recently Created</MenuItem>
                <MenuItem value="roomsCount">No of Rooms</MenuItem>
                <MenuItem value="viewerCount">Most Viewed</MenuItem>
                <MenuItem value="favoriteCount">Most Favorited</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <>
          {toggle.isSortListOpen && (
            <Grid className="sortListResp">
              <>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  py={2}
                >
                  <Grid className="filterHero">Sort By</Grid>
                  <Grid onClick={handleSortListClose}>
                    <CancelPresentationIcon />
                  </Grid>
                </Grid>
                <hr />
              </>
              <RadioGroup value={value} onChange={handleChange}>
                <Grid className="sortListHover">
                  <FormControlLabel
                    className="sortListOption"
                    value="lth"
                    label="Price:Low To High"
                    labelPlacement="start"
                    control={<Radio />}
                  />
                </Grid>
                <Grid className="sortListHover">
                  <FormControlLabel
                    className="sortListOption"
                    value="htl"
                    label="Price:High To Low"
                    labelPlacement="start"
                    control={<Radio />}
                  />
                </Grid>
                <Grid className="sortListHover">
                  <FormControlLabel
                    className="sortListOption"
                    value="createdDate"
                    label="Recently Created"
                    labelPlacement="start"
                    control={<Radio />}
                  />
                </Grid>

                <Grid className="sortListHover">
                  <FormControlLabel
                    className="sortListOption"
                    value="roomsCount"
                    label="No of Rooms"
                    labelPlacement="start"
                    control={<Radio />}
                  />
                </Grid>

                <Grid className="sortListHover">
                  <FormControlLabel
                    className="sortListOption"
                    value="viewerCount"
                    label="Most Viewed"
                    labelPlacement="start"
                    control={<Radio />}
                  />
                </Grid>

                <Grid className="sortListHover">
                  <FormControlLabel
                    className="sortListOption"
                    value="favoriteCount"
                    label="Most Favorited"
                    labelPlacement="start"
                    control={<Radio />}
                  />
                </Grid>
              </RadioGroup>
              <Grid
                style={{
                  position: "fixed",
                  left: "0",
                  bottom: "0",
                  width: "100%",
                  padding: "20px",
                  zIndex: "140",
                  background: "white",
                }}
              >
                <hr />
                <Grid
                  sm={12}
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  py={2}
                >
                  <Grid xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleSortListClose}
                      fullWidth
                    >
                      Done
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </>
      )}{" "}
    </>
  );
};

export default SortList;
