import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';

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
    
    toast("Subiendo foto...", {icon: '🎈'});

    if (!selectedFile) {
      console.log('Debes seleccionar una imagen.');
      toast.error("Debes seleccionar una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    console.log(formData)

    try {
      await axios.post(import.meta.env.VITE_API_URL + '/users/user-photo-upload', formData, {
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
    <div className='mx-2 my-auto'>
      <h2 className='text-slate-400'>Selecciona una imagen</h2>
      <form onSubmit={handleSubmit} className='flex justify-center content-center'>
        <input type="file" onChange={handleFileChange} accept="image/*" className="block border shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-slate-700 text-slate-400 file:bg-slate-500 file:text-slate-300 file:border-0 file:me-4 file:py-3 file:px-4" />
        <button type="submit" disabled={!selectedFile} className='hover:bg-slate-400 hover:text-slate-800 border border-slate-400 text-slate-400 rounded-md px-2 ml-1'><FontAwesomeIcon icon={faCircleUp} /> Subir imagen</button>
      </form>
    </div>
  );
};

export default UploadUserPhotoForm;
