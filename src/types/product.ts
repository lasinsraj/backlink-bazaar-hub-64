export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  details: string[];
  image: string;
  priceId: string;
  reviews: {
    author: string;
    rating: number;
    text: string;
  }[];
}