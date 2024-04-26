import { useState } from "react";
import FormInput from "../components/forms/FormInput";

interface FormData {
  fullname: string;
  certification: string;
  description: string;
  photo: string;
}

const EditProfile = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    certification: "",
    description: "",
    photo: "",
  });

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
    try {
      console.log(formData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Edita tu perfil</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nombre completo"
          type="text"
          name="fullname"
          isRequired={false}
          placeholder="Escribe tu nombre y apellidos"
          size={50}
          value={formData.fullname}
          onChange={handleChange}
        />
        <FormInput
          label="Certificaciones"
          type="text"
          name="certification"
          isRequired={false}
          placeholder="Escribe tus certificaciones"
          size={50}
          value={formData.certification}
          onChange={handleChange}
        />
        <FormInput
          label="Sobre ti"
          type="text"
          name="description"
          isRequired={false}
          placeholder="Escribe mayor información sobre ti y lo que haces"
          size={50}
          value={formData.description}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default EditProfile;
