import { useEffect, useState } from "react";
import FormInput from "../components/forms/FormInput";
import { useUser } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

interface FormData {
  fullname: string;
  certification: string;
  description: string;
  photo: string;
}

const EditProfile = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    certification: "",
    description: "",
    photo: "",
  });

  useEffect(() => {
    if (user) {
      axios
        .get(import.meta.env.VITE_API_URL + "/users/" + user.id)
        .then(
          (res: {
            data: {
              data: FormData;
            };
          }) =>
            setFormData({
              fullname: res.data.data.fullname,
              certification: res.data.data.certification,
              description: res.data.data.description,
              photo: res.data.data.photo,
            })
        )
        .catch((err) => console.error(err.message));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
  ) => {
    if (e.target.type === "file" && e.target.files) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    if (user) {
      try {
        axios
          .patch(import.meta.env.VITE_API_URL + "/users/" + user.id, formData)
          .then((res) => {
            if (res.data.status == "success") {
              toast.success("Tu perfil ha sido actualizado exitosamente.");
            }
          });
      } catch (err) {
        console.error(err);
        toast.error("Ocurrió un error al actualizar tu perfil.");
      }
    }
  };

  return (
    <div>
      <h2 className="text-center text-lg text-slate-300 p-2">
        Edita la información de tu perfil
      </h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nombre completo"
          type="text"
          name="fullname"
          isRequired={false}
          placeholder="Escribe tu nombre y apellidos"
          size={70}
          value={formData.fullname}
          onChange={handleChange}
        />
        <FormInput
          label="Certificaciones"
          type="text"
          name="certification"
          isRequired={false}
          placeholder="Escribe tus certificaciones"
          size={70}
          value={formData.certification}
          onChange={handleChange}
        />
        <FormInput
          label="Sobre ti"
          type="text"
          name="description"
          isRequired={false}
          placeholder="Escribe mayor información sobre ti y lo que haces"
          size={70}
          value={formData.description}
          onChange={handleChange}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-slate-700 p-2 text-slate-400 rounded-md hover:bg-slate-600"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
