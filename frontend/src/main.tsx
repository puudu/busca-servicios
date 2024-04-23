import React from "react";
import ReactDOM from "react-dom/client";
import "../public/css/output.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "./routes/Home.tsx";
import ServiceCreate from "./routes/ServiceCreate.tsx";
import ServiceSearch from "./routes/ServiceSearch.tsx";
import Header from "./components/Header.tsx";
import ServiceCreateSuccess from "./routes/ServiceCreateSuccess.tsx";
import UserProfile from "./routes/UserProfile.tsx";
import ServiceDetails from "./routes/ServiceDetails.tsx";
import Footer from "./components/Footer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="bg-slate-800">
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="services">
            <Route path="" element={<ServiceSearch />} />
            <Route path="create" element={<ServiceCreate />} />
            <Route path="create/success" element={<ServiceCreateSuccess />} />
          </Route>
          <Route path="service/:id" element={<ServiceDetails />} />
          <Route path="/profile/:id" element={<UserProfile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  </div>
);
