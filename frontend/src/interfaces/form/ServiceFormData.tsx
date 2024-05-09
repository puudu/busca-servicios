export interface ServiceFormData {
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
  gallery: any[]; // Tipo específico para los elementos de la galería
  contact: {
    email: string;
    whatsapp: string;
    phone: string;
    urlWeb: string;
    urlPortfolio: string;
    urlInstagram: string;
    urlFacebook: string;
    urlX: string;
    urlTiktok: string;
  };
  user: { _id: string };
}
