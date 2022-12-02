// Libraries
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { ChakraProvider } from "@chakra-ui/react";

// Pages
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdatePassword from "./pages/UpdatePassword"
import DeleteAccount from "./pages/DeleteAccount";
import Search from "./pages/Search";
import DisplayPlaylists from "./pages/DisplayPlaylists";
import ActivationAccount from "./pages/ActivationAccount";
import Policies from "./pages/Policies";
import AdminActivation from "./pages/AdminActivation"
import AdminReviewAccess from "./pages/AdminReviewAccess";

// Styling
import './index.css'

export default function App() {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <CookiesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="start" element={<Start />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="updatePassword" element={<UpdatePassword />} />
                <Route path="search" element={<Search />} />
                <Route path="playlists" element={<DisplayPlaylists />} />
                <Route path="deleteAccount" element={<DeleteAccount />} />
                <Route path="activation" element={<ActivationAccount />} />
                <Route path="policies" element={<Policies />} />
                <Route path="adminActivation" element={<AdminActivation />} />
                <Route path="adminReviewAccess" element={<AdminReviewAccess />} />
              {/* <Route path="*" element={<NoPage />} /> */}
              </Route>
            </Routes>
          </BrowserRouter>
        </CookiesProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));