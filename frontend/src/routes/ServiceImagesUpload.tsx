import { useEffect, useState } from "react";
import ImageUploadForm from "../components/forms/upload-images/ImageUploadForm";
import { useParams } from "react-router-dom";
import { useUser } from "../context/userContext";
import { Service } from "../interfaces/Service";
import axios from "axios";

const MyComponent = () => {
  let { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const [service, setService] = useState<Service>();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // comprobar que el usuario este logeado y es propietario del servicio

    // leer las imagenes del servicio

    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl + "/services/" + id)
      .then((res) => {
        setService(res.data.data);
        setImages(res.data.data.images);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  const handleImagesChange = (imageFiles: File[]) => {
    // Aquí puedes manejar la lógica para guardar las nuevas imágenes en tu estado o enviarlas al servidor
    console.log("Nuevas imágenes:", imageFiles);
  };

  const handleImagesSend = () => {
    console.log("Enviando imagenes:", images);
  };

  return (
    <div>
      <h1>Subir imágenes</h1>
      <ImageUploadForm images={images} onImagesChange={handleImagesChange} />
      <button onClick={handleImagesSend}>Aceptar</button>
    </div>
  );
};

export default MyComponent;
