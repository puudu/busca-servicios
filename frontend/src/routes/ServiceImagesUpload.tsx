import { useEffect, useState } from "react";
import ImageUploadForm from "../components/forms/upload-images/ImageUploadForm";
import { useParams } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const MyComponent = () => {
  let { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  let filledImages = [""];

  const getImages = () => {
    // leer las imagenes del servicio
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl + "/services/" + id)
      .then((res) => {
        setImages(res.data.data.images);
        // si el usuario no esta logeado o si el usuario no es propietario del servicio, se le envia fuera
        if (!user || user.id !== res.data.data.user._id)
          return navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  useEffect(() => {
    getImages();
  }, [id]);

  const handleImagesChange = (newImagesFiles: File[]) => {
    console.log("Nuevas imágenes:", newImagesFiles);
  };

  const handleImagesSend = (newImagesFiles: File[]) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!newImagesFiles) return

    const formData = new FormData();
    newImagesFiles.forEach((file) => {
      formData.append('images', file);
    })

    axios
      .post(apiUrl + "/services/upload-images/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
      .then(async (res) => {
        // obtener el nombre de los archivos
        const uploadedFileNames = res.data.map((path: string) => {
          return path.split("\\").pop();
        });
        const updatedImages = [...images, ...uploadedFileNames];

        await axios
          .patch(apiUrl + "/services/" + id, {images: updatedImages})
          .then(() => {
            console.log("Enviando imagenes:", updatedImages);
            toast.success("Imagenes subidas correctamente.")
            getImages();
            filledImages = [""];
            // return navigate("/service/" + id, { replace: true });
          })
          .catch((err) => {
            console.error(err.message);
            toast.error("Hubo un error al subir las imagenes al servidor. (2)")
          })
        
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Hubo un error al subir las imagenes al servidor. (1)")
      })
  };

  const handleDeleteImage = (filename: string) => {
    axios
      .delete(import.meta.env.VITE_API_URL + "/services/" + id + "/images/" + filename)
      .then(() => {
        toast.success("Imagen eliminada");
        setImages((prevImages) => prevImages.filter(image => image !== filename));
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Hubo un error al eliminar la imagen.");
      });
  };

  const handleReturn = () => {
    return navigate("/service/" + id, { replace: true });
  }
  
  return (
    <div>
    <div className="grid grid-cols-3 gap-2 p-2">
        {images.map((image, index) => (
          <div className="grid grid-cols-1 justify-items-center mt-2" key={index}>
            <img className="object-contain h-48 w-96" src={import.meta.env.VITE_BACKEND_URL + "/img/services/" + image} alt={`service ${image}`} />
            <div className="mt-2">
              <button className="border rounded-md m-auto p-1.5 border-red-500 text-red-500 hover:bg-red-500 hover:text-slate-50" onClick={() => handleDeleteImage(image)}><FontAwesomeIcon icon={faTrash}/> Eliminar</button>
            </div>  
          </div>
        ))}
      </div>
      <h1 className="text-center text-slate-400">Agregar imágenes</h1>
      <ImageUploadForm filledImages={filledImages} onImagesChange={handleImagesChange} onImageSend={handleImagesSend} onReturn={handleReturn}/>
    </div>
  );
};

export default MyComponent;
