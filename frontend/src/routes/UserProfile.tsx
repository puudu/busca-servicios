import { useEffect, useState } from "react";
import { User } from "../interfaces/User";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { Service } from "../interfaces/Service";
import ServicesList from "../components/ServicesList";
import { useUser } from "../context/userContext";

const UserProfile = () => {
  let { id } = useParams<{ id: string }>();
  const { user } = useUser();

  const [userProfileData, setUserProfileData] = useState<User>();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl + "/users/" + id)
      .then((res) => setUserProfileData(res.data.data))
      .catch((err) => console.error(err.message));
    axios
      .get(apiUrl + "/services?user=" + id)
      .then((res) => setServices(res.data.data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <>
      <div className="content-start p-10 lg:flex text-slate-400">
        <img
          src={
            import.meta.env.VITE_BACKEND_URL +
            "/img/users/" +
            userProfileData?.photo
          }
          alt={userProfileData?.username + " photo"}
          className="m-auto flex rounded-full lg:m-2 w-40 h-40"
          style={{ objectFit: "cover" }}
        />
        <div className="m-3 w-full">
          <p className="font-semibold">{userProfileData?.username}</p>
          <p className="ml-3">{userProfileData?.fullname}</p>
          <p className="ml-3">{userProfileData?.certification}</p>
          <p className="font-semibold">Acerca de:</p>
          {userProfileData?.description ? (
            <p className="ml-3">{userProfileData?.description}</p>
          ) : (
            <p className="ml-3">No hay información adicional.</p>
          )}
        </div>
      </div>
      {user?.id === userProfileData?._id && (
        <div className="flex justify-start mx-2">
          <NavLink
            className="bg-slate-700 text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-500 rounded-md"
            to={"/edit-profile"}
          >
            Editar información
          </NavLink>
        </div>
      )}
      <div>
        <h1 className="text-slate-400 text-center text-lg">
          Servicios publicados
        </h1>
        <ServicesList services={services} />
      </div>
    </>
  );
};

export default UserProfile;
