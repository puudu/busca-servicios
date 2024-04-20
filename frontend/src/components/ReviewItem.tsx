import { format } from "date-fns";
import { Review } from "../interfaces/Review";

type Props = {
  review: Review;
};

const ReviewItem = ({ review }: Props) => {
  const stars = "⭐".repeat(review.rating);
  const date = format(review.createdAt, "dd-MM-yyyy");

  return (
    <div className="bg-slate-800 rounded-md p-2 border border-slate-700">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex justify-start items-center">
          <img
            className="rounded-full w-8 h-8"
            src={
              import.meta.env.VITE_BACKEND_URL +
              "/img/users/" +
              review.user.photo
            }
            alt={review.user.username + " user photo"}
          />
          <p className="ml-2">{review.user.username}</p>
        </div>
        <p className="ml-2 text-xs text-slate-500">{date}</p>
      </div>
      <div className="text-lg">{stars}</div>
      <p>{review.text}</p>
    </div>
  );
};

export default ReviewItem;
