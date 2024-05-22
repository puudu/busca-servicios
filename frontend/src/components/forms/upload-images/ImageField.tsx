import React, { ChangeEvent, useEffect, useState } from "react";

interface ImageFieldProps {
  image: string | undefined;
  onChange: (file: File) => void;
}

const ImageField: React.FC<ImageFieldProps> = ({ image, onChange }) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  useEffect(() => {
    setPreviewImage(image);
  }, [image]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  return (
    <div className="flex justify-between">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      )}
    </div>
  );
};

export default ImageField;
