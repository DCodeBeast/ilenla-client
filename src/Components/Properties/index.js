import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import PropertyBar from "../../Components/PropertyBar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import RefreshIcon from "@mui/icons-material/Refresh";
import Header from "../../Components/Header";
import { useNavigate } from "react-router";
import Sidebar from "../../Components/Sidebar";
import { POST_CHIP_DATA } from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import Property from "../../Components/Property";
import { propertyData } from "../../constants/data";
import { GridContext } from "../../Contexts/GridContext";
import { setFilter, ToggleContext } from "../../Contexts/ToggleContext";
import { SearchContext } from "../../Contexts/SearchContext";
import { useLocation } from "react-router";
import "./styles.css";
import Cart from "../Cart";

const PropertiesComponent = () => {
  const [activeGrid, setActiveGrid] = useState(0);
  const { items } = useContext(GridContext);
  const { toggle } = useContext(ToggleContext);
  const { deals } = useSelector((state) => state.deals);
  const { cart } = useSelector((state) => state.cart);
  const { cartActive } = useSelector((state) => state.cart);

  console.log("ret", deals);
  console.log("similarProp", deals);
  console.log("cart", cart);

  let [propertyFilter, setPropertyFilter] = useState(deals?.properties);
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const dispatch = useDispatch();
  const { search } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();
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
      dispatch(setFilter(false));
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

  function getChips(category, value) {
    let allChip = [];

    allChip = search.chipData?.map((chip, index) => {
      if (chip[0] === category) {
        if (Array.isArray(chip[1])) {
          if (chip[1].length <= 1) {
            if (search.chipData.length <= 1) {
              chip = [];
              return chip;
            } else {
              chip = search.chipData?.filter((chip) => chip[1] === category);
              return chip.filter((e) => e);
            }
          } else {
            const newChip = [chip[0]];
            chip = chip[1].filter((chip, index) => index !== value);
            newChip.push(chip);
            return newChip.filter((e) => e);
          }
        } else {
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

    return allChip;
  }

  function getPath(allChip) {
    let newPath = [];
    allChip.map((path, index) => {
      if (Array.isArray(path[1])) {
        path[1].map((inner, index) => {
          if (path[0] === undefined || inner === undefined) {
            return "";
          } else {
            newPath.push(`${path[0]}=${inner}`);
          }
          return inner;
        });
      } else {
        if (path[0] === undefined || path[1] === undefined) {
          return;
        } else {
          newPath.push(`${path[0]}=${path[1]}`);
        }
      }
      return path;
    });
    return newPath;
  }

  const handleClick = (category, value) => {
    let allChip = getChips(category, value);
    allChip = allChip.filter((e) => {
      return e;
    });

    let newPath = getPath(allChip);

    if (allChip.includes(undefined)) {
      dispatch({ type: POST_CHIP_DATA, payload: [] });
    } else {
      dispatch({ type: POST_CHIP_DATA, payload: allChip });
    }

    if (newPath.length <= 0) {
      navigate(`${location.pathname}`);
    } else {
      newPath = newPath.join("&");
      navigate(
        `${location.pathname}?sortBy=${params.sortBy}&sortAscending=${params.sortAscending}&${newPath}`
      );
    }
  };

  const handleClear = () => {
    dispatch({ type: POST_CHIP_DATA, payload: [] });
    navigate(`${location.pathname}`);
    console.log("chipDataClearEnd", search.chipData);
  };

  useEffect(() => {
    let filterData;
    if (search.chipData?.length <= 0) {
      setPropertyFilter(deals?.properties);
    } else {
      search.chipData?.map((item) => {
        switch (item[0]) {
          case "location":
            filterData = deals?.properties.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.location.split(",")[0] === ids;
                  return filterData;
                });
              } else {
                filterData = property.location.split(",")[0] === item[1];
                return filterData;
              }
              return property;
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "type":
            filterData = deals?.properties.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.type === ids;
                  return filterData;
                });
              } else {
                filterData = property.type === item[1];
                return filterData;
              }
              return property;
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "listing":
            filterData = deals?.properties.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.listing === ids;
                  return filterData;
                });
              } else {
                filterData = property.listing === item[1];
                return filterData;
              }
              return property;
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "room":
            filterData = deals?.properties.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.rooms === ids;
                  return filterData;
                });
              } else {
                filterData = property.rooms === item[1];

                return filterData;
              }
              return property;
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "sale":
            filterData = deals?.properties.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  if (ids === "naira") {
                    filterData = property.currency[0] === "NGN";
                    return filterData;
                  } else {
                    filterData = property.currency[0] === "US$";
                    return filterData;
                  }
                });
              } else {
                if (item[1] === "naira") {
                  filterData = property.currency[0] === "NGN";
                  return filterData;
                } else {
                  filterData = property.currency[0] === "US$";
                  return filterData;
                }

                return filterData;
              }
              return property;
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "status":
            filterData = deals?.properties.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.status === ids;
                  return filterData;
                });
              } else {
                filterData = property.status === item[1];

                return filterData;
              }
              return property;
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "min_max":
            filterData = deals?.properties.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.status === ids;
                  return filterData;
                });
              } else {
                filterData =
                  property.price <= item[1].split("_")[1] &&
                  property.price >= item[1].split("_")[0] &&
                  property.currency[0] === item[1].split("_")[2];
                return filterData;
              }
              return property;
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "min":
            filterData = deals?.properties.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.status === ids;
                  return filterData;
                });
              } else {
                filterData =
                  property.price >= item[1].split("_")[0] &&
                  property.currency[0] === item[1].split("_")[1];
                return filterData;
              }
              return property;
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "max":
            filterData = deals?.properties.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.status === ids;
                  return filterData;
                });
              } else {
                filterData =
                  property.price <= item[1].split("_")[0] &&
                  property.currency[0] === item[1].split("_")[1];
                return filterData;
              }
              return property;
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;

          default:
            filterData = deals?.properties;
            return setPropertyFilter(filterData);
        }
        return item;
      });
    }
  }, [[], search.chipData]);

  console.log("altchipdata", search.chipData);

  console.log("filterData", propertyFilter);
  return (
    <div className="">
      <Header />
      <div>
        <div className="properties" style={{ position: "relative" }}>
          <PropertyBar />
          <Grid
            container
            sm={12}
            className={`propertiesContainer  ${
              toggle.isFilterOpen ? "propertiesContainerPos" : ""
            }`}
          >
            {toggle.isFilterOpen && (
              <Grid
                sm={screenSize.dynamicWidth < 700 ? 12 : 3}
                className={`${
                  screenSize.dynamicWidth < 700
                    ? "filterColumnResp"
                    : "filterColumn"
                } ${
                  toggle.isFilterOpen
                    ? screenSize.dynamicWidth < 700
                      ? "filterColumnPosResp"
                      : "filterColumnPos"
                    : ""
                }`}
              >
                <Sidebar />
              </Grid>
            )}
            <Grid
              sm={toggle.isFilterOpen ? 9 : 12}
              className={`propertyColumn `}
            >
              <Grid container alignItems="center" mb={1}>
                <Grid mr={3}>
                  <RefreshIcon />
                </Grid>
                <Grid className="itemTotal">
                  {propertyFilter?.length} Items
                </Grid>
              </Grid>
              {
                <Grid className="chipInputRow">
                  <Stack direction="row" spacing={1}>
                    <Grid container alignItems="center">
                      {search.chipData?.map((data, index) => {
                        return (
                          <>
                            {Array.isArray(data[1]) ? (
                              data[1]
                                .flat(Infinity)
                                .map((param, index) => (
                                  <Chip
                                    key={index}
                                    label={data[0] + " " + ":" + " " + param}
                                    onDelete={() => handleClick(data[0], index)}
                                    onClick={() => handleClick(data[0], index)}
                                    className="chipInput"
                                  />
                                ))
                            ) : (
                              <>
                                {data[0] === "min" ||
                                data[0] === "max" ||
                                data[0] === "min_max" ? (
                                  <Chip
                                    key={index}
                                    label={
                                      data[0] === "min_max"
                                        ? data[0].split("_")[0] +
                                          "Cost" +
                                          ":" +
                                          " " +
                                          new Intl.NumberFormat().format(
                                            data[1].split("_")[0]
                                          ) +
                                          " " +
                                          data[1].split("_")[2] +
                                          " " +
                                          " ," +
                                          data[0].split("_")[1] +
                                          "Cost " +
                                          ":" +
                                          " " +
                                          new Intl.NumberFormat().format(
                                            data[1].split("_")[1]
                                          ) +
                                          " " +
                                          data[1].split("_")[2]
                                        : data[0] +
                                          " " +
                                          ":" +
                                          " " +
                                          data[1]
                                            .split("_")[0]
                                            .toLocaleString() +
                                          " " +
                                          data[1].split("_")[1]
                                    }
                                    onDelete={() => handleClick(data[0], index)}
                                    onClick={() => handleClick(data[0], index)}
                                    className="chipInput"
                                  />
                                ) : (
                                  <Chip
                                    key={index}
                                    label={data[0] + " " + ":" + " " + data[1]}
                                    onDelete={() => handleClick(data[0], index)}
                                    onClick={() => handleClick(data[0], index)}
                                    className="chipInput"
                                  />
                                )}
                              </>
                            )}
                          </>
                        );
                      })}
                      {search?.chipData?.length > 0 && (
                        <Grid ml={3} className="clearBtn" onClick={handleClear}>
                          Clear All
                        </Grid>
                      )}
                    </Grid>
                  </Stack>
                </Grid>
              }

              {propertyFilter?.length <= 0 ? (
                <Grid
                  container
                  xs={12}
                  rowSpacing={1}
                  justifyContent="center"
                  alignItems="center"
                  columnSpacing={{ xs: 1, sm: 2, md: 1 }}
                  mt={1}
                  className="noPropertyContainer"
                >
                  No Properties To Display
                </Grid>
              ) : (
                <Grid sm={12} container>
                  <Grid
                    container
                    sm={cart?.length || cartActive > 0 ? 9 : 12}
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 1 }}
                    mt={1}
                  >
                    {propertyFilter?.map((item, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={
                          toggle.isFilterOpen
                            ? items?.activeGrid === 0
                              ? 12
                              : 6
                            : items?.activeGrid === 0
                            ? 6
                            : 4
                        }
                        md={
                          toggle.isFilterOpen
                            ? items?.activeGrid === 0
                              ? 6
                              : 4
                            : items?.activeGrid === 0
                            ? 4
                            : 3
                        }
                        lg={
                          toggle.isFilterOpen
                            ? items?.activeGrid === 0
                              ? 5
                              : 3
                            : items?.activeGrid === 0
                            ? 3
                            : 2.5
                        }
                      >
                        <Property
                          item={item}
                          index={index}
                          activeGrid={activeGrid}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  {(cart.length > 0 || cartActive) && (
                    <Grid sm={3} style={{ position: "relative" }}>
                      <Cart />
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default PropertiesComponent;
