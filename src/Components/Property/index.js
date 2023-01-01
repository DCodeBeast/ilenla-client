import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Grid } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TooltipWrapper from "../Tooltip";
import { useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ADD_TO_CART } from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";

const Item = styled("a")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: "block",
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "10px",
}));

const Property = ({ item, index, activeGrid }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [counter, setCounter] = useState(
    Math.abs(
      (new Date(item?.saleEndsOn).getTime() - new Date().getTime()) / 1000
    )
  );
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const {cart} = useSelector((state) => state.cart);
  const [respScreen, setRespScreen] = useState(false);
  const dispatch = useDispatch();
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

  const handleBuy = () => {
    console.log("buy");
  };
  const handleFav = () => {
    console.log("fav");
  };

  const handleHover = (id) => {
    console.log("test" + id);

    setHoverIndex(id);
  };
  const RemoveHover = (id) => {
    console.log("hover" + index);
    setHoverIndex(null);
  };

  const formatDays = (time) => {
    // calculate (and subtract) whole days
    var days = Math.floor(time / 86400);
    time -= days * 86400;

    //Return combined values as string in format mm:ss
    return `${days}`;
  };
  const formatHours = (time) => {
    var hours = Math.floor(time / 3600) % 24;
    time -= hours * 3600;

    //Return combined values as string in format mm:ss
    return `${hours}`;
  };
  const formatMinute = (time) => {
    // calculate (and subtract) whole minutes
    var minutes = Math.floor(time / 60) % 60;
    time -= minutes * 60;

    //Return combined values as string in format mm:ss
    return `${minutes}`;
  };
  const padTime = (time) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };
  const formatSeconds = (time) => {
    // what's left is seconds
    var seconds = Math.floor(time % 60);

    //Return combined values as string in format mm:ss
    return `${padTime(seconds)}`;
  };
  const handlePriceFormat = (price) => {
    // what's left is seconds
    let newPrice;
    let suffix;
    if (price >= 1000000) {
      suffix = " M";
      price = (price / 1000000).toFixed(2);
    } else if (price > 10000) {
      suffix = " K";
      price = (price / 1000).toFixed(2);
    }

    newPrice = price;
    newPrice += suffix;
    return newPrice;
  };
  let itemSale =
    [] ||
    item?.saleHistory?.reduce((a, b) =>
      a.dateOfSale > b.dateOfSale ? a : b
    ) ||
    0;

  const handleAddItemToCart = (item) => {
    console.log("hover", hoverIndex);
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  useEffect(() => {
    dispatch({ type: ADD_TO_CART });
  }, []);

  console.log("cart", cart);
  return (
    <Item className={`item ${cart?.some(cart => cart._id === item._id) ? `itemSelected`: ''}`}>
      <Grid>
        <div
          className={`itemMedia ${cart?.some(cart => cart._id === item._id) ? `itemSelected`: ''}`}
          onClick={() => handleAddItemToCart(item)}
          onMouseEnter={() => handleHover(item._id)}
          onMouseLeave={() => RemoveHover(item._id)}
        >
          {hoverIndex === item._id && (
            <>
              <div className="itemPlusLabel">
              {cart?.some(cart => cart._id === item._id) ? 
              
              <CheckCircleIcon style={{ color: "white" }} />:
                <AddCircleIcon style={{ color: "white" }} />}
              </div>

              <div className="itemTypeLabel">For {item.listing}</div>
            </>
          )}
          <img src={item.files[0].secure_url} />
        </div>
        <Grid className="itemInfo" p={1}>
          <Grid container sm={12} justifyContent="space-between">
            <Grid
              xs={7}
              container
              flexDirection="column"
              alignItems="flex-start"
            >
              <Grid className="title">
                {item?.title.length > 20
                  ? `${item?.title.substring(0, 40)} ....`
                  : `${item?.title}`}
              </Grid>
              <Grid className="itemLocation">
                <LocationOnIcon fontSize="10px" /> {item.location}
              </Grid>
            </Grid>
            <Grid container flexDirection="column" xs={5} alignItems="flex-end">
              <Grid className="itemPriceLabel">
                {item.status === "auction" ? "Top Bid" : "Price"}
              </Grid>
              <Grid
                className={activeGrid === 0 ? "itemPrice" : "itemPriceResp"}
              >
                {" "}
                {activeGrid === 0 && !respScreen ? (
                  <>
                    {item?.currency[0]?.split(',')[0] } &nbsp;
                    {new Intl.NumberFormat().format(item.price)}
                  </>
                ) : (
                  <>
                    {item.currency[0]} {handlePriceFormat(item.price)}
                  </>
                )}
              </Grid>
              <Grid
                className={
                  activeGrid === 0 ? "itemLastPrice" : "itemLastPriceResp"
                }
              >
                {item.listing === "rent" ? (
                  <>
                    <TooltipWrapper value="Last Rent Price">
                      <span className="itemLastPriceLabel">Last </span>
                    </TooltipWrapper>

                    {activeGrid === 0 && !respScreen ? (
                      <>
                        {item.currency[0]}{" "}
                        {new Intl.NumberFormat().format(itemSale.amount)}
                      </>
                    ) : (
                      <>
                        {item.currency[0]} {handlePriceFormat(itemSale.amount)}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {`${formatDays(counter)}` <= 7 ? (
                      <>
                        {`${formatDays(counter)}` <= 1 ? (
                          <>
                            {`${formatHours(counter)}` <= 1 ? (
                              <>
                                {`${formatMinute(counter)}` <= 1 ? (
                                  <>
                                    {`${formatSeconds(counter)}` <= 0 ? (
                                      <span className="itemLastPriceLabel">
                                        sale ended
                                      </span>
                                    ) : (
                                      <span className="itemLastPriceLabel">
                                        ends in {formatSeconds(counter)} Sec
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span className="itemLastPriceLabel">
                                    ends in {formatMinute(counter)} Min
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="itemLastPriceLabel">
                                ends in {formatHours(counter)} hours
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="itemLastPriceLabel">
                            ends in {formatDays(counter)} Days
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <TooltipWrapper value="Last Sale Price">
                          <span className="itemLastPriceLabel">Last </span>
                        </TooltipWrapper>

                        {activeGrid === 0 && !respScreen ? (
                          <>
                            {itemSale.currency}{" "}
                            {new Intl.NumberFormat().format(itemSale.amount)}
                          </>
                        ) : (
                          <>
                            {item.currency[0]}{" "}
                            {handlePriceFormat(itemSale.amount)}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container mt={5} justifyContent="space-between">
            <Grid className="itemBuy" onClick={handleBuy}>
              <a href={`/properties/${item._id}`}>
                {/* {item.id === hoverIndex ? (
                  <>
                    {item.status === "auction"
                      ? "Place Bid"
                      : item.listing === "rent"
                      ? "Rent Now"
                      : "Buy Now"}
                  </>
                ) : (
                  <AcUnitIcon fontSize="10px" />
                )}{" "} */}
                Details
              </a>
            </Grid>
            <Grid className="itemFav" onClick={handleFav}>
              <a href="#">
                <FavoriteBorderIcon fontSize="12px" />
                &nbsp;{item?.favoriteCount?.length}{" "}
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Item>
  );
};

export default Property;
