import { Service } from "../interfaces/Service";
import ServiceItem from "./ServiceItem";

type Props = {
  services: Service[];
};

const ServicesList = ({ services }: Props) => {
  return (
    <div>
      {services.map((service) => (
        <ServiceItem key={service._id} service={service} />
      ))}
    </div>
  );
};

export default ServicesList;
