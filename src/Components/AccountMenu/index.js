import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./styles.css";
import PropertiesComponent from "../Properties";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AccountMenu = () => {
  const [value, setValue] = useState(0);
  const [path, setPath] = useState();
  const navigate = useNavigate();
  const ref = useRef();
  const query = useQuery();
  const tab = query.get("tab");

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
          <Box>
            <>{children}</>
          </Box>
        )}
      </div>
    );
  }

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        className="accountMenuTitle"
        onClick={(event) => {
          handleNavigation(event);
        }}
        {...props}
      />
    );
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleNavigation = (event) => {
    event.preventDefault();

    console.log("tab", event.target.pathname.split("account")[1]);
    console.log("tab2", event.target.pathname);
    setPath(event.target.pathname.split("/"));
  };

  console.log("tabpath", path);

  useEffect(() => {
    console.log("tabpath", path);
    console.log(path);
    if (path) {
      navigate(`/account?${path[path?.length - 1]}`);
    }
  }, [path]);

  const scrollToCategory = (id) => {
    ref.current.scrollIntoView({ inline: "center" });
  };

  return (
    <>
      <Box sx={{ width: "100%" }} className="accountMenu">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          className="accountMenuTabContainer"
        >
          <LinkTab label="My Properties" href="tab=myproperties" />
          <LinkTab label="Listings" href="tab=listings" />
          <LinkTab label="Activity" href="tab=activity" />
          <LinkTab label="Favorite Properties" href="tab=favorited" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PropertiesComponent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
    </>
  );
};

export default AccountMenu;
