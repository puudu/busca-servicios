import React from "react";
import ReactDOM from "react-dom/client";
import "../public/css/output.css";
// import { createHashRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./routes/Home.tsx";
import ServiceCreate from "./routes/ServiceCreate.tsx";
import ServiceSearch from "./routes/ServiceSearch.tsx";
import Header from "./components/Header.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServiceSearch />} />
        <Route path="/services/create" element={<ServiceCreate />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
