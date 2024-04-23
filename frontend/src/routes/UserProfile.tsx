import { useEffect, useState } from "react";
import { User } from "../interfaces/User";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Service } from "../interfaces/Service";
import ServicesList from "../components/ServicesList";

const UserProfile = () => {
  let { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl + "/users/" + id)
      .then((res) => setUser(res.data.data))
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
          src={import.meta.env.VITE_BACKEND_URL + "/img/users/" + user?.photo}
          alt={user?.username + " photo"}
          className="m-auto flex rounded-full lg:m-2 w-40 h-40"
          style={{ objectFit: "cover" }}
        />
        <div className="m-3 w-full">
          <p className="font-semibold">{user?.username}</p>
          <p className="ml-3">{user?.fullname}</p>
          <p className="ml-3">{user?.certification}</p>
          <p className="font-semibold">Acerca de:</p>
          {user?.description ? (
            <p className="ml-3">{user?.description}</p>
          ) : (
            <p className="ml-3">No hay información adicional</p>
          )}
        </div>
      </div>
      <hr />
      <div className="">
        <h1 className="text-slate-400 text-center text-lg">
          Servicios publicados
        </h1>
        <ServicesList services={services} />
      </div>
    </>
  );
};

export default UserProfile;
