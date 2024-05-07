export interface Service {
  _id: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  onsiteService: boolean;
  remoteService: boolean;
  homeService: boolean;
  location: {
    calle: string;
    comuna: {
      _id: string;
      name: string;
    };
    region: {
      _id: string;
      name: string;
    };
  };
  schedule: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  images: [];
  contact: {
    email: string;
    whatsapp: string;
    phone: string;
    urlWeb: string;
    urlPortfolio: string;
    urlIntagram: string;
    urlFacebook: string;
    urlX: string;
    urlTiktok: string;
  };
  hide: boolean;
  user: {
    _id: string;
    username: string;
    photo: string;
    fullname: string;
  };
}
