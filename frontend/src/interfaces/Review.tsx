export interface Review {
  _id: string;
  text: string;
  rating: number;
  createdAt: string;
  service: string;
  user: {
    _id: string;
    username: string;
    photo: string;
  };
}
