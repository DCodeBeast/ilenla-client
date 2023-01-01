import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import PropertyBar from "../../PropertyBar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import RefreshIcon from "@mui/icons-material/Refresh";
import Header from "../../Header";
import { useNavigate } from "react-router";
import "../../../Pages/Properties/styles.css";
import Sidebar from "../../Sidebar";
import { POST_CHIP_DATA, POST_SORT_DATA } from "../../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import Property from "../../Property";
import { propertyData } from "../../../constants/data";
import { GridContext } from "../../../Contexts/GridContext";

const Properties = () => {
  const { items } = useContext(GridContext);
  const [activeGrid, setActiveGrid] = useState(0);

  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isSortListOpen, setIsSortListOpen] = useState(false);
  const [sortBy, setSortBy] = useState();
  const [sortAscending, setSortAscending] = useState();
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [listing, setListing] = useState("");
  const [rooms, setRooms] = useState("");
  let [currency, setCurrency] = useState(
    localStorage.getItem("pathCurrency") || "NGN"
  );
  let [min, setMin] = useState("");
  let [max, setMax] = useState("");
  let [propertyFilter, setPropertyFilter] = useState(propertyData);
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const dispatch = useDispatch();
  const initialState = {
    sortAscending: "",
    sortBy: "",
    location: "",
    type: "",
    listing: "",
    rooms: "",
    status: "",
    price: "",
    sale: "",
    currency: "",
    min: "",
    max: "",
  };
  const initialFilterState = {
    sortAscending: "",
    sortBy: "",
    location: "",
    type: "",
    listing: "",
    rooms: "",
    status: "",
    price: "",
    sale: "",
    currency: "",
    min: "",
    max: "",
  };
  const [queryData, setQueryData] = useState(initialState);
  const [filterData, setfilterData] = useState(initialFilterState);
  const chipData = useSelector((state) => state.chipData.chipData);
  const sortData = useSelector((state) => state.chipData.sortData);

  const navigate = useNavigate();

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
      setIsFilterOpen(false);
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

  useEffect(() => {
    let data = Object.entries(params)?.slice(2);
    let sortData = Object.entries(params)?.slice(0, 2);
    if (data.includes(undefined)) {
      dispatch({ type: POST_CHIP_DATA, payload: [] });
      dispatch({ type: POST_SORT_DATA, payload: [] });
    } else {
      dispatch({ type: POST_CHIP_DATA, payload: data });
      dispatch({ type: POST_SORT_DATA, payload: sortData });
    }
  }, [
    window.location,
    location,
    type,
    rooms,
    listing,
    status,
    sale,
    price,
    currency,
    min,
    max,
  ]);

  function getChips(category, value) {
    let allchip = [];

    allchip = chipData?.map((chip, index) => {
      if (chip[0] === category) {
        if (Array.isArray(chip[1])) {
          if (chip[1].length <= 1) {
            if (chipData.length <= 1) {
              chip = [];
              return chip;
            } else {
              chip = chipData?.filter((chip) => chip[1] === category);
              return chip.filter((e) => e);
            }
          } else {
            const newChip = [chip[0]];
            chip = chip[1].filter((chip, index) => index !== value);
            newChip.push(chip);
            return newChip.filter((e) => e);
          }
        } else {
          if (chipData.length <= 1) {
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

    return allchip;
  }

  function getPath(allchip) {
    let newPath = [];
    allchip.map((path, index) => {
      if (Array.isArray(path[1])) {
        path[1].map((inner, index) => {
          if (path[0] === undefined || inner === undefined) {
            return;
          } else {
            newPath.push(`${path[0]}=${inner}`);
          }
        });
      } else {
        if (path[0] === undefined || path[1] === undefined) {
          return;
        } else {
          newPath.push(`${path[0]}=${path[1]}`);
        }
      }
    });
    return newPath;
  }

  let handleDelete = (category, value) => {
    console.log("handleDelete", category, value, chipData);
    let allchip = getChips(category, value);
    console.log("allchip", allchip);

    allchip = allchip.filter((e) => e);

    let newPath = getPath(allchip);
    console.log("newPath", newPath);

    if (allchip.includes(undefined)) {
      dispatch({ type: POST_CHIP_DATA, payload: [] });
    } else {
      dispatch({ type: POST_CHIP_DATA, payload: allchip });
    }

    if (newPath.length <= 0) {
      navigate("/account");
    } else {
      newPath = newPath.join("&");
      navigate(
        `/account?sortBy=${params.sortBy}&sortAscending=${params.sortAscending}&${newPath}`
      );
    }
  };

  const handleClick = (category, value) => {
    let allchip = getChips(category, value);
    allchip = allchip.filter((e) => {
      return e;
    });

    let newPath = getPath(allchip);

    if (allchip.includes(undefined)) {
      dispatch({ type: POST_CHIP_DATA, payload: [] });
    } else {
      dispatch({ type: POST_CHIP_DATA, payload: allchip });
    }

    if (newPath.length <= 0) {
      navigate("/account");
    } else {
      newPath = newPath.join("&");
      navigate(
        `/account?sortBy=${params.sortBy}&sortAscending=${params.sortAscending}&${newPath}`
      );
    }
  };

  const handleClear = () => {
    dispatch({ type: POST_CHIP_DATA, payload: [] });
    navigate("/account");

    console.log("chipDataClearEnd", chipData);
  };

  useEffect(() => {
    setQueryData({
      ...queryData,
      sortAscending: sortAscending,
      sortBy: sortBy,
    });
  }, [sortBy, sortAscending]);

  useEffect(() => {
    setQueryData({
      ...queryData,
      location: location,
      type: type,
      listing: listing,
      rooms: rooms,
      status: status,
      price: price,
      sale: sale,
      currency: currency,
      min: min,
      max: max,
    });
  }, [
    location,
    window.location,
    type,
    listing,
    rooms,
    status,
    price,
    sale,
    currency,
    min,
    max,
  ]);

  useEffect(() => {
    setQueryData({ ...params });
  }, []);

  useEffect(() => {
    console.log("price", "true");
    // console.log("price", sortData[0][1])

    let filterData;
    if (sortData?.length <= 0 || sortData === null) {
      setPropertyFilter(propertyData);
    } else {
      sortData[0]?.map((item) => {
        switch (item) {
          case "PRICE":
            if (sortData[1][1] === "true") {
              console.log("price", "true");
              filterData = propertyData.sort((a, b) =>
                a.price < b.price ? 1 : -1
              );
              setPropertyFilter(filterData);

              return filterData;
            } else {
              filterData = propertyData.sort((a, b) =>
                a.price > b.price ? 1 : -1
              );
              setPropertyFilter(filterData);

              return filterData;
            }

            break;
          case "ROOMS_COUNT":
            if (sortData[1][1] === "true") {
              console.log("room");

              filterData = propertyData.sort((a, b) =>
                a.rooms.split("")[0] > b.rooms.split("")[0] ? 1 : -1
              );
              setPropertyFilter(filterData);

              return filterData;
            } else {
              filterData = propertyData.sort((a, b) =>
                a.rooms.split("")[0] < b.rooms.split("")[0] ? 1 : -1
              );
              setPropertyFilter(filterData);

              return filterData;
            }

            break;
          case "VIEWER_COUNT":
            if (sortData[1][1] === "true") {
              console.log("room");

              filterData = propertyData.sort((a, b) =>
                a.viewerCount.length > b.viewerCount.length ? 1 : -1
              );
              setPropertyFilter(filterData);

              return filterData;
            } else {
              filterData = propertyData.sort((a, b) =>
                a.viewerCount.length < b.viewerCount.length ? 1 : -1
              );

              setPropertyFilter(filterData);

              return filterData;
            }
            break;
          case "FAVORITE_COUNT":
            if (sortData[1][1] === "true") {
              console.log("room");

              filterData = propertyData.sort((a, b) =>
                a.favoriteCount.length < b.favoriteCount.length ? 1 : -1
              );
              setPropertyFilter(filterData);

              return filterData;
            } else {
              filterData = propertyData.sort((a, b) =>
                a.favoriteCount.length > b.favoriteCount.length ? 1 : -1
              );
              setPropertyFilter(filterData);

              return filterData;
            }
            break;
          case "CREATED_DATE":
            if (sortData[1][1] === "true") {
              console.log("room");

              filterData = propertyData.sort((a, b) =>
                new Date(b.createdAt).getTime() >
                new Date(a.createdAt).getTime()
                  ? 1
                  : -1
              );
              setPropertyFilter(filterData);

              return filterData;
            } else {
              filterData = propertyData.sort((a, b) =>
                new Date(a.createdAt).getTime() <
                new Date(b.createdAt).getTime()
                  ? 1
                  : -1
              );
              setPropertyFilter(filterData);

              return filterData;
            }
            console.log("filterData", filterData);
            break;

          default:
            filterData = propertyData;
            return setPropertyFilter(filterData);
            break;
        }
      });
    }
  }, [sortData]);

  useEffect(() => {
    let filterData;
    if (chipData?.length <= 0) {
      setPropertyFilter(propertyData);
    } else {
      chipData?.map((item) => {
        switch (item[0]) {
          case "location":
            filterData = propertyData.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.location.split(",")[0] === ids;
                  return filterData;
                });
              } else {
                filterData = property.location.split(",")[0] === item[1];
                return filterData;
              }
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "type":
            filterData = propertyData.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.type === ids;
                  return filterData;
                });
              } else {
                filterData = property.type === item[1];
                return filterData;
              }
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "listing":
            filterData = propertyData.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.listing === ids;
                  return filterData;
                });
              } else {
                filterData = property.listing === item[1];
                return filterData;
              }
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "room":
            filterData = propertyData.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.rooms === ids;
                  return filterData;
                });
              } else {
                filterData = property.rooms === item[1];

                return filterData;
              }
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "sale":
            filterData = propertyData.filter((property) => {
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
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "status":
            filterData = propertyData.filter((property) => {
              if (Array.isArray(item[1])) {
                item[1].map((ids) => {
                  filterData = property.status === ids;
                  return filterData;
                });
              } else {
                filterData = property.status === item[1];

                return filterData;
              }
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "min_max":
            filterData = propertyData.filter((property) => {
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
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "min":
            filterData = propertyData.filter((property) => {
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
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;
          case "max":
            filterData = propertyData.filter((property) => {
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
            });
            setPropertyFilter(filterData);
            console.log("filterData", filterData);
            break;

          default:
            filterData = propertyData;
            return setPropertyFilter(filterData);
            break;
        }
      });
    }
  }, [chipData, sortData]);
  console.log("chipData", chipData);
  console.log("sortData", sortData);
  console.log("filterData", propertyFilter);
  return (
    <div className="">
      <div style={{ position: "relative" }}>
        <PropertyBar />
        <Grid
          container
          sm={12}
          className={`propertiesContainer ${
            isFilterOpen ? "propertiesContainerPos" : ""
          }`}
        >
          {isFilterOpen && (
            <Grid
              sm={screenSize.dynamicWidth < 700 ? 12 : 3}
              className={`${
                screenSize.dynamicWidth < 700
                  ? "filterColumnResp"
                  : "filterColumn"
              } ${
                isFilterOpen
                  ? screenSize.dynamicWidth < 700
                    ? "filterColumnPosResp"
                    : "filterColumnPos"
                  : ""
              }`}
            >
              <Sidebar
                filterData={filterData}
                setStatus={setStatus}
                setPrice={setPrice}
                setSale={setSale}
                setLocation={setLocation}
                setType={setType}
                setListing={setListing}
                setRooms={setRooms}
                status={status}
                price={price}
                sale={sale}
                location={location}
                type={type}
                listing={listing}
                rooms={rooms}
                currency={currency}
                min={min}
                max={max}
                setCurrency={setCurrency}
                setMax={setMax}
                setMin={setMin}
                handleDelete={handleDelete}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                handleClear={handleClear}
              />
            </Grid>
          )}
          <Grid sm={isFilterOpen ? 9 : 12} className={`propertyColumn `}>
            <Grid container alignItems="center" mb={1}>
              <Grid mr={3}>
                <RefreshIcon />
              </Grid>
              <Grid className="itemTotal">{propertyFilter.length} Items</Grid>
            </Grid>
            {(queryData.location ||
              queryData.type ||
              queryData.listing ||
              queryData.rooms ||
              queryData.status ||
              queryData.price ||
              queryData.sale ||
              queryData.currency ||
              queryData.min ||
              queryData.max) && (
              <Grid className="chipInputRow">
                <Stack direction="row" spacing={1}>
                  <Grid container alignItems="center">
                    {chipData?.map((data, index) => {
                      return (
                        <>
                          {Array.isArray(data[1]) ? (
                            data[1]
                              .flat(Infinity)
                              .map((param, index) => (
                                <Chip
                                  key={index}
                                  label={data[0] + " " + ":" + " " + param}
                                  onDelete={() => handleDelete(data[0], index)}
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
                                        data[1].split("_")[0].toLocaleString() +
                                        " " +
                                        data[1].split("_")[1]
                                  }
                                  onDelete={() => handleDelete(data[0], index)}
                                  onClick={() => handleClick(data[0], index)}
                                  className="chipInput"
                                />
                              ) : (
                                <Chip
                                  key={index}
                                  label={data[0] + " " + ":" + " " + data[1]}
                                  onDelete={() => handleDelete(data[0], index)}
                                  onClick={() => handleClick(data[0], index)}
                                  className="chipInput"
                                />
                              )}
                            </>
                          )}
                        </>
                      );
                    })}
                    {(queryData.location ||
                      queryData.type ||
                      queryData.listing ||
                      queryData.rooms ||
                      queryData.status ||
                      queryData.price ||
                      queryData.sale ||
                      queryData.currency ||
                      queryData.min ||
                      queryData.max) &&
                      chipData?.length > 0 && (
                        <Grid ml={3} className="clearBtn" onClick={handleClear}>
                          Clear All
                        </Grid>
                      )}
                  </Grid>
                </Stack>
              </Grid>
            )}

            {propertyFilter.length <= 0 ? (
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
                No Property To Display
              </Grid>
            ) : (
              <Grid
                container
                sm={12}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 1 }}
                mt={1}
              >
                {propertyFilter.map((item, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={
                      isFilterOpen
                        ? items.activeGrid === 0
                          ? 12
                          : 6
                        : items.activeGrid === 0
                        ? 6
                        : 4
                    }
                    md={
                      isFilterOpen
                        ? items.activeGrid === 0
                          ? 6
                          : 4
                        : items.activeGrid === 0
                        ? 4
                        : 3
                    }
                    lg={
                      isFilterOpen
                        ? items.activeGrid === 0
                          ? 4
                          : 3
                        : items.activeGrid === 0
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
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Properties;
