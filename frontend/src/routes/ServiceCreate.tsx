import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ServiceForm from "../components/forms/ServiceForm";
import { ServiceFormData } from "../interfaces/form/ServiceFormData";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const ServiceCreate = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    description: "",
    category: "",
    onsiteService: false,
    remoteService: false,
    homeService: false,
    location: {
      calle: "",
      comuna: "",
      region: "",
    },
    schedule: "",
    gallery: [],
    contact: {
      email: "",
      whatsapp: "",
      phone: "",
      urlWeb: "",
      urlPortfolio: "",
      urlInstagram: "",
      urlFacebook: "",
      urlX: "",
      urlTiktok: "",
    },
    user: { _id: "" },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();

    if (user) setFormData({ ...formData, user: { _id: user.id } });
    else {
      console.error("Error al enviar la solicitud, falta el id del usuario.");
      toast.error("Error al enviar la solicitud.");
      return;
    }

    try {
      await axios
        .post(import.meta.env.VITE_API_URL + "/services", formData)
        .then((res) => {
          console.log("Respuesta de la API: ", res);
          toast.success("Tu servicio ha sido publicado.");
          navigate(`/service/${res.data.data._id}`, { replace: true });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error al intentar publicar tu servicio: " + err.message);
        });
    } catch (error) {
      console.error("Error al enviar la solicitud: ", error);
      toast.error("Error al enviar la solicitud.");
    }
  };

  return (
    <div>
      <h2 className="text-center text-slate-200 text-xl m-2">
        Crea un servicio
      </h2>
      <ServiceForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        submitButtonText="Publicar"
      />
    </div>
  );
};

export default ServiceCreate;
