import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../../context/userContext";
import { NavLink } from "react-router-dom";

type Props = {
  serviceId: string;
};

const ReviewForm = ({ serviceId }: Props) => {
  const { user } = useUser();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const captureRating: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => setRating(parseInt(e.target.value));

  const captureText: React.ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setText(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios
        .post(import.meta.env.VITE_API_URL + "/reviews", {
          rating: rating,
          text: text,
          service: serviceId,
          user: user?.id,
        })
        .then(() => {
          toast.success("Reseña publicada.");
          window.location.reload();
        });
    } catch (err) {
      console.error("Error: ", err);
      toast.error("Hubo un error al enviar la reseña.");
    }
  };

  return (
    // comprobar si el usuario ya ha escrito una reseña

    <div>
      {user ? (
        <form onSubmit={handleSubmit} className="ml-2">
          <h1>Escribe una reseña</h1>
          <div>
            <h4 className="text-sm">Valorización</h4>
            <select
              name="rating"
              id="rating"
              onChange={captureRating}
              value={rating.toString()}
              className="px-2 rounded-md bg-slate-500 text-slate-200"
            >
              <option value={1}>⭐1</option>
              <option value={2}>⭐2</option>
              <option value={3}>⭐3</option>
              <option value={4}>⭐4</option>
              <option value={5}>⭐5</option>
            </select>
          </div>
          <div>
            <h4 className="text-sm">Comentario</h4>
            <textarea
              name="text"
              id="text"
              value={text}
              onChange={captureText}
              className="px-2 rounded-md bg-slate-700 text-slate-200 w-full h-48"
            />
          </div>

          <div className="grid justify-end">
            <button
              type="submit"
              className="px-2 rounded-md border border-slate-500 hover:bg-slate-500 text-slate-200 mt-1.5 mb-4 p-1"
            >
              Enviar
            </button>
          </div>
        </form>
      ) : (
        <h1 className="text-center text-md text-slate-500 mb-3">
          <NavLink to={"/login"} className={"text-purple-500 hover:underline"}>Inicia sesión</NavLink> para escribir una reseña.
        </h1>
      )}
    </div>
  );
};

export default ReviewForm;
