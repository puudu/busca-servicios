import { Service } from "../interfaces/Service";
import ServiceItem from "./ServiceItem";

type Props = {
  services: Service[];
};

const ServicesList = ({ services }: Props) => {
  return (
    <div className="p-2">
      {services.map((service) => (
        <ServiceItem key={service._id} service={service} />
      ))}
    </div>
  );
};

export default ServicesList;
