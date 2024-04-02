export interface Service {
  _id: string;
  title: string;
  description: string;
  category: string;
  onsiteService: boolean;
  remoteService: boolean;
  homeService: boolean;
  location: {
    calle: string;
    comuna: string;
    region: string;
  };
  schedule: string;
  gallery: [];
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
}
