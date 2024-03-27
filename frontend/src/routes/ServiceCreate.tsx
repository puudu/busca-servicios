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

    setRegiones([]);
  }, []);

  const handleRegionChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const region = e.target.value;
    // obtener comunas de la region mediante un GET a la API

    setComunas([]);
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          name="region"
          id="region"
          value={formData.location.region}
          onChange={(e) => {
            handleChange(e);
            handleRegionChange(e);
          }}
        >
          {regiones.map((region) => (
            <option key={region.id} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
        <label htmlFor="comuna"></label>
        <select
          name="comuna"
          id="comuna"
          value={formData.location.comuna}
          onChange={handleChange}
        >
          {comunas.map((comuna) => (
            <option key={comuna.id} value={comuna.name}>
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
          <label htmlFor="email">Correo electronico</label>
          <FormInput
            label="email"
            type="email"
            name="email"
            isRequired={false}
            placeholder="correo@ejemplo.com"
            size={20}
            value={formData.contact.email}
            onChange={handleChange}
          />
          <label htmlFor="phone">Nro. telefonico</label>
          <FormInput
            label="phone"
            type="text"
            name="phone"
            isRequired={false}
            placeholder="+56912345678"
            size={20}
            value={formData.contact.phone}
            onChange={handleChange}
          />
          <label htmlFor="whatsapp">WhatsApp</label>
          <FormInput
            label="whatsapp"
            type="text"
            name="whatsapp"
            isRequired={false}
            placeholder="+56912345678"
            size={20}
            value={formData.contact.whatsapp}
            onChange={handleChange}
          />
          <label htmlFor="urlWeb">Enlace Web</label>
          <FormInput
            label="urlWeb"
            type="url"
            name="urlWeb"
            isRequired={false}
            placeholder="https://www.ejemplo.cl"
            size={20}
            value={formData.contact.phone}
            onChange={handleChange}
          />
          <label htmlFor="urlPortfolio">Enlace portafolio</label>
          <FormInput
            label="urlPortfolio"
            type="url"
            name="urlPortfolio"
            isRequired={false}
            placeholder="https://www.ejemplo.cl"
            size={20}
            value={formData.contact.urlPortfolio}
            onChange={handleChange}
          />
          <label htmlFor="urlIntagram">Enlace Instagram</label>
          <FormInput
            label="urlIntagram"
            type="url"
            name="urlIntagram"
            isRequired={false}
            placeholder="https://www.instagram.com/"
            size={20}
            value={formData.contact.urlIntagram}
            onChange={handleChange}
          />
          <label htmlFor="urlFacebook">Enlace Facebook</label>
          <FormInput
            label="urlFacebook"
            type="url"
            name="urlFacebook"
            isRequired={false}
            placeholder="https://www.facebook.com/"
            size={20}
            value={formData.contact.urlFacebook}
            onChange={handleChange}
          />
          <label htmlFor="urlX">Enlace Twitter/X</label>
          <FormInput
            label="urlX"
            type="url"
            name="urlX"
            isRequired={false}
            placeholder="https://www.facebook.com/"
            size={20}
            value={formData.contact.urlX}
            onChange={handleChange}
          />
          <label htmlFor="urlTiktok">Enlace Tiktok</label>
          <FormInput
            label="urlTiktok"
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
