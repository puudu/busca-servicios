import React, { useEffect, useState } from "react";
import ServiceForm from "../components/forms/ServiceForm";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "../context/userContext";
import { ServiceFormData } from "../interfaces/form/ServiceFormData";
import { useNavigate, useParams } from "react-router-dom";

const ServiceEdit = () => {
  let { id } = useParams<{ id: string }>();
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
    user: {
      _id: "",
    },
  });

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl + "/services/" + id)
      .then((res: { data: { data: ServiceFormData } }) => {
        const serviceData = res.data.data;

        // Niega el acceso a quien no es propietario
        if (serviceData.user?._id !== user?.id)
          navigate(`/`, { replace: true });

        setFormData({
          title: serviceData.title || "",
          description: serviceData.description || "",
          category: serviceData.category || "",
          onsiteService: serviceData.onsiteService || false,
          remoteService: serviceData.remoteService || false,
          homeService: serviceData.homeService || false,
          location: {
            calle: serviceData.location?.calle || "",
            comuna: serviceData.location?.comuna || "",
            region: serviceData.location?.region || "",
          },
          schedule: serviceData.schedule || "",
          gallery: serviceData.gallery || [],
          contact: {
            email: serviceData.contact?.email || "",
            whatsapp: serviceData.contact?.whatsapp || "",
            phone: serviceData.contact?.phone || "",
            urlWeb: serviceData.contact?.urlWeb || "",
            urlPortfolio: serviceData.contact?.urlPortfolio || "",
            urlInstagram: serviceData.contact?.urlInstagram || "",
            urlFacebook: serviceData.contact?.urlFacebook || "",
            urlX: serviceData.contact?.urlX || "",
            urlTiktok: serviceData.contact?.urlTiktok || "",
          },
          user: {
            _id: serviceData.user?._id || "",
          },
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    console.log("hola");

    await axios
      .patch(import.meta.env.VITE_API_URL + "/services/" + id, formData)
      .then((res) => {
        console.log("Respuesta de la API: ", res);
        toast.success("Tu servicio ha sido actualizado.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error al intentar actualizar tu servicio: " + err.message);
      });
  };

  return (
    <div>
      <h2 className="text-center text-slate-200 text-xl m-2">
        Edita tu servicio
      </h2>
      <ServiceForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        submitButtonText="Actualizar"
      />
    </div>
  );
};

export default ServiceEdit;
