import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./styles.css";
import { Grid, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SecurityIcon from "@mui/icons-material/Security";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Profile from "../SettingsList/Profile";
import Notifications from "../SettingsList/Notifications";
import Offers from "../SettingsList/Offers";
import Verifications from "../SettingsList/Verification";
import Supports from "../SettingsList/Support";
import Earnings from "../SettingsList/Earnings";
import CustomizedBreadcrumbs from "../BreadCrumb";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const SettingsMenu = () => {
  const [value, setValue] = useState(1);
  const [path, setPath] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const query = useQuery();
  const tab = query.get("tab");

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Grid>{children}</Grid>
          </Box>
        )}
      </div>
    );
  }

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        className="settingsMenuTitle"
        onClick={(event) => {
          handleNavigation(event);
        }}
        {...props}
      />
    );
  }
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const handleNavigation = (event) => {
    event.preventDefault();

    console.log("tab", event.target.pathname.split("settings")[1]);
    console.log("tab2", event.target.pathname);
    setPath(event.target.pathname.split("/"));
  };

  console.log("tabpath", path);

  useEffect(() => {
    console.log("tabpath", path);
    console.log(path);
    if (path) {
      navigate(`/settings?${path[path?.length - 1]}`);
    }
  }, [path]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  useEffect(() => {
    if (tab) {
      switch (tab) {
        case 'profile':
          setValue(1)
          break;
      
        case 'notifications':
          setValue(2)
          break;
      
        case 'offers':
          setValue(3)
          break;
      
        case 'verifications':
          setValue(4)
          break;
      
        case 'account-support':
          setValue(5)
          break;
        case 'earnings':
          setValue(6)
          break;
      
        default:
          break;
      }
    }
  }, []);


  console.log("tab",tab)
  return (
    <>
      <Grid
      sm={12}
      container
        className="settingsMenu"
        sx={{ bgcolor: "background.paper", display: "flex" }}
      >
        <Grid className="settingsMenuContainer" container sm={2} >
          <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            variant="scrollable"
            aria-label="nav tabs example"
            className="settingsMenuTabContainer"
          >
            <LinkTab
              label="SETTINGS"
              disabled
              style={{ color: "black", fontWeight: "bold" }}
              {...a11yProps(0)}
            >
              SETTINGS
            </LinkTab>

            <LinkTab
              icon={<AccountCircleIcon />}
              iconPosition="start"
              label="Profile"
              href="tab=profile"
              {...a11yProps(1)}
            />
            <LinkTab
              icon={<NotificationsActiveIcon />}
              iconPosition="start"
              label="Notifications"
              href="tab=notifications"
              {...a11yProps(2)}
            />
            <LinkTab
              icon={<LocalOfferIcon />}
              iconPosition="start"
              label="Offers"
              href="tab=offers"
              {...a11yProps(3)}
            />
            <LinkTab
              icon={<CreditCardIcon />}
              iconPosition="start"
              label="Verifications"
              href="tab=verifications"
              {...a11yProps(4)}
            />
            <LinkTab
              icon={<SecurityIcon />}
              iconPosition="start"
              label="Account Support"
              href="tab=account-support"
              {...a11yProps(5)}
            />
            <LinkTab
              icon={<AttachMoneyIcon />}
              iconPosition="start"
              label="Earnings"
              href="tab=earnings"
              {...a11yProps(6)}
            />
          </Tabs>
        </Grid>
        <Grid md={9} sm={12} className='settingsContent' py={2}>
      <CustomizedBreadcrumbs tab={tab}
       path={path} setPath={setPath} value={value} setValue={setValue}
      />

          <TabPanel value={value} index={0}></TabPanel>
          <TabPanel value={value} index={1}>
            <Profile />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Notifications />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Offers />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Verifications />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Supports />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <Earnings/>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingsMenu;
