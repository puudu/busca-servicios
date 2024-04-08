import { Service } from "../interfaces/Service";
import { Category } from "../interfaces/Category";
import { Region } from "../interfaces/Region";
import { Comuna } from "../interfaces/Comuna";
import { ChangeEventHandler, useEffect, useState } from "react";
import axios from "axios";
import ServicesList from "../components/ServicesList";
import Pagination from "../components/Pagination";

const ServiceSearch = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [comunas, setComunas] = useState<Comuna[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    category: "",
    region: "",
    comuna: "",
    sort: "",
    page: 1,
  });

  useEffect(() => {
    search();
  }, [formData]); // Ejecutar el efecto cuando formData cambie

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
      .get(apiUrl + "/comunas?sort=name")
      .then((res) => setComunas(res.data.data))
      .catch((err) => console.error(err.message));
    axios
      .get(apiUrl + "/services?page=1")
      .then((res) => {
        setServices(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const nextPage = () => {
    setFormData((prevState) => ({ ...prevState, page: prevState.page + 1 }));
  };

  const previusPage = () => {
    setFormData((prevState) => ({ ...prevState, page: prevState.page - 1 }));
  };

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const search = async () => {
    // Enviar los filtros a la API
    let url = import.meta.env.VITE_API_URL + "/services";

    const { category, region, comuna, sort, page } = formData;

    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (region) params.append("location.region", region);
    if (comuna) params.append("location.comuna", comuna);
    if (sort) params.append("sort", sort);
    params.append("page", page.toString());

    url += `?${params.toString()}`;

    console.log(url);

    await axios
      .get(url)
      .then((res) => {
        setServices(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <div>
      {categories.length > 0 && regiones.length > 0 && comunas.length > 0 ? (
        <form>
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
          <br />
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
          <br />
          <label htmlFor="sort">Ordenar por</label>
          <select
            name="sort"
            id="sort"
            value={formData.sort}
            onChange={handleChange}
          >
            <option value={"ratingsAverage"}>Valorización</option>
            <option value={"createdAt"}>Fecha</option>
          </select>
        </form>
      ) : (
        <p>Cargando...</p>
      )}
      <ServicesList services={services} />
      {services.length === 0 ? null : (
        <Pagination
          previusButton={formData.page === 1 ? true : false}
          nextButton={formData.page === totalPages ? true : false}
          previusFn={previusPage}
          nextFn={nextPage}
        />
      )}
    </div>
  );
};

export default ServiceSearch;
