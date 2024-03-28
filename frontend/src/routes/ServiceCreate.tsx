import { ChangeEventHandler, useState, useEffect } from "react";
import axios from "axios";
import FormInput from "../components/forms/FormInput";
import { Comuna } from "../interfaces/Comuna";
import { Region } from "../interfaces/Region";

const ServiceCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
      urlIntagram: "",
      urlFacebook: "",
      urlX: "",
      urlTiktok: "",
    },
  });
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [comunas, setComunas] = useState<Comuna[]>([]);

  useEffect(() => {
    // obtener las regiones de la API
    axios
      .get("http://127.0.0.1:5000/api/v1/regiones")
      .then((res) => setRegiones(res.data.data))
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handleRegionChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const region = e.target.value;
    const url = "http://127.0.0.1:5000/api/v1/comunas?region=" + region;
    // obtener comunas de la region mediante un GET a la API
    axios
      .get(url)
      .then((res) => setComunas(res.data.data))
      .catch((err) => console.error(err.message));
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    if (e.target.name.startsWith("location.")) {
      const locationKey = e.target.name.split(".")[1];
      setFormData({
        ...formData,
        location: { ...formData.location, [locationKey]: e.target.value },
      });
    } else if (e.target.name.startsWith("contact.")) {
      const contactKey = e.target.name.split(".")[1];
      setFormData({
        ...formData,
        contact: { ...formData.contact, [contactKey]: e.target.value },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.API_URL + "/services",
        formData
      );
      console.log("Respuesta de la API: ", res);
    } catch (error) {
      console.error("Error al enviar la solicitud: ", error);
    }
  };

  return (
    <div>
      <h2>Crea un servicio</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Titulo"
          type="text"
          name="title"
          isRequired={true}
          placeholder="Reparación de computadores y venta de Hardware"
          size={20}
          value={formData.title}
          onChange={handleChange}
        />
        <FormInput
          label="Descripcion"
          type="text"
          name="description"
          isRequired={true}
          placeholder="Describe de manera detallada los servicios que ofreces"
          size={50}
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="region"></label>
        <select
          name="location.region"
          id="region"
          value={formData.location.region}
          onChange={(e) => {
            handleChange(e);
            handleRegionChange(e);
          }}
        >
          {regiones.map((region) => (
            <option key={region._id} value={region._id}>
              {region.name}
            </option>
          ))}
        </select>
        <label htmlFor="comuna"></label>
        <select
          name="location.comuna"
          id="comuna"
          value={formData.location.comuna}
          onChange={handleChange}
        >
          {comunas.map((comuna) => (
            <option key={comuna._id} value={comuna._id}>
              {comuna.name}
            </option>
          ))}
        </select>
        <FormInput
          label="Calle"
          type="text"
          name="calle"
          isRequired={false}
          placeholder="Av. Juan Carlos 123"
          size={20}
          value={formData.location.calle}
          onChange={handleChange}
        />
        <FormInput
          label="Horario"
          type="text"
          name="schedule"
          isRequired={false}
          placeholder="Lunes a Viernes, desde 9:00 hasta 18:00"
          size={20}
          value={formData.schedule}
          onChange={handleChange}
        />
        <label htmlFor="gallery">Imagenes</label>
        <input
          type="file"
          id="gallery"
          name="gallery"
          accept="image/*"
          multiple
        />
        <div>
          <h3>Datos de contacto</h3>
          <FormInput
            label="Correo electronico"
            type="email"
            name="email"
            isRequired={false}
            placeholder="correo@ejemplo.com"
            size={20}
            value={formData.contact.email}
            onChange={handleChange}
          />
          <FormInput
            label="Nro. telefonico"
            type="text"
            name="phone"
            isRequired={false}
            placeholder="+56912345678"
            size={20}
            value={formData.contact.phone}
            onChange={handleChange}
          />
          <FormInput
            label="WhatsApp"
            type="text"
            name="whatsapp"
            isRequired={false}
            placeholder="+56912345678"
            size={20}
            value={formData.contact.whatsapp}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace Web"
            type="url"
            name="urlWeb"
            isRequired={false}
            placeholder="https://www.ejemplo.cl"
            size={20}
            value={formData.contact.phone}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace portafolio"
            type="url"
            name="urlPortfolio"
            isRequired={false}
            placeholder="https://www.ejemplo.cl"
            size={20}
            value={formData.contact.urlPortfolio}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace Instagram"
            type="url"
            name="urlIntagram"
            isRequired={false}
            placeholder="https://www.instagram.com/"
            size={20}
            value={formData.contact.urlIntagram}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace Facebook"
            type="url"
            name="urlFacebook"
            isRequired={false}
            placeholder="https://www.facebook.com/"
            size={20}
            value={formData.contact.urlFacebook}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace Twitter/X"
            type="url"
            name="urlX"
            isRequired={false}
            placeholder="https://www.facebook.com/"
            size={20}
            value={formData.contact.urlX}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace Tiktok"
            type="url"
            name="urlTiktok"
            isRequired={false}
            placeholder="https://www.tiktok.com/"
            size={20}
            value={formData.contact.urlTiktok}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ServiceCreate;
