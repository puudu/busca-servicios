import { useEffect, useState } from "react";
import { Review } from "../interfaces/Review";
import axios from "axios";
import ReviewItem from "./ReviewItem";

type Props = {
  serviceId: string;
};

const ReviewsList = ({ serviceId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl + "/reviews/service/" + serviceId)
      .then((res) => {
        setReviews(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err.message);
        setMessage("Ocurrió un error al cargar las reseñas.");
      });
  }, []);

  return (
    <>
      <div className="text-slate-400 grid grid-cols-2 gap-2">
        {reviews ? (
          reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))
        ) : (
          <div className="text-center text-slate-400">{message}</div>
        )}
      </div>
      {reviews.length === 0 && (
        <div className="text-center text-slate-400">No hay reseñas.</div>
      )}
    </>
  );
};

export default ReviewsList;
