import { Service } from "../interfaces/Service";
import { format } from "date-fns";

type Props = {
  service: Service;
};

const ServiceItem = ({ service }: Props) => {
  return (
    <div>
      <h3>{service.title}</h3>
      <h2>{service.category}</h2>
      <h2>{service.schedule}</h2>
      {service.onsiteService || <h2>En local</h2>}
      {service.remoteService || <h2>Remoto</h2>}
      {service.homeService || <h2>A domicilio</h2>}
      <h2>
        ⭐{service.ratingsAverage} <p>({service.ratingsQuantity} reseñas)</p>
      </h2>
      <h2>Publicado el {format(service.createdAt, "dd-MM-yyyy")}</h2>
      <br />
    </div>
  );
};

export default ServiceItem;
