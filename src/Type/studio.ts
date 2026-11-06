export interface IStudio {
  _id: string;
  title: string;
  category: string;
  overview: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  rating?: number;
  owner: {
    name: string;
    email: string;
  };
}