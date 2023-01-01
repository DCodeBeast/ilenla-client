import React, { useContext } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Grid } from "@mui/material";
import NumberFormat from "react-number-format";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { useEffect } from "react";
import {
  locationOptions,
  typeOptions,
  listingOptions,
  roomOptions,
} from "../../Search/data";
import { statusOptions, saleOptions } from "../data";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
// import { POST_CHIP_DATA } from "../../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  POST_CHIP_DATA,
  SearchContext,
  setListing,
  setLocation,
  setRooms,
  setSale,
  setShow,
  setShowOptions,
  setStatus,
  setType,
  setMin,
  setMax,
  setCurrency
} from "../../../Contexts/SearchContext";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterRow = ({
  value,
  price,  
}) => {
  const [inputError, setInputError] = useState(Boolean);
  const [option, setOption] = useState();
  const [optionValue, setOptionValue] = useState();
  const navigate = useNavigate();
  let [minPath, setMinPath] = useState();
  let [maxPath, setMaxPath] = useState();
  let [pathCurrency, setPathCurrency] = useState();
  let [isFocused, setIsFocused] = useState();
  let [pathParams, setPathParams] = useState();
  let [pathParentParams, setPathParentParams] = useState();
  const loc = useLocation();
  const { search, dispatch } = useContext(SearchContext);

  const { status, min, max, currency } = search;

  console.log("dispatchEvent", dispatchEvent);

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
  let params;

  const handleChange = (event) => {
    dispatch(setCurrency(event.target.value));
  };
  const handleMinChange = (event) => {
    dispatch(setMin(event.target.value));
    setIsFocused(true);

console.log('minVal', search.min, event.target.value,'minPath', minPath,'maxPath', maxPath, 'pathCurrency', pathCurrency)

    if (maxPath) {
      dispatch(setMax(pathCurrency + maxPath));
    }
  };

  const handleMaxChange = (event) => {
    dispatch(setMax(event.target.value));

    setIsFocused(true);
console.log('maxVal', search.max, event.target.value,'minPath', minPath, 'pathCurrency', pathCurrency)


    if (minPath) {
      dispatch(setMin(pathCurrency + minPath));
    }
  };

  const minValue = min
    ?.split("")
    .slice(3)
    .filter((e) => e !== ",")
    .join("");

  const maxValue = max
    ?.split("")
    .slice(3)
    .filter((e) => e !== ",")
    .join("");

  useEffect(() => {
    console.log('trefr', minValue, maxValue)
    if (Number(minValue) > Number(maxValue)) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  }, [minValue, maxValue]);

  const handlePriceOption = (currency, min, max) => {
    console.log("price", currency, 'min', min, 'max',max);
    setMaxPath(max);

    setMinPath(min);
    pricePathFn(currency, min, max);
  };

  const pricePathFn = (currency, min, max) => {
    console.log("minmax", currency, max, min);

    if (Object.entries(params).length >= 1) {
      if (Object.entries(params).slice(2).length > 0) {
        const isClicked = Object.entries(params)
          .slice(2)
          .map((data, index) => {
            if (Array.isArray(data[1])) {
              if (data[1].flat(Infinity).includes("1_NGN")) {
                return true;
              } else {
                return false;
              }
            } else {
              if (
                /^[0-9]*_[0-9]*_[a-zA-Z]*/.test(data[1]) ||
                /^[0-9]*_[a-zA-Z]*/.test(data[1])
              ) {
                return true;
              } else {
                return false;
              }
            }
          });

        if (isClicked.includes(true)) {
          console.log("=============isClicked============", isClicked);

          handlePriceUpdate(currency, min, max);
        } else {
          console.log("=============isnotClicked============", isClicked);
          if (min && max) {
            console.log("minmax", max, min);
            navigate(
              `${loc.pathname}?${
                window.location.href.split("?")[1]
              }&min_max=${min}_${max}_${currency}`
            );
          } else {
            if (min) {
              navigate(
                `${loc.pathname}?${
                  window.location.href.split("?")[1]
                }&min=${min}_${currency}`
              );
            } else {
              navigate(
                `${loc.pathname}?${
                  window.location.href.split("?")[1]
                }&max=${max}_${currency}`
              );
            }
          }
        }
      } else {
        console.log("Not greater than zero");
        if (min && max) {
          console.log("minmax", max, min);
          navigate(
            `${loc.pathname}?${
              window.location.href.split("?")[1]
            }&min_max=${min}_${max}_${currency}`
          );
        } else {
          if (min) {
            navigate(
              `/${window.location.href.split("?")[1]}&min=${min}_${currency}`
            );
          } else {
            navigate(
              `${loc.pathname}?${
                window.location.href.split("?")[1]
              }&max=${max}_${currency}`
            );
          }
        }
      }
    } else {
      if (min && max) {
        console.log("minmax", max, min);
        navigate(
          `${loc.pathname}?sortBy=PRICE&sortAscending=true&min_max=${min}_${max}_${currency}`
        );
      } else {
        if (min) {
          navigate(
            `${loc.pathname}?sortBy=PRICE&sortAscending=true&min=${min}_${currency}`
          );
        } else {
          navigate(
            `${loc.pathname}?sortBy=PRICE&sortAscending=true&max=${max}_${currency}`
          );
        }
      }
    }
  };

  function getChipsForPrice(currency, min, max) {
    let allPriceChip = [];

    console.log("allPriceChip", allPriceChip);

    search.chipData.map((chip) => {
      if (chip[0] === "min" || chip[0] === "max" || chip[0] === "min_max") {
        if (min && max) {
          chip[0] = "min_max";
          chip[1] = `${min}_${max}_${currency}`;
          allPriceChip.push(chip);
          return chip;
        } else {
          if (min) {
            chip[0] = "min";
            chip[1] = `${min}_${currency}`;
            allPriceChip.push(chip);
            return chip;
          } else {
            chip[0] = "max";
            chip[1] = `${max}_${currency}`;
            allPriceChip.push(chip);
            return chip;
          }
        }
      } else {
        allPriceChip.push(chip);

        return chip;
      }
    });

    if (allPriceChip[0].length <= 0) {
      return (allPriceChip = []);
    } else {
      return allPriceChip;
    }
  }

  function getNewPathBasedOnPriceAction(allPriceChip) {
    let newPath = [];

    allPriceChip.map((path, index) => {
      if (Array.isArray(path[1])) {
        path[1].map((inner, index) => {
          newPath.push(`${path[0]}=${inner}`);
        });
      } else {
        newPath.push(`${path[0]}=${path[1]}`);
      }
    });
    return newPath;
  }
  const handlePriceUpdate = (currency, min, max) => {
    let allPriceChip = getChipsForPrice(currency, min, max);
    console.log("allPriceChip", allPriceChip);

    let newPath = getNewPathBasedOnPriceAction(allPriceChip);

    console.log("newpath", newPath);

    if (allPriceChip.includes(undefined)) {
      dispatch({ type: POST_CHIP_DATA, payload: [] });
    } else {
      dispatch({ type: POST_CHIP_DATA, payload: allPriceChip });
    }

    if (newPath.length <= 0) {
      navigate(`${loc.pathname}`);
    } else {
      newPath = newPath.join("&");
      navigate(
        `${loc.pathname}?sortBy=${params.sortBy}&sortAscending=${params.sortAscending}&${newPath}`
      );
    }
  };

  const handleToggleOption = (val, index) => {

    console.log("val", val);

    let selectedOption = "";

    statusOptions.find((location) => {
      if (location.value === val) {
    console.log("valinside", val);

        selectedOption = location.option;
        setOption(selectedOption);
      }
      return selectedOption;
    }) ||
      saleOptions.find((location) => {
        console.log('location', location.value)

        if (location.value === val) {
          selectedOption = location.option;
          setOption(selectedOption);
        }
        return selectedOption;
      }) ||
      locationOptions.find((loc) => {
        if (loc.value === val) {
          console.log('slot', loc.value)
          selectedOption = loc.option;
          setOption(selectedOption);
         
        }
        return selectedOption;
      }) ||
      typeOptions.find((type) => {
        if (type.value === val) {
          selectedOption = type.option;
          setOption(selectedOption);
        }
        return selectedOption;
      }) ||
      listingOptions.find((listing) => {
        if (listing.value === val) {
          selectedOption = listing.option;

          setOption(selectedOption);
        }
        return selectedOption;
      }) ||
      roomOptions.find((room) => {
        if (room.value === val) {
          selectedOption = room.option;

          setOption(selectedOption);
        }
        return selectedOption;
      });

    setOptionValue(val);

    console.log("valo", val);
    console.log("selectedOption", selectedOption);
    console.log("selectedOption", locationOptions, option, val);

    switch (selectedOption) {
      case "status":
        dispatch(setStatus(val));
        pathFn(selectedOption, val);
        pathParams = getPathParams(window.location);
        pathParentParams = getPathParentParams(window.location);
        setPathParams(pathParams);
        setPathParentParams(pathParentParams);
        break;

      case "sale":
        dispatch(setSale(val));
        pathFn(selectedOption, val);
        pathParams = getPathParams(window.location);
        pathParentParams = getPathParentParams(window.location);
        setPathParams(pathParams);
        setPathParentParams(pathParentParams);
        break;
      case "location":
        dispatch(setLocation(val));
        pathFn(selectedOption, val);
        pathParams = getPathParams(window.location);
        pathParentParams = getPathParentParams(window.location);
        setPathParams(pathParams);
        setPathParentParams(pathParentParams);
        break;
      case "type":
        dispatch(setType(val));
        pathFn(selectedOption, val);
        pathParams = getPathParams(window.location);
        pathParentParams = getPathParentParams(window.location);
        setPathParams(pathParams);
        setPathParentParams(pathParentParams);
        break;
      case "listing":
        dispatch(setListing(val));
        pathFn(selectedOption, val);
        pathParams = getPathParams(window.location);
        pathParentParams = getPathParentParams(window.location);
        setPathParams(pathParams);
        setPathParentParams(pathParentParams);
        break;
      case "room":
        dispatch(setRooms(val));
        pathFn(selectedOption, val);
        pathParams = getPathParams(window.location);
        pathParentParams = getPathParentParams(window.location);
        setPathParams(pathParams);
        setPathParentParams(pathParentParams);
        break;

      default:
        break;
    }
  };

  const pathFn = (option, optionValue) => {
    console.log("pathfn", option, optionValue);

    if (Object.entries(params)?.length >= 1) {
      if (Object.entries(params).slice(2).length > 0) {
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
          console.log("=============isClicked============", isClicked);
          handleDelete(option, optionValue);
        } else {
          console.log("=============isNotClicked============", isClicked);
          navigate(
            `${loc.pathname}?${
              window.location.href.split("?")[1]
            }&${option}=${optionValue}`
          );
        }
      } else {
        navigate(
          `${loc.pathname}?${
            window.location.href.split("?")[1]
          }&${option}=${optionValue}`
        );
      }
    } else {
      navigate(
        `${loc.pathname}?sortBy=PRICE&sortAscending=true&${option}=${optionValue}`
      );
    }
  };
  function getPathParams(url = window.location) {
    let pathParams;
    if (
      (window.location.pathname === "/properties" &&
        window.location.search === "") ||
      (window.location.pathname === "/account" && window.location.search === "")
    ) {
      console.log("account", window.location.href);
      pathParams = [];
      return pathParams;
    } else {
      console.log("account2", window.location.href);
      pathParams = window.location.href
        .split("?")[1]
        .split("&")
        .map((newPath) => {
          return newPath.split("=")[1];
        });
    }
    return pathParams;
  }

  useEffect(() => {
    let pathParams;
    pathParams = getPathParams(window.location);
    pathParentParams = getPathParentParams(window.location);

    setPathParams(pathParams);
    setPathParentParams(pathParentParams);
  }, [
    pathParams?.length,
    pathParentParams?.length,
    window.location.href,
    window.location,
    loc.pathname,
    status,
    price,
    currency,
    max,
    min,
  ]);
  console.log("loc", pathParams);

  useEffect(() => {
    console.log("loc", window.location.href);
    console.log("loc", pathParams);
  }, [pathParams]);
  function getChips(category, value) {
    let allchip = [];

    console.log("search.chipData" + search.chipData);
    allchip = search.chipData?.map((chip, index) => {
      if (chip[0] === category) {
        if (Array.isArray(chip[1])) {
          if (chip[1].length <= 1) {
            if (search.chipData.length <= 1) {
              chip = [];
              return chip;
            } else {
              console.log("chip lessthan1" + chip[1], value);
              chip = search.chipData?.filter((chip) => chip[1] === category);
              return chip.filter((e) => e);
            }
          } else {
            console.log("chipgreaterthan1" + chip[1], value);
            const newChip = [chip[0]];
            chip = chip[1].filter((chip, index) => chip !== value);
            newChip.push(chip);
            return newChip;
          }
        } else {
          console.log("chipNotArray" + chip[1]);
          if (search.chipData.length <= 1) {
            chip = [];
            return chip;
          } else {
            return;
          }
        }
      } else {
        return chip;
      }
    });

    if (allchip[0].length <= 0) {
      return (allchip = []);
    } else {
      return allchip;
    }
  }

  function getPath(allchip) {
    let newPath = [];
    allchip.map((path, index) => {
      if (Array.isArray(path[1])) {
        path[1].map((inner, index) => {
          newPath.push(`${path[0]}=${inner}`);
        });
      } else {
        newPath.push(`${path[0]}=${path[1]}`);
      }
    });
    return newPath;
  }

  const handleDelete = (category, value) => {
    let allchip = getChips(category, value);

    allchip = allchip.filter((e) => e);
    let newPath = getPath(allchip);

    if (allchip.includes(undefined)) {
      dispatch({ type: POST_CHIP_DATA, payload: [] });
    } else {
      dispatch({ type: POST_CHIP_DATA, payload: allchip });
    }

    if (newPath.length <= 0) {
      navigate(`${loc.pathname}`);
    } else {
      newPath = newPath.join("&");
      navigate(
        `${loc.pathname}?sortBy=${params.sortBy}&sortAscending=${params.sortAscending}&${newPath}`
      );
    }
  };

  useEffect(() => {
    params = getParams(window.location);
  }, [
    [],
    window.location,
    window.location.href,
    status,
    price,
    currency,
    max,
    min,
  ]);

  useEffect(() => {
    let data = Object.entries(params).slice(2);
    dispatch({ type: POST_CHIP_DATA, payload: data });
  }, [ window.location.href, params, dispatch]);

  function getPathParentParams(url = window.location) {
    let pathParentParams;
    if (
      (window.location.pathname === "/properties" ||
        window.location.pathname === "/account") &&
      window.location.search === ""
    ) {
      pathParentParams = window.location.href;
    } else {
      pathParentParams = window.location.href
        .split("?")[1]
        .split("&")
        .map((newPath) => {
          return newPath.split("=")[0];
        });
    }
    return pathParentParams;
  }
  console.log("showOption", search.show === true ? "true" : "false");
  console.log("pathParams", pathParams);
  let minMax;


  const setMinMax = (pathParams) => {
    let setMinMax;
    console.log('pathPar', pathParams)
    
    if (
      (window.location.pathname === "/properties" &&
        window.location.search === "") ||
      (window.location.pathname === "/account" && window.location.search === "")
    ) {
      pathParentParams = window.location.href;
      return pathParentParams
    } else {
      console.log('path632', pathParams)
      
      pathParams?.map((path) => {
        if (
          /^[0-9]*_[0-9]*_[a-zA-Z]*/.test(path) ||
          /^[0-9]*_[a-zA-Z]*/.test(path)
        ) {
          setMinMax = path;
        }
        return setMinMax;
      });
    }

    return setMinMax;
  }

  useEffect(() => {
    minMax = setMinMax(pathParams);
    console.log("minmax", minMax);
    if (
      (window.location.pathname === "/properties" &&
        window.location.search === "") ||
      (window.location.pathname === "/account" && window.location.search === "")
    ) {
      localStorage.removeItem("pathCurrency");
    } else {
      if (pathParentParams.includes("min_max")) {
        setMinPath(minMax?.split("_")[0]);
        setMaxPath(minMax?.split("_")[1]);
        setPathCurrency(minMax?.split("_")[2]);
        console.log('minmax', minMax)
        localStorage.setItem("pathCurrency", minMax?.split("_")[1]);
      } else {
        if (pathParentParams.includes("min")) {
          setMinPath(minMax?.split("_")[0]);
          setPathCurrency(minMax?.split("_")[1]);
        console.log('minmax2', minMax)

          localStorage.setItem("pathCurrency", minMax?.split("_")[1]);
        } else {
          setMaxPath(minMax?.split("_")[0]);
          setPathCurrency(minMax?.split("_")[1]);
        console.log('minmax3', minMax)

          localStorage.setItem("pathCurrency", minMax?.split("_")[1]);
        }
      }
    }
  }, [
    pathParams?.length,
    pathParentParams?.length,
    window.location.href,
    price,
    currency,
    max,
    min,
    pathParams
  ]);

  useEffect(() => {
    setMaxPath(0);
    setMinPath(0);
  }, [min, max]);

  const handleShowOptions = (val) => {
    // setShowOptions(!showOptions);
    // dispatch(setShow(!search.show));
    dispatch(setShowOptions(val));
  };

  console.log("test", search.showOptions);

  return (
    <div>
      {value[0].option === "price" ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid className="filterTitle ">{value[0].option}</Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid className="filterOptionContainer" py={3}>
              <Grid>
                <Grid container className="filterOption">
                  <Grid lg={4} xs={12} mb={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Denom
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currency}
                        defaultValue="NGN"
                        label="Denom"
                        onChange={handleChange}
                        className="filterCurrency"
                      >
                        <MenuItem value="NGN">Naira</MenuItem>
                        <MenuItem value="US$">Dollar</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    lg={8}
                    md={12}
                    container
                    flexDirection="column"
                    alignItems="center"
                  >
                    <NumberFormat
                      placeholder="Min"
                      className="foo"
                      style={{ width: "100%" }}
                      thousandSeparator={true}
                      prefix={currency === "NGN" ? "NGN" : "US$"}
                      inputmode="numeric"
                      value={isFocused ? min : min ? min : minPath}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                      onChange={handleMinChange}
                    />

                    <Grid my={1}>to</Grid>
                    <NumberFormat
                      thousandSeparator={true}
                      placeholder="Max"
                      style={{ width: "100%" }}
                      prefix={currency === "NGN" ? `NGN` : "US$"}
                      className="some"
                      value={isFocused ? max : max ? max : maxPath}
                      inputmode="numeric"
                      onChange={handleMaxChange}
                      renderText={(value, props) => (
                        <div {...props}>{value} </div>
                      )}
                    />
                  </Grid>
                </Grid>
                {inputError && maxValue && (
                  <Grid my={2} textAlign="center">
                    <p style={{ fontSize: "12px", color: "red" }}>
                      Min value must be less than Max Value
                    </p>
                  </Grid>
                )}
                <Grid mt={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      handlePriceOption(currency, minValue, maxValue)
                    }
                    disabled={
                      (inputError && maxValue && currency) ||
                      (!maxValue && !minValue && currency)
                        ? true
                        : false
                    }
                  >
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid className="filterTitle">{value[0].option}</Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid className="filterRowContainer">
              <Grid className="filterOptionContainer" py={2}>
                {value.map((val, index) => (
                  <Grid
                    key={index}
                    className="filterRow filterRowHover"
                    onClick={() => handleToggleOption(val.value, index)}
                  >
                    <FormGroup>
                      <FormControlLabel
                        className="filterOption"
                        label={val.label}
                        labelPlacement="start"
                        control={
                          <Checkbox
                            checked={
                              pathParams === undefined
                                ? ""
                                : pathParams.includes(val.value) ||
                                  pathParams.includes(val.valueForced)
                            }
                          />
                        }
                      />
                    </FormGroup>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
};

export default FilterRow;
