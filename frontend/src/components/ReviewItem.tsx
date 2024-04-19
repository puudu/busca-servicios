import { format } from "date-fns";
import { Review } from "../interfaces/Review";

const ReviewItem = ({
  _id,
  text,
  rating,
  createdAt,
  user,
  service,
}: Review) => {
  const stars = "⭐".repeat(rating);
  return (
    <div className="bg-slate-800 rounded-md p-2 border border-slate-700">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex justify-start items-center">
          <img
            className="rounded-full w-8 h-8"
            src={import.meta.env.VITE_BACKEND_URL + "/img/users/" + user.photo}
            alt={user.username + " user photo"}
          />
          <p className="ml-2">{user.username}</p>
        </div>
        <p className="ml-2 text-xs text-slate-500">
          {format(createdAt, "dd-MM-yyyy")}
        </p>
      </div>
      <div className="text-lg">{stars}</div>
      <p>{text}</p>
    </div>
  );
};

export default ReviewItem;
