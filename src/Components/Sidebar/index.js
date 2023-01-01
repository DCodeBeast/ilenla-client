import React from "react";
import { statusOptions, priceOptions, saleOptions } from "./data";
import {
  locationOptions,
  typeOptions,
  listingOptions,
  roomOptions,
} from "../Search/data";
import FilterRow from "./FilterRow";
import "./styles.css";
import { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Button from "@mui/material/Button";

const Sidebar = ({
  setStatus,
  setPrice,
  setSale,
  setLocation,
  setType,
  setListing,
  setRooms,
  location,
  type,
  rooms,
  listing,
  status,
  sale,
  price,
  handleDelete,
  currency,
  min,
  max,
  setCurrency,
  setMin,
  setMax,
  setIsFilterOpen,
  handleClear
}) => {
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const [respScreen, setRespScreen] = useState(false);

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
      setRespScreen(true);
    } else {
      return;
    }
  }, [screenSize]);

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };
  const handleReset = () => {
    setIsFilterOpen(false);
  };

  return (
    <div className="sidebarFilterCOntainer">
      {respScreen && (
        <>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            py={2}
          >
            <Grid className="filterHero">Filters</Grid>
            <Grid onClick={handleFilterClose}>
              <CancelPresentationIcon />
            </Grid>
          </Grid>
          <hr />
        </>
      )}
      <FilterRow
        value={statusOptions}
        setStatus={setStatus}
        status={status}
        handleDelete={handleDelete}
      />
      <FilterRow
        value={priceOptions}
        setPrice={setPrice}
        price={price}
        currency={currency}
        min={min}
        max={max}
        setCurrency={setCurrency}
        setMax={setMax}
        setMin={setMin}
      />
      <FilterRow
        value={saleOptions}
        setSale={setSale}
        sale={sale}
        handleDelete={handleDelete}
      />
      <FilterRow
        value={locationOptions}
        setLocation={setLocation}
        location={location}
        handleDelete={handleDelete}
      />
      <FilterRow
        value={typeOptions}
        setType={setType}
        type={type}
        handleDelete={handleDelete}
      />
      <FilterRow
        value={listingOptions}
        setListing={setListing}
        listing={listing}
        handleDelete={handleDelete}
      />
      <FilterRow
        value={roomOptions}
        setRooms={setRooms}
        rooms={rooms}
        handleDelete={handleDelete}
      />
      {respScreen && (
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
            <Grid className="filterHero" xs={5.5}>
              <Button variant="contained" onClick={handleClear} className="button colorBtn"  fullWidth>
                Clear All
              </Button>
            </Grid>
            <Grid xs={5.5}>
              <Button variant="outlined" onClick={handleFilterClose} fullWidth>
                Done
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Sidebar;
