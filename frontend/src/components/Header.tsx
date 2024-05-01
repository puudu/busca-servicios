import { NavLink } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../interfaces/User";
import LogoutButton from "./buttons/LogoutButton";

const Header = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    if (user) {
      axios
        .get(import.meta.env.VITE_API_URL + "/users/" + user.id)
        .then((res) => setUserData(res.data.data))
        .catch((err) => console.error(err.message));
    }
  }, [user]);

  return (
    <header>
      <div className="bg-purple-500 py-0.5"></div>
      <div className="bg-slate-900 py-3 px-1 flex justify-between">
        <div className="flex">
          <NavLink
            className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md"
            to={"/services"}
          >
            Busca un servicio
          </NavLink>
          <NavLink
            className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md"
            to={"/services/create"}
          >
            Publica un servicio
          </NavLink>
        </div>
        <div className="flex">
          {userData ? (
            <>
              <NavLink
                className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md"
                to={"/profile/" + userData._id}
              >
                {userData.username}
              </NavLink>
              <LogoutButton className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md" />
            </>
          ) : (
            <>
              <NavLink
                className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md"
                to={"/login"}
              >
                Iniciar sesion
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
