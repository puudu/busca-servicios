import React from "react";
import ReactDOM from "react-dom/client";
import "../public/css/output.css";
// import { createHashRouter, RouterProvider } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/Home.tsx";
import ServiceCreate from "./routes/ServiceCreate.tsx";
import ServiceSearch from "./routes/ServiceSearch.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/services/create", element: <ServiceCreate /> },
  { path: "/services/search", element: <ServiceSearch /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
