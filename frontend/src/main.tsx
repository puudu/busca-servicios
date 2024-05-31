import React from "react";
import ReactDOM from "react-dom/client";
import "../public/css/output.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServiceCreate from "./routes/ServiceCreate.tsx";
import ServiceSearch from "./routes/ServiceSearch.tsx";
import Header from "./components/Header.tsx";
import UserProfile from "./routes/UserProfile.tsx";
import ServiceDetails from "./routes/ServiceDetails.tsx";
import Footer from "./components/Footer.tsx";
import LogIn from "./routes/LogIn.tsx";
import { UserProvider } from "./context/userContext.tsx";
import SignUp from "./routes/SignUp.tsx";
import EditProfile from "./routes/EditProfile.tsx";
import { Toaster } from "react-hot-toast";
import ServiceEdit from "./routes/ServiceEdit.tsx";
import ServiceImageUpload from "./routes/ServiceImagesUpload.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="bg-slate-800">
    <React.StrictMode>
      <UserProvider>
        <BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
          <Header />
          <Routes>
            <Route path="/" element={<ServiceSearch />} />
            <Route path="services">
              <Route path="" element={<ServiceSearch />} />
              <Route path="create" element={<ServiceCreate />} />
              <Route path="edit/:id" element={<ServiceEdit />} />
              <Route path="upload-images/:id" element={<ServiceImageUpload />} />
            </Route>
            <Route path="service/:id" element={<ServiceDetails />} />
            <Route path="profile/:id" element={<UserProfile />} />
            <Route path="edit-profile/" element={<EditProfile />} />
            <Route path="login/" element={<LogIn />} />
            <Route path="signup/" element={<SignUp />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </React.StrictMode>
  </div>
);
