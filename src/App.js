import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import "./App.css";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Properties from "./Pages/Properties";
import PropertyDetails from "./Pages/PropertyDetails";
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import Settings from "./Pages/Settings";
import { AppContextProvider } from "./Contexts";
import { getAllProperties } from "./actions/property";
import { getAllDeals } from "./actions/deals";
import Booking from "./Pages/Booking";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state)

  useEffect(() => {
    dispatch(getAllDeals(1));
  }, [dispatch]);
  const user = JSON.parse(localStorage.getItem("profile"));

  console.log('state',state)
  return (
    <AppContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/properties">
              <Route index element={<Properties />} />
              <Route path=":id" element={<PropertyDetails />} />
            </Route>
            <Route path="/booking">
              <Route index element={<Booking />} />
            </Route>
            <Route path="/settings">
              <Route index element={<Settings />} />
              <Route path=":id" element={<Settings />} />
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Login />}></Route>
            <Route path="/account">
              <Route index element={<Account />} />
              <Route path=":id" element={<Account />} />
              {/* <Route path="drafts" element={<Account />}></Route> */}
            </Route>

            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </div>
      </Router>
     </AppContextProvider>
  );
};

export default App;
