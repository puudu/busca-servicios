import { useEffect, useState } from "react";
import { Review } from "../interfaces/Review";
import axios from "axios";
import ReviewItem from "./ReviewItem";

interface Props {
  serviceId: string;
}

const ReviewsList = ({ serviceId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl + "/reviews/service/" + serviceId)
      .then((res) => setReviews(res.data.data))
      .catch((err) => {
        console.error(err.message);
        setMessage("Ocurrió un error al cargar los comentarios");
      });
  }, []);

  return (
    <div className="text-slate-400">
      {reviews ? (
        reviews.map((review, index) => (
          <ReviewItem
            key={index}
            _id="abc123"
            text="Buenisimo"
            rating={5}
            createdAt="10-10-2022"
            user={{
              _id: "abc",
              username: "copito",
              photo: "default.jpg",
            }}
            service="asdv"
          />
        ))
      ) : (
        <div>{message}</div>
      )}
    </div>
  );
};

export default ReviewsList;
