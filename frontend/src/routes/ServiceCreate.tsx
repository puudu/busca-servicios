import { ChangeEventHandler, useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import FormInput from "../components/forms/FormInput";
import { Comuna } from "../interfaces/Comuna";
import { Region } from "../interfaces/Region";
import { CheckboxInput } from "../components/forms/CheckboxInput";
import { FormBlock } from "../components/forms/FormBlock";
import { Category } from "../interfaces/Category";

const ServiceCreate = () => {
  const [formData, setFormData] = useState({
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
      urlIntagram: "",
      urlFacebook: "",
      urlX: "",
      urlTiktok: "",
    },
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [comunas, setComunas] = useState<Comuna[]>([]);
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    // obtener las regiones de la API
    axios
      .get(import.meta.env.VITE_API_URL + "/regiones")
      .then((res) => {
        setRegiones(res.data.data);
        regionChange(res.data.data[0]._id);
      })
      .catch((err) => {
        console.error(err.message);
      });
    axios
      .get(import.meta.env.VITE_API_URL + "/categories")
      .then((res) => {
        setCategories(res.data.data);
        const firstCategoryId =
          res.data.data.length > 0 ? res.data.data[0]._id : null;
        setFormData({ ...formData, category: firstCategoryId });
      })
      .catch((err) => console.error(err.message));
  }, []);

  const handleRegionChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const region = e.target.value;
    regionChange(region);
  };

  const regionChange = (region: string) => {
    const url = import.meta.env.VITE_API_URL + "/comunas?region=" + region;
    // obtener comunas de la region mediante un GET a la API
    axios
      .get(url)
      .then((res) => {
        setComunas(res.data.data);
      })
      .catch((err) => console.error(err.message));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    console.log(formData);
  };

  const handleChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });

    console.log(formData);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    setFormData({
      ...formData,
      description: formData.description.replace(/\n/g, "<br>"),
    });
    try {
      await axios
        .post(import.meta.env.VITE_API_URL + "/services", formData)
        .then((res) => {
          console.log("Respuesta de la API: ", res);
          setServerMessage("✔ Tu servicio se a publicado.");
        })
        .catch((err) => {
          setServerMessage(
            "Error al intentar publicar tu servicio: " + err.message
          );
          console.error(err);
        });
    } catch (error) {
      console.error("Error al enviar la solicitud: ", error);
    }
  };

  return (
    <div>
      <h2>Crea un servicio</h2>
      <form onSubmit={handleSubmit}>
        <FormBlock title="Información general">
          <FormInput
            label="Titulo"
            type="text"
            name="title"
            isRequired={true}
            placeholder="Reparación de computadores y venta de Hardware"
            size={50}
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
          <div className="flex justify-between">
            <label htmlFor="category" className="text-slate-400 m-2">
              Categoria
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="px-2 rounded-md bg-slate-500 text-slate-200"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="flex justify-center">
            <CheckboxInput
              label="Servicio en local"
              name="onsiteService"
              isRequired={false}
              checked={formData.onsiteService}
              onChange={handleChangeCheckBox}
              className="mx-2"
            />
            <CheckboxInput
              label="Servicio remoto"
              name="remoteService"
              isRequired={false}
              checked={formData.remoteService}
              onChange={handleChangeCheckBox}
              className="mx-2"
            />
            <CheckboxInput
              label="Servicio a domicilio"
              name="homeService"
              isRequired={false}
              checked={formData.homeService}
              onChange={handleChangeCheckBox}
              className="mx-2"
            />
          </div>
          <br />
          <FormInput
            label="Horario"
            type="text"
            name="schedule"
            isRequired={false}
            placeholder="Lunes a Viernes, desde 9:00 hasta 18:00"
            size={50}
            value={formData.schedule}
            onChange={handleChange}
          />
        </FormBlock>
        <FormBlock title="Ubicación">
          <div className="flex justify-between">
            <label htmlFor="region" className="text-slate-400 m-2">
              Región
            </label>
            <select
              name="location.region"
              id="region"
              value={formData.location.region}
              onChange={(e) => {
                handleChange(e);
                handleRegionChange(e);
              }}
              className="px-2 rounded-md bg-slate-500 text-slate-200"
            >
              {regiones.map((region) => (
                <option key={region._id} value={region._id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="flex justify-between">
            <label htmlFor="comuna" className="text-slate-400 m-2">
              Comuna
            </label>
            <select
              name="location.comuna"
              id="comuna"
              value={formData.location.comuna}
              onChange={handleChange}
              className="px-2 rounded-md bg-slate-500 text-slate-200"
            >
              {comunas.map((comuna) => (
                <option key={comuna._id} value={comuna._id}>
                  {comuna.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <FormInput
            label="Calle"
            type="text"
            name="location.calle"
            isRequired={false}
            placeholder="Av. Juan Carlos 123"
            size={50}
            value={formData.location.calle}
            onChange={handleChange}
          />
        </FormBlock>

        <FormBlock title="Galería">
          <div className="flex justify-between">
            <label htmlFor="gallery" className="text-slate-400 m-2">
              Imagenes
            </label>
            <input
              className="block w-full border shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-slate-700 text-slate-400 file:bg-slate-500 file:text-slate-300 file:border-0 file:me-4 file:py-3 file:px-4"
              type="file"
              id="gallery"
              name="gallery"
              accept="image/*"
              multiple
            />
          </div>
        </FormBlock>

        <FormBlock title="Datos de contacto">
          <FormInput
            label="Correo electronico"
            type="email"
            name="contact.email"
            isRequired={false}
            placeholder="correo@ejemplo.com"
            size={50}
            value={formData.contact.email}
            onChange={handleChange}
          />
          <FormInput
            label="Nro. telefonico"
            type="text"
            name="contact.phone"
            isRequired={false}
            placeholder="+56912345678"
            size={50}
            value={formData.contact.phone}
            onChange={handleChange}
          />
          <FormInput
            label="WhatsApp"
            type="text"
            name="contact.whatsapp"
            isRequired={false}
            placeholder="+56912345678"
            size={50}
            value={formData.contact.whatsapp}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace Web"
            type="url"
            name="contact.urlWeb"
            isRequired={false}
            placeholder="https://www.ejemplo.cl"
            size={50}
            value={formData.contact.urlWeb}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace portafolio"
            type="url"
            name="contact.urlPortfolio"
            isRequired={false}
            placeholder="https://www.ejemplo.cl"
            size={50}
            value={formData.contact.urlPortfolio}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace Instagram"
            type="url"
            name="contact.urlIntagram"
            isRequired={false}
            placeholder="https://www.instagram.com/"
            size={50}
            value={formData.contact.urlIntagram}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace Facebook"
            type="url"
            name="contact.urlFacebook"
            isRequired={false}
            placeholder="https://www.facebook.com/"
            size={50}
            value={formData.contact.urlFacebook}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace Twitter/X"
            type="url"
            name="contact.urlX"
            isRequired={false}
            placeholder="https://www.facebook.com/"
            size={50}
            value={formData.contact.urlX}
            onChange={handleChange}
          />
          <FormInput
            label="Enlace Tiktok"
            type="url"
            name="contact.urlTiktok"
            isRequired={false}
            placeholder="https://www.tiktok.com/"
            size={50}
            value={formData.contact.urlTiktok}
            onChange={handleChange}
          />
        </FormBlock>
        <button type="submit">Enviar</button>
      </form>
      <div>
        <p>{serverMessage}</p>
      </div>
    </div>
  );
};

export default ServiceCreate;
