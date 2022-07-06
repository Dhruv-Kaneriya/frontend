import { useLocation } from "react-router-dom";
import { ReactComponent as IconLighting } from "../../assets/lightningIcon.svg";
import { ReactComponent as IconSecurity } from "../../assets/securityIcon.svg";
import { ReactComponent as IconCart } from "../../assets/cartIcon.svg";
import { ReactComponent as IconReview } from "../../assets/reviewIcon.svg";

import "./style/index.css";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGetBookDetailQuery } from "../../reduxStore/api-slice";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reduxStore/cart-slice";
import { Alert, Rating, Snackbar } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ProductDetails() {
  const [quantity, setQuantity] = React.useState(1);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const increament = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispath = useDispatch();

  const location = useLocation();

  const { data } = useGetBookDetailQuery(location.state.id);

  const addToCartHandler = () => {
    setOpen(true);
    const cartItem = {
      title: data.data.title,
      coverImg: data.data.coverImg,
      price: data.data.price,
      quantity: quantity,
      author: data.data.author,
    };
    dispath(addToCart(cartItem));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {data && (
        <div className="bg-offwhite">
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <div className="mt-8 ml-10 rounded-md bookImgWrapper">
                <img
                  src={data.data.coverImg}
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="col-span-9 pl-4">
              <div className="mt-8 space-x-1 font-bold text-secondary text-purple">
                {data.data.title}
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <Rating name="read-only" value={data.data.rating} readOnly />
                  <p className="ml-4 font-bold text-purple text-menu">
                    {data.data.rating}
                  </p>
                </div>
                <div className="flex items-center mr-32">
                  <IconReview className="w-6 h-6 mr-2 stroke-orange" />
                  <p className="font-bold text-purple">
                    {data.data.bbeScore} &nbsp;bbeScore
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-12 mt-2">
                <div className="col-span-6">
                  <div className="grid grid-cols-12">
                    <div className="col-span-4">
                      <div className="grid content-between authorNameWrapper">
                        <div className="text-menu text-lightpurple">
                          Written By
                        </div>
                        <div className="font-bold text-para text-purple whitespace-nowrap text-ellipsis">
                          {data.data.author[0]}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="grid content-between authorNameWrapper">
                        <div className="text-menu text-lightpurple">
                          Publisher
                        </div>
                        <div className="font-bold text-para text-purple whitespace-nowrap">
                          {data.data.publisher}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="grid content-between authorNameWrapper">
                        <div className="text-menu text-lightpurple">Year</div>
                        <div className="font-bold text-para text-purple whitespace-nowrap">
                          {data.data.publishDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="grid grid-cols-12">
                    <div className="grid content-center col-span-5 statusWrapper">
                      <div className="px-1 py-2 text-center flex  items-center border-[0.5px] rounded-sm border-lightpurple text-menu justify-center text-purple font-bold">
                        <IconLighting className="w-8 h-8 mr-2 stroke-purple" />
                        FREE SHIPPING
                      </div>
                    </div>
                    <div className="grid content-center col-span-6 ml-4 statusWrapper">
                      <div className="px-1 py-2 text-center flex  items-center border-[0.5px] rounded-sm border-lightpurple text-menu justify-center text-green-500 font-bold">
                        <IconSecurity className="w-8 h-8 mr-2 stroke-green-500" />
                        IN STOCK
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pr-8 mt-6 font-mono font-light text-menu text-purple">
                {data.data.description}
              </div>
              <div className="grid grid-cols-12 mt-8">
                <div className="col-span-4">
                  <div className="grid grid-cols-12">
                    <div className="grid col-span-5 font-bold text-main text-purple">
                      ${data.data.price}
                    </div>
                    <div className="self-end col-span-3 pb-2 text-purple">
                      <del>$16,99</del>
                    </div>
                    <div className="self-end w-2/5 col-span-4 px-3 py-1 mb-3 text-center rounded-md bg-orange text-offwhite">
                      2%
                    </div>
                  </div>
                </div>
                <div className="col-span-6 col-start-6">
                  <div className="flex justify-end">
                    <div class="custom-number-input h-14 w-48">
                      <div class="flex flex-row h-14 w-full rounded-lg relative bg-transparent   mt-1">
                        <button class=" bg-offwhite   border-[0.5px] border-r-0 border-lightpurple  h-full w-20 rounded-l cursor-pointer outline-none">
                          <span
                            class="m-auto text-4xl text-orange font-bold"
                            onClick={decrement}
                          >
                            −
                          </span>
                        </button>
                        <span class=" focus:outline-none px-4 text-center text-purple bg-offwhite font-semibold text-md border-[0.5px] border-lightpurple border-r-0 border-l-0  focus:text-black  md:text-basecursor-default flex items-center   outline-none">
                          {quantity}
                        </span>
                        <button class="bg-offwhite  border-[0.5px] border-lightpurple border-l-0 h-full w-20 rounded-r cursor-pointer">
                          <span
                            class="m-auto text-4xl font-bold text-orange"
                            onClick={increament}
                          >
                            +
                          </span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        className="flex items-center justify-center w-48 mt-1 ml-4 font-bold rounded-sm bg-orange hover:bg-yellow-600 h-14 text-menu text-offwhite"
                        onClick={addToCartHandler}
                      >
                        <IconCart className="w-8 h-8 mr-2 stroke-2" />
                        Add to Cart
                      </button>
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                      >
                        <Alert
                          onClose={handleClose}
                          severity="success"
                          sx={{ width: "100%" }}
                        >
                          Item Added to cart
                        </Alert>
                      </Snackbar>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-8 ml-20">
            <div className="col-span-8">
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange} aria-label="">
                    <Tab label="Details Product" {...a11yProps(0)} />
                    <Tab label="Customer Reviews" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        Book Series
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.series}
                      </p>
                    </div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        authors
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.author.map((item) => (
                          <p>{item}</p>
                        ))}
                      </p>
                    </div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        language
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.language}
                      </p>
                    </div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        ISBN
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.isbn}
                      </p>
                    </div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        Pages
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.pages}
                      </p>
                    </div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        Genres
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.genres.map((item) => (
                          <p>{item}</p>
                        ))}
                      </p>
                    </div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        Characters
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.characters.map((item) => (
                          <p>{item}</p>
                        ))}
                      </p>
                    </div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        Book Format
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.bookFormat}
                      </p>
                    </div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        Edition
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.edition}
                      </p>
                    </div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        first Publish Date
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.firstPublishData}
                      </p>
                    </div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        awards
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.awards.map((item) => (
                          <p>{item}</p>
                        ))}
                      </p>
                    </div>
                    <div className="flex w-full px-2 py-4 border-b border-b-lightpurple">
                      <p className="w-1/3 font-bold text-para text-purple">
                        settings
                      </p>
                      <p className="w-2/3 text-para text-lightpurple">
                        {data.data.setting.map((item) => (
                          <p>{item}</p>
                        ))}
                      </p>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
              </Box>
            </div>
            <div className="col-span-3">
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
