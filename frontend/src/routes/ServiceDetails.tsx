import { Link, NavLink, useParams } from "react-router-dom";
import { Service } from "../interfaces/Service";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import ReviewsList from "../components/ReviewsList";
import ReviewForm from "../components/forms/ReviewForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSquarePen } from "@fortawesome/free-solid-svg-icons";

const ServiceDetails = () => {
  let { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service>();
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl + "/services/" + id)
      .then((res) => setService(res.data.data))
      .catch((err) => {
        console.error(err.message);
        setMessage("Ocurrio un error al intentar obtener el servicio");
      });
  }, []);

  return (
    <div className="text-slate-400">
      {service ? (
        <div>
          <div className="bg-slate-900 text-slate-400 m-2 p-4 rounded-md border border-slate-600">
            <Link
              to={"/profile/" + service.user._id}
              className="flex items-center"
            >
              <img
                src={
                  import.meta.env.VITE_BACKEND_URL +
                  "/img/users/" +
                  service.user.photo
                }
                className="rounded-full w-8 h-8"
                style={{ objectFit: "cover" }}
                width={30}
                alt="user profile image"
              />
              {
                service.user.fullname !== undefined
                ? <h3 className="text-slate-400 ml-1">{service.user.fullname + " (" + service.user.username + ")"}</h3>
                : <h3 className="text-slate-400 ml-1">{service.user.username}</h3>
              }
            </Link>
            <div className="flex items-center">
              <h2 className="text-slate-200 text-lg">{service.title}</h2>
              <p className="ml-1">⭐{service.ratingsAverage}</p>
              <p className="text-sm ml-1">
                ({service.ratingsQuantity} reseñas)
              </p>
            </div>
            <h2 className="text-slate-500">{service.category.name}</h2>
            <p className="text-justify">{service.description}</p>
            <h2 className="text-lg text-slate-300">Atención</h2>
            {!service.onsiteService || (
              <h2 className="text-slate-400 text-sm">🏬 En local</h2>
            )}
            {!service.remoteService || (
              <h2 className="text-slate-400 text-sm">💻 Remoto</h2>
            )}
            {!service.homeService || (
              <h2 className="text-slate-400 text-sm">🏠 A domicilio</h2>
            )}
            <h2 className="text-lg text-slate-300">Locación</h2>
            <p>
              {(service.location.calle ? service.location.calle + ", " : "") +
                service.location.comuna.name +
                ", " +
                service.location.region.name}
            </p>
            {!service.schedule || (
              <div>
                <h2 className="text-lg text-slate-300">Horario</h2>
                <p>{service.schedule}</p>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2 p-2">
              {service.images.map((image, index) => (
                <Link
                  to={
                    import.meta.env.VITE_BACKEND_URL + "/img/services/" + image
                  }
                >
                  <img
                    key={index}
                    className="object-contain h-48 w-96"
                    src={
                      import.meta.env.VITE_BACKEND_URL +
                      "/img/services/" +
                      image
                    }
                    alt={service.title + " imagen"}
                  />
                </Link>
              ))}
            </div>
            <p className="text-slate-400 flex justify-end">
              Publicado el {format(service.createdAt, "dd-MM-yyyy")}
            </p>
          </div>
          <div className="bg-slate-900 text-slate-400 m-2 p-4 rounded-md border border-slate-600">
              <NavLink className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md" to={'/services/edit/' + service._id}>
                <FontAwesomeIcon icon={faPen} className="mr-1.5" />
                Editar información
              </NavLink>
              <NavLink className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md" to={'/services/upload-images/' + service._id}>
              <FontAwesomeIcon icon={faSquarePen} className="mr-1.5" />
                Editar imagenes
              </NavLink>
          </div>
          <div className="bg-slate-900 text-slate-400 m-2 p-4 rounded-md border border-slate-600">
            <h1 className="text-lg">Reseñas</h1>
            <ReviewForm serviceId={service._id} />
            <ReviewsList serviceId={service._id} />
          </div>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default ServiceDetails;
