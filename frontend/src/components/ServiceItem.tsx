import { Link, NavLink } from "react-router-dom";
import { Service } from "../interfaces/Service";
import { format } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEye,
  faEyeSlash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  service: Service;
  isAdmin: boolean;
  isOwner: boolean;
};

const ServiceItem = ({ service, isAdmin = true, isOwner = true }: Props) => {
  const userImg =
    import.meta.env.VITE_BACKEND_URL + "/img/users/" + service.user.photo;

  const handleDelete = () => {
    axios
      .delete(import.meta.env.VITE_API_URL + "/services/" + service._id)
      .then(() => {
        toast.success("Publicación borrada correctamente.");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Hubo un error al intentar borrar la publicación del servicio."
        );
      });
  };

  const handleHide = () => {
    axios
      .patch(import.meta.env.VITE_API_URL + "/services/" + service._id, {
        hide: !service.hide,
      })
      .then(() => {
        toast.success("Publicación ocultada.");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Error al ocultar la publicación.");
        console.error("Error al iniciar sesión:", err);
      });
  };

  return (
    <>
      <Link to={"/service/" + service._id}>
        <div className=" bg-slate-900 border-slate-600 border-2 rounded-md hover:border-purple-700 p-2 mb-2">
          <div className="flex items-center">
            <img
              src={userImg}
              className="rounded-full w-8 h-8"
              style={{ objectFit: "cover" }}
              alt="user profile image"
            />
            {service.user.fullname ? (
              <h3 className="text-slate-400 ml-1">{service.user.fullname}</h3>
            ) : (
              <h3 className="text-slate-400 ml-1">{service.user.username}</h3>
            )}
          </div>
          <h3 className="text-slate-200 text-lg">{service.title}</h3>
          <h2 className="text-slate-400">{service.category.name}</h2>
          <h2 className="text-slate-400">{service.schedule}</h2>
          {!service.onsiteService || (
            <h2 className="text-slate-400 text-sm">✔ En local</h2>
          )}
          {!service.remoteService || (
            <h2 className="text-slate-400 text-sm">✔ Remoto</h2>
          )}
          {!service.homeService || (
            <h2 className="text-slate-400 text-sm">✔ A domicilio</h2>
          )}
          <h2 className="text-slate-200 flex items-end">
            ⭐{service.ratingsAverage}
            <p className="text-sm ml-1">({service.ratingsQuantity} reseñas)</p>
          </h2>
          <h2 className="text-slate-400">
            Publicado el {format(service.createdAt, "dd-MM-yyyy")}
          </h2>
        </div>
      </Link>
      {isAdmin && (
        <div className="mb-6 flex justify-end">
          {isOwner && (
            <>
              <NavLink
                to={`/services/edit/${service._id}`}
                className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-100 rounded-md py-1 px-2 mr-1.5 flex items-center"
              >
                <FontAwesomeIcon icon={faPen} className="mr-1" />
                Editar
              </NavLink>
            </>
          )}
          <button
            onClick={handleDelete}
            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-slate-100 rounded-md py-1 px-2 mr-1.5 flex items-center"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-1" />
            Eliminar
          </button>
          <button
            onClick={handleHide}
            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-slate-100 rounded-md py-1 px-2 mr-1.5 flex items-center"
          >
            <FontAwesomeIcon
              icon={service.hide ? faEyeSlash : faEye}
              className="mr-1"
            />
            {service.hide ? "Oculto" : "Público"}
          </button>
        </div>
      )}
    </>
  );
};

export default ServiceItem;
