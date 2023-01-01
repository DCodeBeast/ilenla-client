import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import {
  groupedOptions,
  locationOptions,
  typeOptions,
  listingOptions,
  roomOptions,
} from "./data";
import "./styles.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import {
  SearchContext,
  setListing,
  setLocation,
  setRooms,
  setType,
} from "../../Contexts/SearchContext";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const Search = () => {
  const [optionValue, setOptionValue] = useState();
  const [option, setOption] = useState();
  const location = useLocation();
  const { search, dispatch } = useContext(SearchContext);

  const navigate = useNavigate();
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
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const [propertyBarShow, setPropertyBarShow] = useState(true);

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

  const handleChange = (e) => {
    let selectedOption = "";
    locationOptions.find((location) => {
      if (location.value === e.value) {
        selectedOption = location.option;
        setOption(selectedOption);
      }
    }) ||
      typeOptions.find((type) => {
        if (type.value === e.value) {
          selectedOption = type.option;
          setOption(selectedOption);
        }
      }) ||
      listingOptions.find((listing) => {
        if (listing.value === e.value) {
          selectedOption = listing.option;

          setOption(selectedOption);
        }
      }) ||
      roomOptions.find((room) => {
        if (room.value === e.value) {
          selectedOption = room.option;

          setOption(selectedOption);
        }
      });

    setOptionValue(e.value);

    console.log("======event.target.valuesearch====");
    console.log(selectedOption);
    console.log(option);
    console.log(e.value);

    switch (selectedOption) {
      case "location":
        dispatch(setLocation(e.value));
        pathFn(selectedOption, e.value);
        break;
      case "type":
        dispatch(setType(e.value));

        pathFn(selectedOption, e.value);

        break;
      case "listing":
        dispatch(setListing(e.value));
        pathFn(selectedOption, e.value);

        break;
      case "room":
        dispatch(setRooms(e.value));
        pathFn(selectedOption, e.value);
        break;

      default:
        break;
    }
  };

  console.log(params);

  const pathFn = (option, optionValue) => {
    if (Object.entries(params).length >= 1) {
      if (Object.entries(params).slice(2).length > 0) {
        let path = [];
        const isClicked = Object.entries(params)
          .slice(2)
          .map((data, index) => {
            if (Array.isArray(data[1])) {
              if (data[1].flat(Infinity).includes(optionValue)) {
                return true;
              } else {
                return false;
              }
            } else {
              if (data[1] === optionValue) {
                return true;
              } else {
                return false;
              }
            }
          });

        if (isClicked.includes(true)) {
          console.log("=============isClicked============");
          console.log(isClicked);

          return;
        } else {
          console.log("=============isClicked============");

          console.log(isClicked);
          navigate(
            `${location.pathname}?${
              window.location.href.split("?")[1]
            }&${option}=${optionValue}`
          );
        }
      } else {
        console.log("Not greater than zero");

        navigate(
          `${location.pathname}?${
            window.location.href.split("?")[1]
          }&${option}=${optionValue}`
        );
      }
    } else {
      console.log("false");

      navigate(
        `${location.pathname}?sortBy=PRICE&sortAscending=true&${option}=${optionValue}`
      );
    }
  };

  return (
    <Grid
      fullWidth
      md={7}
      xs={!propertyBarShow ? 12 : screenSize.dynamicWidth > 765 ? 7 : 8}
    >
      <div className="search">
        <div className="searchIcon">
          <SearchIcon />
        </div>

        <Select
          className="input"
          name="selectedInput"
          placeholder="Search by location or property type"
          options={groupedOptions}
          value={
            locationOptions.find(
              (location) => location.value === optionValue
            ) ||
            typeOptions.find((type) => type.value === optionValue) ||
            listingOptions.find((listing) => listing.value === optionValue) ||
            roomOptions.find((room) => room.value === optionValue)
          }
          formatGroupLabel={formatGroupLabel}
          onChange={handleChange}
        />
      </div>
    </Grid>
  );
};

export default Search;
