import { Service } from "../interfaces/Service";
import { Category } from "../interfaces/Category";
import { Region } from "../interfaces/Region";
import { Comuna } from "../interfaces/Comuna";
import { ChangeEventHandler, useEffect, useState } from "react";
import axios from "axios";
import ServicesList from "../components/ServicesList";

const ServiceSearch = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [comunas, setComunas] = useState<Comuna[]>([]);

  const [formData, setFormData] = useState({
    category: "",
    region: "",
    comuna: "",
    page: 1,
  });

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl + "/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err.message));
    axios
      .get(apiUrl + "/regiones")
      .then((res) => setRegiones(res.data.data))
      .catch((err) => console.error(err.message));
    axios
      .get(apiUrl + "/comunas")
      .then((res) => setComunas(res.data.data))
      .catch((err) => console.error(err.message));
    axios
      .get(apiUrl + "/services?page=1")
      .then((res) => setServices(res.data.data))
      .catch((err) => console.error(err.message));
  }, []);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();

    // Enviar los filtros a la API
    let url = import.meta.env.VITE_API_URL + "/services";

    if (formData.category !== "") url += "?category=" + formData.category;
    if (formData.region !== "") url += "?region=" + formData.region;
    if (formData.comuna !== "") url += "?comuna=" + formData.comuna;

    await axios
      .get(url)
      .then((res) => setServices(res.data.data))
      .catch((err) => console.error(err.message));
  };

  return (
    <div>
      {categories.length > 0 && regiones.length > 0 && comunas.length > 0 ? (
        <form onSubmit={handleSearchSubmit}>
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option key={0} value={""}>
              -
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="region">Region</label>
          <select
            name="region"
            id="category"
            value={formData.region}
            onChange={handleChange}
          >
            <option key={0} value={""}>
              -
            </option>
            {regiones.map((region) => (
              <option key={region._id} value={region._id}>
                {region.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="comuna">Comuna</label>
          <select
            name="comuna"
            id="comuna"
            value={formData.comuna}
            onChange={handleChange}
          >
            <option key={0} value={""}>
              -
            </option>
            {comunas.map((comuna) => (
              <option key={comuna._id} value={comuna._id}>
                {comuna.name}
              </option>
            ))}
          </select>
          <button type="submit">Filtrar</button>
        </form>
      ) : (
        <p>Cargando...</p>
      )}
      <ServicesList services={services} />
    </div>
  );
};

export default ServiceSearch;
