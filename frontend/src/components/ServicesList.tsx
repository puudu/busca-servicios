import { useEffect, useState } from "react";
import axios from "axios";
import { Service } from "../interfaces/Service";
import { User } from "../interfaces/User";
import { useUser } from "../context/userContext";
import ServiceItem from "./ServiceItem";

type Props = {
  services: Service[];
};

const ServicesList = ({ services }: Props) => {
  const { user } = useUser();
  const [userData, setUserData] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (user) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${user.id}`)
        .then((res) => setUserData(res.data.data))
        .catch((err) => console.error(err.message));
    }
  }, [user]);

  return (
    <div className="p-2">
      {services.map((service) => (
        <ServiceItem
          key={service._id}
          service={service}
          isAdmin={userData?.role === "admin"}
          isOwner={userData?._id === service.user._id}
        />
      ))}
    </div>
  );
};

export default ServicesList;
