export interface User {
  _id: string;
  username: string;
  email: string;
  photo: string | undefined;
  fullname: string | undefined;
  certification: string | undefined;
  description: string | undefined;
  role: string;
}
