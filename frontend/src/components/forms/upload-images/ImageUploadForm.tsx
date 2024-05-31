import { useState } from "react";
import ImageField from "./ImageField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUpload } from "@fortawesome/free-solid-svg-icons";

interface Props {
  filledImages: string[]
  onImagesChange: (images: File[]) => void;
  onImageSend: (images: File[]) => void;
  onReturn: () => void;
}

const ImageUploadForm = ({  filledImages, onImagesChange, onImageSend, onReturn }: Props) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (file: File, index: number) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = file;
    setImageFiles(newImageFiles);
    onImagesChange(newImageFiles);
  };

  // Rellenar el array de imágenes con campos vacíos si es necesario

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onImageSend(imageFiles);
  };

  return (
    <form onSubmit={handleSubmit}>
      {filledImages.map((image, index) => (
        <div key={index}>
          <ImageField
            image={image}
            onChange={(file) => handleImageChange(file, index)}
          />
        </div>
      ))}
      <div className="flex justify-center">
        <button className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md" type="submit">     <FontAwesomeIcon icon={faUpload} className="mr-1.5" /> Subir</button>
        <button className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md" onClick={onReturn}><FontAwesomeIcon icon={faArrowLeft} className="mr-1.5" /> Volver</button>
      </div>
    </form>
  );
};

export default ImageUploadForm;
