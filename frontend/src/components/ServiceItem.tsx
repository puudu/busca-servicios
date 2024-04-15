import { Service } from "../interfaces/Service";
import { format } from "date-fns";

type Props = {
  service: Service;
};

const ServiceItem = ({ service }: Props) => {
  const userImg = import.meta.env.VITE_BACKEND_URL + "img/users/" + service.user.photo

  return (
    <div className=" bg-slate-900 border-slate-600 border-2 rounded-md hover:border-purple-700 p-2 mb-2">
      <div className="flex items-center">
        <img src={userImg} className="rounded-full" width={30} alt="user profile image" />
        <h3 className="text-slate-400 ml-1">{service.user.fullname}</h3>
      </div>
      <h3 className="text-slate-200 text-lg">{service.title}</h3>
      <h2 className="text-slate-400">{service.category.name}</h2>
      <h2 className="text-slate-400">{service.schedule}</h2>
      {service.onsiteService || <h2 className="text-slate-400 text-sm">✔ En local</h2>}
      {service.remoteService || <h2 className="text-slate-400 text-sm">✔ Remoto</h2>}
      {service.homeService || <h2 className="text-slate-400 text-sm">✔ A domicilio</h2>}
      <h2 className="text-slate-200 flex items-end">
        ⭐{service.ratingsAverage} <p className="text-sm ml-1">({service.ratingsQuantity} reseñas)</p>
      </h2>
      <h2 className="text-slate-400">Publicado el {format(service.createdAt, "dd-MM-yyyy")}</h2>
    </div>
  );
};

export default ServiceItem;
