export interface YachtSpec {
  beam: string;
  draft: string;
  engines: string;
  maxSpeed: string;
  cruisingSpeed: string;
  fuelCapacity: string;
  waterCapacity: string;
}

export interface Yacht {
  id: string;
  slug: string;
  name: string;
  builder: string;
  type: string;
  year: number;
  lengthFt: number;
  lengthM: number;
  cabins: number;
  guests: number;
  priceAED: number;
  priceUSD: number;
  location: string;
  status: string;
  isFeatured: boolean;
  hidden?: boolean;
  description: string;
  features: string[];
  specs: YachtSpec;
  images: string[];
  mainImage: string;
}
