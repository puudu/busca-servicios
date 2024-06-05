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
    <div className="flex justify-center items-center">
      <div className="m-2">
        <input type="file" accept="image/*" onChange={handleImageChange} className="block border shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-slate-700 text-slate-400 file:bg-slate-500 file:text-slate-300 file:border-0 file:me-4 file:py-3 file:px-4"/>
      </div>
      <div className="m-2">
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageField;
