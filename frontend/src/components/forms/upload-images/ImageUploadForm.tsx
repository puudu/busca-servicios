import React, { useState } from "react";
import ImageField from "./ImageField";

interface Props {
  images: string[];
  onImagesChange: (images: File[]) => void;
}

const ImageUploadForm = ({ images, onImagesChange }: Props) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (file: File, index: number) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = file;
    setImageFiles(newImageFiles);
    onImagesChange(newImageFiles);
  };

  // Agregar la URL del servidor a cada imagen
  const imagesWithServerURL = images.map(
    (image) => `${import.meta.env.VITE_BACKEND_URL}/img/services/${image}`
  );

  // Rellenar el array de imágenes con campos vacíos si es necesario
  const filledImages = [...imagesWithServerURL];
  while (filledImages.length < 6) {
    filledImages.push("");
  }

  return (
    <div>
      {filledImages.map((image, index) => (
        <div key={index}>
          <ImageField
            image={image}
            onChange={(file) => handleImageChange(file, index)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageUploadForm;
