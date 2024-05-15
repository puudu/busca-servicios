import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

type Props = {
    userId: string;
}

const UploadUserPhotoForm = ( { userId } : Props ) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      console.log('Debes seleccionar una imagen.');
      toast.error("Debes seleccionar una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      await axios.post(import.meta.env.VITE_API_URL + '/user-photo-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        axios.patch(import.meta.env.VITE_API_URL + '/users/' + userId, {
            "photo": res.data.filename
        })
        .then(() => {
            console.log("Foto actualizada.");
            toast.success("Foto actualizada.");
        })
      })
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      toast.error('Error al subir la imagen');
    }
  };

  return (
    <div>
      <h2>Subir Imagen</h2>
      <form onSubmit={handleSubmit} className='flex justify-center content-center'>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!selectedFile}>Subir Imagen</button>
      </form>
    </div>
  );
};

export default UploadUserPhotoForm;
